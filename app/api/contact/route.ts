import { NextResponse } from "next/server";
import { escapeHtml, sendMail } from "@/lib/mail";
import { clientKey, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  company?: string; // honeypot
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clamp(s: string, max: number) {
  return s.slice(0, max);
}

export async function POST(req: Request) {
  const limit = rateLimit(clientKey(req, "contact:"), {
    limit: 8,
    windowMs: 60 * 60_000,
  });
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later or email directly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Silently accept, send nothing.
  if (body.company && body.company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = clamp((body.name || "").trim(), 120);
  const email = clamp((body.email || "").trim(), 200);
  const projectType = clamp((body.projectType || "Not specified").trim(), 120);
  const budget = clamp((body.budget || "").trim(), 120);
  const timeline = clamp((body.timeline || "").trim(), 120);
  const message = clamp((body.message || "").trim(), 5000);

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 422 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 422 }
    );
  }

  const rows: Array<[string, string]> = [
    ["Name", name],
    ["Email", email],
    ["Project type", projectType],
    ["Budget", budget],
    ["Timeline", timeline],
  ].filter((row): row is [string, string] => Boolean(row[1]));

  const result = await sendMail({
    replyTo: email,
    subject: `New project inquiry — ${name} (${projectType})`,
    text: `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${message}`,
    html: `
      <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#111">
        <h2 style="margin:0 0 16px">New project inquiry</h2>
        ${rows
          .map(
            ([k, v]) =>
              `<p style="margin:4px 0"><strong>${escapeHtml(k)}:</strong> ${escapeHtml(
                v
              )}</p>`
          )
          .join("")}
        <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      </div>
    `,
  });

  if (result.status === "failed") {
    return NextResponse.json(
      { error: "Could not send right now. Please email me directly." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
