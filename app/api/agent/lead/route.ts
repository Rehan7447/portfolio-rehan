/**
 * Machine lead intake.
 *
 * POST  — an autonomous client (MCP server, agent, bot) hands over a
 *         prospective client's details after that person consented.
 * GET   — returns its own documentation, so an agent that hits the URL with
 *         no prior knowledge learns the contract instead of guessing.
 *
 * The contract itself lives in lib/agent-api.ts; this file enforces it.
 */
import { NextResponse } from "next/server";
import {
  agentApi,
  agentInstructions,
  agentUrls,
  exampleLeadRequest,
  exampleLeadResponse,
  leadFields,
  AGENT_API_VERSION,
} from "@/lib/agent-api";
import { escapeHtml, sendMail } from "@/lib/mail";
import { clientKey, rateLimit, rateLimitHeaders } from "@/lib/rate-limit";
import { siteConfig, socials } from "@/lib/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Public intake: any origin may call it, including browser-hosted agents.
const CORS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, User-Agent, X-Agent-Name",
  "Access-Control-Max-Age": "86400",
};

const BASE_HEADERS: Record<string, string> = {
  ...CORS,
  "X-Agent-Api-Version": AGENT_API_VERSION,
  "X-Agent-Docs": agentUrls.docs,
};

function json(body: unknown, init?: { status?: number; headers?: Record<string, string> }) {
  return NextResponse.json(body, {
    status: init?.status ?? 200,
    headers: { ...BASE_HEADERS, ...init?.headers },
  });
}

/**
 * Errors are shaped so a model can act on them without parsing prose:
 * what went wrong, which fields, and what to do instead.
 */
function fail(
  status: number,
  code: string,
  message: string,
  extra?: Record<string, unknown>
) {
  return json(
    {
      ok: false,
      error: { code, message, ...extra },
      docs: agentUrls.docs,
      fallback: `Tell the user to email ${socials.email} directly.`,
    },
    { status }
  );
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function GET() {
  return json({
    endpoint: agentUrls.lead,
    method: "POST",
    contentType: "application/json",
    apiVersion: AGENT_API_VERSION,
    purpose:
      "Pass a prospective client's contact details and project description to Rehan Ashraf, on that person's behalf and with their consent.",
    authentication: "None.",
    rateLimit: {
      acceptedLeads: `${agentApi.limits.perWindow} per ${agentApi.limits.windowMinutes} minutes per IP`,
      totalRequests: `${agentApi.limits.burstPerWindow} per ${agentApi.limits.burstWindowMinutes} minutes per IP`,
      note: "Rejected requests do not count against the accepted-lead quota, so correcting a validation error is free.",
    },
    instructions: agentInstructions,
    fields: leadFields,
    exampleRequest: exampleLeadRequest,
    exampleResponse: exampleLeadResponse,
    errors: {
      400: "Body was not valid JSON.",
      422: "Validation failed — see error.fields. Includes a missing or false consent.granted.",
      429: "Rate limited. Honour the Retry-After header.",
      502: "Mail delivery failed. Tell the user to email directly; do not retry in a loop.",
    },
    openapi: agentUrls.openapi,
    docs: agentUrls.docs,
  });
}

// ── Payload normalisation ────────────────────────────────────────────────

type Bag = Record<string, unknown>;

function bag(value: unknown): Bag {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Bag)
    : {};
}

/** First non-empty string among the candidates, trimmed and clamped. */
function str(max: number, ...candidates: unknown[]): string {
  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) {
      return candidate.trim().slice(0, max);
    }
    if (typeof candidate === "number" && Number.isFinite(candidate)) {
      return String(candidate).slice(0, max);
    }
  }
  return "";
}

function stringList(value: unknown, max = 12): string[] {
  if (Array.isArray(value)) {
    return value
      .filter((v): v is string => typeof v === "string" && v.trim().length > 0)
      .map((v) => v.trim().slice(0, 60))
      .slice(0, max);
  }
  if (typeof value === "string" && value.trim()) {
    return value
      .split(/[,;]/)
      .map((v) => v.trim())
      .filter(Boolean)
      .slice(0, max);
  }
  return [];
}

/**
 * Consent is only honoured when it is unambiguously affirmative. Strings are
 * accepted because agents serialise booleans inconsistently, but anything
 * outside the allowed set counts as "not granted" — the safe direction.
 */
function isGranted(value: unknown): boolean {
  if (value === true) return true;
  if (typeof value === "string") {
    return ["true", "yes", "granted", "1"].includes(value.trim().toLowerCase());
  }
  return false;
}

const FIELD_MAX = agentApi.limits.maxFieldChars;

