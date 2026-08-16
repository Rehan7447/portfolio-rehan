import Link from "next/link";
import { FiGithub, FiLinkedin, FiMail, FiArrowUpRight, FiCpu } from "react-icons/fi";
import { SiUpwork } from "react-icons/si";
import {
  navLinks,
  siteConfig,
  socials,
  featuredProjects,
  services,
} from "@/lib/content";
import { agentApi } from "@/lib/agent-api";

const connect = [
  { label: "Email", href: `mailto:${socials.email}`, Icon: FiMail },
  { label: "GitHub", href: socials.github, Icon: FiGithub },
  { label: "LinkedIn", href: socials.linkedin, Icon: FiLinkedin },
  { label: "Upwork", href: socials.upwork, Icon: SiUpwork },
  { label: "Aventrex Digital", href: socials.agency, Icon: FiArrowUpRight },
].filter((s) => s.href && s.href !== "mailto:");

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-void">
      <div className="container-px py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-12">
          <div>
            <p className="text-sm font-semibold tracking-tight text-text">
              {siteConfig.name}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              {siteConfig.role}. Building SaaS platforms, AI systems, and
              fintech backends from {siteConfig.location}. Available for
              freelance and contract work.
            </p>
            <p className="mt-5 font-mono text-xs text-dim">
              {siteConfig.location} · {siteConfig.timezone}
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="kicker mb-4">Site</p>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted transition-colors hover:text-text"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/#faq"
                  className="text-sm text-muted transition-colors hover:text-text"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href={agentApi.paths.docs}
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-text"
                >
                  <FiCpu className="h-3.5 w-3.5" aria-hidden />
                  For AI agents
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Services">
            <p className="kicker mb-4">Services</p>
            <ul className="flex flex-col gap-2.5">
              {services.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/services/${s.id}`}
                    className="text-sm text-muted transition-colors hover:text-text"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="kicker mb-4">Connect</p>
            <ul className="flex flex-col gap-2.5">
              {connect.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-text"
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Case-study links kept crawlable from every page. */}
        <div className="mt-12 border-t border-line pt-6">
          <p className="kicker mb-3">Case studies</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {featuredProjects.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/work/${p.slug}`}
                  className="text-sm text-muted transition-colors hover:text-text"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-dim">
            © {year} {siteConfig.name}
          </p>
          {/* Machine-readable surfaces, linked from every page so a crawler
              finds them without needing robots.txt. */}
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {[
              { label: "llms.txt", href: agentApi.paths.llms },
              { label: "openapi.json", href: agentApi.paths.openapi },
              { label: "Agent API", href: agentApi.paths.docs },
            ].map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="font-mono text-xs text-dim transition-colors hover:text-muted"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
