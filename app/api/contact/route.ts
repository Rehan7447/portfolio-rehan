import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  projectType?: string;
  message?: string;
  company?: string; // honeypot
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clamp(s: string, max: number) {
  return s.slice(0, max);
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
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

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  // Dev / unconfigured fallback: log instead of failing, so the form still
  // returns success states locally before email delivery is wired up.
  if (!apiKey || !from || !to) {
    console.info("[contact] (no email provider configured) submission:", {
      name,
      email,
      projectType,
      message,
    });
    return NextResponse.json({ ok: true });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New project inquiry — ${name} (${projectType})`,
      text: `Name: ${name}\nEmail: ${email}\nProject type: ${projectType}\n\n${message}`,
      html: `
        <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#111">
          <h2 style="margin:0 0 16px">New project inquiry</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Project type:</strong> ${escapeHtml(projectType)}</p>
          <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />
          <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
        </div>
      `,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { error: "Could not send right now. Please email me directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] unexpected error:", err);
    return NextResponse.json(
      { error: "Could not send right now. Please email me directly." },
      { status: 500 }
    );
  }
}