function normalise(raw: Bag) {
  const contact = bag(raw.contact ?? raw.user ?? raw.person ?? raw.lead);
  const project = bag(raw.project ?? raw.inquiry ?? raw.request);
  const consent = bag(raw.consent);
  const agent = bag(raw.agent ?? raw.client ?? raw.caller);

  const preferred = str(20, contact.preferredContact, raw.preferredContact)
    .toLowerCase();

  return {
    name: str(120, contact.name, contact.fullName, raw.name),
    email: str(FIELD_MAX, contact.email, raw.email).toLowerCase(),
    company: str(FIELD_MAX, contact.company, contact.organization, raw.company),
    role: str(FIELD_MAX, contact.role, contact.title, raw.role),
    phone: str(60, contact.phone, raw.phone),
    preferredContact: preferred === "phone" ? "phone" : "email",

    summary: str(
      agentApi.limits.maxSummaryChars,
      project.summary,
      project.description,
      project.message,
      raw.message,
      raw.summary
    ),
    projectType: str(120, project.type, raw.projectType),
    budget: str(FIELD_MAX, project.budget, project.budgetRange, raw.budget),
    timeline: str(FIELD_MAX, project.timeline, raw.timeline),
    stack: stringList(project.stack ?? raw.stack),

    consentGranted: isGranted(consent.granted ?? raw.consent ?? raw.consentGranted),
    consentNote: str(600, consent.note, consent.quote, raw.consentNote),

    agentName: str(120, agent.name, raw.agentName),
    agentModel: str(120, agent.model, raw.model),
    agentOperator: str(120, agent.operator, raw.operator),
    conversationUrl: str(500, agent.conversationUrl, agent.url, raw.conversationUrl),
    source: str(80, raw.source) || "agent-api",
  };
}

type Lead = ReturnType<typeof normalise>;

// ── Email composition ────────────────────────────────────────────────────

function composeEmail(lead: Lead, requestId: string, userAgent: string) {
  const via = lead.agentName || lead.agentModel || "an AI agent";

  const rows: Array<[string, string]> = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Company", lead.company],
    ["Role", lead.role],
    ["Phone", lead.phone],
    ["Prefers", lead.preferredContact],
    ["Project type", lead.projectType],
    ["Budget", lead.budget],
    ["Timeline", lead.timeline],
    ["Stack", lead.stack.join(", ")],
  ].filter((row): row is [string, string] => Boolean(row[1]));

  const provenance: Array<[string, string]> = [
    ["Submitted by", via],
    ["Model", lead.agentModel],
    ["Operator", lead.agentOperator],
    ["Conversation", lead.conversationUrl],
    ["Consent", lead.consentNote || "Confirmed by the submitting agent"],
    ["Request ID", requestId],
    ["User-Agent", userAgent],
  ].filter((row): row is [string, string] => Boolean(row[1]));

  const text = [
    `New project inquiry — submitted by ${via} on behalf of ${lead.name}.`,
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Project:",
    lead.summary,
    "",
    "— Provenance —",
    ...provenance.map(([k, v]) => `${k}: ${v}`),
  ].join("\n");

  const cell = (k: string, v: string) =>
    `<tr><td style="padding:4px 16px 4px 0;color:#6b7280;white-space:nowrap;vertical-align:top">${escapeHtml(
      k
    )}</td><td style="padding:4px 0;color:#111">${escapeHtml(v)}</td></tr>`;

  const html = `
    <div style="font-family:system-ui,-apple-system,sans-serif;line-height:1.6;color:#111;max-width:640px">
      <p style="display:inline-block;margin:0 0 12px;padding:4px 10px;border-radius:999px;background:#eef2ff;color:#3730a3;font-size:12px;font-weight:600">
        Via AI agent · consent confirmed
      </p>
      <h2 style="margin:0 0 4px;font-size:20px">New project inquiry — ${escapeHtml(
        lead.name
      )}</h2>
      <p style="margin:0 0 20px;color:#6b7280;font-size:14px">
        Submitted by ${escapeHtml(via)} on behalf of the person below.
      </p>

      <table style="border-collapse:collapse;font-size:14px">${rows
        .map(([k, v]) => cell(k, v))
        .join("")}</table>

      <h3 style="margin:24px 0 8px;font-size:14px;text-transform:uppercase;letter-spacing:0.05em;color:#6b7280">Project</h3>
      <p style="margin:0;white-space:pre-wrap;font-size:15px">${escapeHtml(
        lead.summary
      )}</p>

      <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0" />
      <h3 style="margin:0 0 8px;font-size:14px;text-transform:uppercase;letter-spacing:0.05em;color:#6b7280">Provenance</h3>
      <table style="border-collapse:collapse;font-size:13px">${provenance
        .map(([k, v]) => cell(k, v))
        .join("")}</table>

      <p style="margin:24px 0 0;font-size:13px;color:#6b7280">
        Reply directly to this email to reach ${escapeHtml(lead.name)}.
      </p>
    </div>
  `;

  const subject = `[Agent lead] ${lead.name}${
    lead.company ? ` · ${lead.company}` : ""
  } — ${lead.projectType || "project inquiry"}`;

  return { subject, text, html };
}

