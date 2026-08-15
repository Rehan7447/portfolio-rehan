"use client";

import { useState, type FormEvent } from "react";
import {
  FiMail,
  FiGithub,
  FiLinkedin,
  FiCheck,
  FiAlertCircle,
  FiArrowRight,
  FiArrowUpRight,
} from "react-icons/fi";
import { SiUpwork } from "react-icons/si";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { socials, siteConfig } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

const projectTypes = [
  "AI / LLM system",
  "Web app or SaaS",
  "Backend / API work",
  "Mobile app",
  "Something else",
];

const channels = [
  {
    label: "Email",
    value: socials.email,
    href: `mailto:${socials.email}`,
    Icon: FiMail,
  },
  {
    label: "GitHub",
    value: "@rehan7447",
    href: socials.github,
    Icon: FiGithub,
  },
  {
    label: "LinkedIn",
    value: "Rehan Ashraf",
    href: socials.linkedin,
    Icon: FiLinkedin,
  },
  {
    label: "Upwork",
    value: "100% Job Success",
    href: socials.upwork,
    Icon: SiUpwork,
  },
  {
    label: "Agency",
    value: "Aventrex Digital",
    href: socials.agency,
    Icon: FiArrowUpRight,
  },
].filter((c) => c.href && c.href !== "mailto:");

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      projectType: String(data.get("projectType") || ""),
      message: String(data.get("message") || "").trim(),
      company: String(data.get("company") || ""), // honeypot
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus("error");
      setError("Please fill in your name, email, and a short message.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      setStatus("error");
      setError("That email address doesn't look right.");
      return;
    }

    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <section id="contact" className="scroll-mt-20 border-t border-line py-20 md:py-28">
      <div className="container-px grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            index="08"
            kicker="Contact"
            title="Tell me what you're building."
          />
          <Reveal delay={0.05}>
            <p className="mt-6 max-w-prose text-pretty text-[0.9375rem] leading-relaxed text-muted md:text-base">
              Send over the problem and any constraints you already know about.
              I reply to every serious inquiry, usually within a day, and the
              first step is always a short call — no pitch deck.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 font-mono text-xs text-dim">
              {siteConfig.location} · {siteConfig.timezone} · overlaps EU and US
              mornings
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <ul className="mt-8 flex flex-col gap-px overflow-hidden rounded-xl border border-line bg-line">
              {channels.map(({ label, value, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex items-center gap-4 bg-surface px-5 py-4 transition-colors hover:bg-surface-2"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-dim" aria-hidden />
                    <span className="flex flex-col">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-dim">
                        {label}
                      </span>
                      <span className="text-sm text-text">{value}</span>
                    </span>
                    <FiArrowRight
                      className="ml-auto h-3.5 w-3.5 text-dim transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.08}>
            <div className="rounded-xl border border-line bg-surface p-6 md:p-8">
              {status === "success" ? (
                <div className="flex min-h-[26rem] flex-col items-center justify-center text-center">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-400">
                    <FiCheck className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-text">
                    Message sent
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
                    Thanks for reaching out — I&apos;ll get back to you shortly,
                    usually within a day.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-6 rounded-lg border border-line-strong px-4 py-2.5 text-sm text-text transition-colors hover:bg-surface-2"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute left-[-9999px] h-0 w-0 opacity-0"
                  />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Name" htmlFor="name">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Your name"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Email" htmlFor="email">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@company.com"
                        className={inputCls}
                      />
                    </Field>
                  </div>

                  <Field label="Project type" htmlFor="projectType">
                    <select
                      id="projectType"
                      name="projectType"
                      defaultValue={projectTypes[0]}
                      className={`${inputCls} appearance-none bg-[length:12px] bg-[right_0.9rem_center] bg-no-repeat pr-10`}
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%236C7178' stroke-width='2'%3E%3Cpath d='M2 4l4 4 4-4'/%3E%3C/svg%3E\")",
                      }}
                    >
                      {projectTypes.map((t) => (
                        <option key={t} value={t} className="bg-bg">
                          {t}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Message" htmlFor="message">
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      placeholder="What are you building, what's the timeline, and where do you need help?"
                      className={`${inputCls} resize-none`}
                    />
                  </Field>

                  {status === "error" && (
                    <p
                      role="alert"
                      className="flex items-center gap-2 text-sm text-red-400"
                    >
                      <FiAlertCircle className="h-4 w-4 shrink-0" aria-hidden />
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group mt-1 inline-flex items-center justify-center gap-2 rounded-lg bg-text px-5 py-3 text-sm font-medium text-void transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-55"
                  >
                    {status === "submitting" ? (
                      <>
                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-void/30 border-t-void" />
                        Sending
                      </>
                    ) : (
                      <>
                        Send message
                        <FiArrowRight
                          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                          aria-hidden
                        />
                      </>
                    )}
                  </button>

                  <p className="sr-only" role="status" aria-live="polite">
                    {status === "submitting" ? "Sending your message" : ""}
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-lg border border-line bg-bg px-3.5 py-2.5 text-sm text-text placeholder:text-dim outline-none transition-colors focus:border-accent/60";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-2">
      <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
        {label}
      </span>
      {children}
    </label>
  );
}
