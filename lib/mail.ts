/**
 * Shared SMTP delivery.
 *
 * Both the human contact form (`/api/contact`) and the machine lead intake
 * (`/api/agent/lead`) funnel through here so there is exactly one place that
 * knows how mail leaves this site.
 *
 * When SMTP is not configured the send is reported as `skipped` rather than
 * failing — local development and preview deploys still exercise the full
 * request path, and the submission is logged to the server console.
 */
import nodemailer from "nodemailer";

export type MailInput = {
  subject: string;
  text: string;
  html: string;
  /** Address a reply goes to — the prospect, not the SMTP account. */
  replyTo?: string;
};

export type MailResult =
  | { status: "sent" }
  | { status: "skipped"; reason: "smtp-not-configured" }
  | { status: "failed"; error: unknown };

type MailConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
  to: string;
};

function readConfig(): MailConfig | null {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const from = process.env.CONTACT_FROM_EMAIL || user;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!host || !user || !pass || !from || !to) return null;
  return { host, port, user, pass, from, to };
}

/** True when the deployment can actually deliver mail. */
export function isMailConfigured() {
  return readConfig() !== null;
}

export async function sendMail(input: MailInput): Promise<MailResult> {
  const config = readConfig();

  if (!config) {
    console.info("[mail] SMTP not configured — submission logged only:", {
      subject: input.subject,
      replyTo: input.replyTo,
      text: input.text,
    });
    return { status: "skipped", reason: "smtp-not-configured" };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      // 465 = implicit TLS; 587 upgrades via STARTTLS.
      secure: config.port === 465,
      auth: { user: config.user, pass: config.pass },
    });

    await transporter.sendMail({
      from: config.from,
      to: config.to,
      replyTo: input.replyTo,
      subject: input.subject,
      text: input.text,
      html: input.html,
    });

    return { status: "sent" };
  } catch (error) {
    console.error("[mail] SMTP send failed:", error);
    return { status: "failed", error };
  }
}

export function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