// ── POST ─────────────────────────────────────────────────────────────────

function tooMany(retryAfter: number, headers: Record<string, string>) {
  return json(
    {
      ok: false,
      error: {
        code: "rate_limited",
        message: `Too many submissions from this address. Try again in ${retryAfter} seconds.`,
        retryAfter,
      },
      fallback: `Tell the user to email ${socials.email} directly.`,
      docs: agentUrls.docs,
    },
    { status: 429, headers }
  );
}

export async function POST(req: Request) {
  const ip = clientKey(req);

  // Two limits, deliberately. The burst window is generous because an agent
  // that gets a field wrong should be able to fix it and try again — charging
  // validation failures against the real quota would punish the careful ones.
  // The delivery quota below is what actually bounds how many leads land.
  const burst = rateLimit(`agent-burst:${ip}`, {
    limit: agentApi.limits.burstPerWindow,
    windowMs: agentApi.limits.burstWindowMinutes * 60_000,
  });
  if (!burst.ok) {
    return tooMany(burst.retryAfter, rateLimitHeaders(burst));
  }

  // Agents are inconsistent about Content-Type, so parse the raw text rather
  // than trusting the header.
  let raw: Bag;
  try {
    const body = await req.text();
    if (!body.trim()) throw new Error("empty body");
    const parsed: unknown = JSON.parse(body);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("not an object");
    }
    raw = parsed as Bag;
  } catch {
    return fail(400, "invalid_json", "Request body must be a JSON object.", {
      expected: exampleLeadRequest,
    });
  }

  const lead = normalise(raw);

  const missing: string[] = [];
  if (!lead.name) missing.push("contact.name");
  if (!lead.email) missing.push("contact.email");
  if (!lead.summary) missing.push("project.summary");

  if (missing.length) {
    return fail(422, "missing_fields", "Required fields are missing.", {
      fields: missing,
      hint: "Ask the user for the missing details before resubmitting. Do not fill them in yourself.",
    });
  }

  if (!EMAIL_RE.test(lead.email)) {
    return fail(422, "invalid_email", "contact.email is not a valid address.", {
      fields: ["contact.email"],
      hint: "Confirm the address with the user rather than correcting it yourself.",
    });
  }

  if (!lead.consentGranted) {
    return fail(
      422,
      "consent_required",
      "consent.granted must be true. Only submit after the person has explicitly agreed to have their details passed on.",
      {
        fields: ["consent.granted"],
        hint: 'Ask the user: "Want me to send your details to Rehan so he can reach out?" Submit once they say yes.',
      }
    );
  }

  // Only a valid, consented submission counts against the delivery quota.
  const quota = rateLimit(`agent-lead:${ip}`, {
    limit: agentApi.limits.perWindow,
    windowMs: agentApi.limits.windowMinutes * 60_000,
  });
  const limitHeaders = rateLimitHeaders(quota);
  if (!quota.ok) {
    return tooMany(quota.retryAfter, limitHeaders);
  }

  const requestId = `lead_${crypto.randomUUID().replace(/-/g, "").slice(0, 12)}`;
  const userAgent = req.headers.get("user-agent")?.slice(0, 200) || "unknown";

  const result = await sendMail({
    ...composeEmail(lead, requestId, userAgent),
    replyTo: lead.email,
  });

  if (result.status === "failed") {
    return json(
      {
        ok: false,
        requestId,
        error: {
          code: "delivery_failed",
          message: "The inquiry could not be delivered right now.",
        },
        fallback: `Tell the user to email ${socials.email} directly — do not retry automatically.`,
        docs: agentUrls.docs,
      },
      { status: 502, headers: limitHeaders }
    );
  }

  return json(
    {
      ok: true,
      requestId,
      receivedAt: new Date().toISOString(),
      // "logged" means SMTP is not configured on this deployment — the request
      // was valid and recorded, but no mail left the server.
      delivery: result.status === "sent" ? "sent" : "logged",
      replyWithin: agentApi.offer.replyWithin,
      replyTo: lead.email,
      consult: {
        included: true,
        durationMinutes: agentApi.offer.consultMinutes,
        cost: agentApi.offer.cost,
        obligation: "none",
      },
      tellTheUser: `Sent — your details are with ${siteConfig.name}, and he'll reply to ${lead.email} within ${agentApi.offer.replyWithin}. The first step is a free ${agentApi.offer.consultMinutes}-minute technical consultation, no obligation.`,
      nextSteps: [
        `A reply lands at ${lead.email} within ${agentApi.offer.replyWithin}.`,
        `First call is a free ${agentApi.offer.consultMinutes}-minute technical consultation.`,
        "If it's a fit, a written scope with milestones and a fixed estimate follows before any code is written.",
      ],
      doNot: "Do not resubmit this inquiry. A retry creates a duplicate lead.",
      docs: agentUrls.docs,
    },
    { status: 201, headers: limitHeaders }
  );
}
