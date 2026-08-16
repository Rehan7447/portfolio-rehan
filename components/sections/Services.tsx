import Link from "next/link";
import { FiArrowRight, FiCpu, FiLayers, FiServer } from "react-icons/fi";
import type { IconType } from "react-icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { services } from "@/lib/content";

const icons: Record<string, IconType> = {
  ai: FiCpu,
  product: FiLayers,
  backend: FiServer,
};

export function Services() {
  return (
    <section id="services" className="container-px scroll-mt-20 py-20 md:py-28">
      <SectionHeading
        index="03"
        kicker="What I Do"
        title="Three layers, one engineer."
        description="Most of my work sits where these overlap — an AI capability that needs a real product around it, and infrastructure solid enough to run it unattended."
      />

      <RevealGroup className="mt-12 grid gap-4 md:grid-cols-3 lg:gap-5">
        {services.map((s) => {
          const Icon = icons[s.id] ?? FiCpu;
          return (
            <RevealItem key={s.id} className="h-full">
              {/* The whole card is the link — the detail page is where the
                  commercial-intent keywords and the deeper proof live. */}
              <Link
                href={`/services/${s.id}`}
                className="group flex h-full flex-col rounded-xl border border-line bg-surface p-6 transition-colors hover:border-line-strong hover:bg-surface-2"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-bg text-accent"
                    aria-hidden
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="font-mono text-xs text-dim">{s.index}</span>
                </div>

                <h3 className="mt-5 text-lg font-semibold tracking-tight text-text">
                  {s.title}
                </h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">
                  {s.blurb}
                </p>

                <ul className="mt-6 flex flex-col gap-3 border-t border-line pt-5">
                  {s.points.map((p) => (
                    <li
                      key={p}
                      className="flex gap-3 text-pretty text-sm leading-relaxed text-muted"
                    >
                      <span
                        className="mt-[0.5rem] h-px w-3 shrink-0 bg-line-strong"
                        aria-hidden
                      />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm text-accent">
                  {s.pageTitle}
                  <FiArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </Link>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </section>
  );
}
