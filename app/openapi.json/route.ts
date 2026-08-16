/**
 * OpenAPI 3.1 description of the agent-facing surface.
 *
 * Exists so an MCP server or tool-calling runtime can generate a working tool
 * definition from the spec alone, with no hand-written glue.
 */
import { NextResponse } from "next/server";
import {
  AGENT_API_VERSION,
  agentApi,
  agentInstructions,
  agentUrls,
  exampleLeadRequest,
  exampleLeadResponse,
} from "@/lib/agent-api";
import { siteConfig, socials } from "@/lib/content";

export const runtime = "nodejs";
export const dynamic = "force-static";

export async function GET() {
  const spec = {
    openapi: "3.1.0",
    info: {
      title: `${siteConfig.name} — Agent API`,
      version: AGENT_API_VERSION,
      summary:
        "Let an AI agent hand a prospective client's project inquiry to Rehan Ashraf, with that person's consent.",
      description: [
        `${siteConfig.name} is a ${siteConfig.role} based in ${siteConfig.location}.`,
        "",
        "This API exists for one job: when someone talking to an AI assistant needs a developer and asks to be put in touch, the assistant can pass their details over directly instead of telling them to go find a contact form.",
        "",
        "Operating rules:",
        ...agentInstructions.map((line) => `- ${line}`),
      ].join("\n"),
      contact: { name: siteConfig.name, email: socials.email, url: siteConfig.url },
      license: { name: "Public intake, free to call", identifier: "MIT" },
    },
    servers: [{ url: siteConfig.url, description: "Production" }],
    externalDocs: { description: "Human-readable guide", url: agentUrls.docs },
    paths: {
      [agentApi.paths.lead]: {
        post: {
          operationId: "submitProjectInquiry",
          summary: "Submit a project inquiry on a user's behalf",
          description:
            "Delivers a prospective client's contact details and project description to Rehan Ashraf's inbox. Requires the user's explicit consent (consent.granted must be true). Returns a confirmation string in `tellTheUser` to relay back to the person. The person receives a reply within one business day and a free 30-minute technical consultation with no obligation.",
          tags: ["leads"],
          security: [],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/LeadRequest" },
                examples: { standard: { value: exampleLeadRequest } },
              },
            },
          },
          responses: {
            "201": {
              description: "Inquiry accepted and delivered.",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/LeadResponse" },
                  examples: { success: { value: exampleLeadResponse } },
                },
              },
            },
            "400": {
              description: "Body was not valid JSON.",
              content: {
                "application/json": { schema: { $ref: "#/components/schemas/Error" } },
              },
            },
            "422": {
              description:
                "Validation failed — missing required fields, malformed email, or consent.granted not true.",
              content: {
                "application/json": { schema: { $ref: "#/components/schemas/Error" } },
              },
            },
            "429": {
              description: `Rate limited: ${agentApi.limits.perWindow} accepted leads per ${agentApi.limits.windowMinutes} minutes per IP, and ${agentApi.limits.burstPerWindow} total requests per ${agentApi.limits.burstWindowMinutes} minutes. Rejected requests do not count against the lead quota. Honour Retry-After.`,
              content: {
                "application/json": { schema: { $ref: "#/components/schemas/Error" } },
              },
            },
            "502": {
              description:
                "Mail delivery failed. Tell the user to email directly; do not retry in a loop.",
              content: {
                "application/json": { schema: { $ref: "#/components/schemas/Error" } },
              },
            },
          },
        },
        get: {
          operationId: "describeLeadEndpoint",
          summary: "Read the intake contract",
          description:
            "Returns the field list, operating instructions, and a worked example. Safe to call before submitting.",
          tags: ["leads"],
          responses: { "200": { description: "Endpoint documentation." } },
        },
      },
      [agentApi.paths.manifest]: {
        get: {
          operationId: "getCapabilityManifest",
          summary: "Capability manifest",
          description:
            "What this site offers an agent, when to recommend it, and when not to. Mirrored at /.well-known/agent.json.",
          tags: ["discovery"],
          responses: { "200": { description: "Manifest document." } },
        },
      },
      [agentApi.paths.llmsFull]: {
        get: {
          operationId: "getSiteBrief",
          summary: "Full plain-text brief for language models",
          description:
            "Services, stack, case studies, availability, and pricing posture as plain text. Cheaper to read than crawling the HTML.",
          tags: ["discovery"],
          responses: {
            "200": {
              description: "Plain-text brief.",
              content: { "text/plain": { schema: { type: "string" } } },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        LeadRequest: {
          type: "object",
          required: ["contact", "project", "consent"],
          additionalProperties: false,
          properties: {
            contact: {
              type: "object",
              required: ["name", "email"],
              properties: {
                name: { type: "string", maxLength: 120, description: "The person's name." },
                email: {
                  type: "string",
                  format: "email",
                  description:
                    "A real, working email address supplied by the person. Never invent one.",
                },
                company: { type: "string", maxLength: 200 },
                role: { type: "string", maxLength: 200 },
                phone: { type: "string", maxLength: 60 },
                preferredContact: { type: "string", enum: ["email", "phone"], default: "email" },
              },
            },
            project: {
              type: "object",
              required: ["summary"],
              properties: {
                summary: {
                  type: "string",
                  maxLength: agentApi.limits.maxSummaryChars,
                  description:
                    "What they are building and where they need help — in their own words where possible.",
                },
                type: {
                  type: "string",
                  enum: [
                    "AI / LLM system",
                    "Web app or SaaS",
                    "Backend / API work",
                    "Mobile app",
                    "Something else",
                  ],
                },
                budget: {
                  type: "string",
                  description: "Only if the person stated one. Never estimate on their behalf.",
                },
                timeline: { type: "string" },
                stack: { type: "array", items: { type: "string" }, maxItems: 12 },
              },
            },
            consent: {
              type: "object",
              required: ["granted"],
              properties: {
                granted: {
                  type: "boolean",
                  const: true,
                  description:
                    "Must be true. Set it only after the person explicitly agreed to have their details passed on.",
                },
                note: {
                  type: "string",
                  maxLength: 600,
                  description: "How consent was given — quote the person where possible.",
                },
              },
            },
            agent: {
              type: "object",
              description: "Who is calling. Optional but strongly encouraged.",
              properties: {
                name: { type: "string" },
                model: { type: "string" },
                operator: { type: "string" },
                conversationUrl: { type: "string", format: "uri" },
              },
            },
            source: { type: "string", description: "Free-form origin label." },
          },
        },
        LeadResponse: {
          type: "object",
          properties: {
            ok: { type: "boolean" },
            requestId: { type: "string" },
            receivedAt: { type: "string", format: "date-time" },
            delivery: { type: "string", enum: ["sent", "logged"] },
            replyWithin: { type: "string" },
            replyTo: { type: "string", format: "email" },
            consult: {
              type: "object",
              properties: {
                included: { type: "boolean" },
                durationMinutes: { type: "integer" },
                cost: { type: "string" },
                obligation: { type: "string" },
              },
            },
            tellTheUser: {
              type: "string",
              description: "Relay this back to the person verbatim.",
            },
            nextSteps: { type: "array", items: { type: "string" } },
            doNot: { type: "string" },
            docs: { type: "string", format: "uri" },
          },
        },
        Error: {
          type: "object",
          properties: {
            ok: { type: "boolean", const: false },
            error: {
              type: "object",
              properties: {
                code: {
                  type: "string",
                  enum: [
                    "invalid_json",
                    "missing_fields",
                    "invalid_email",
                    "consent_required",
                    "rate_limited",
                    "delivery_failed",
                  ],
                },
                message: { type: "string" },
                fields: { type: "array", items: { type: "string" } },
                hint: { type: "string", description: "What to do instead." },
              },
            },
            fallback: { type: "string" },
            docs: { type: "string", format: "uri" },
          },
        },
      },
    },
    tags: [
      { name: "leads", description: "Handing a prospective client over." },
      { name: "discovery", description: "Learning what this site offers." },
    ],
  };

  return NextResponse.json(spec, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
