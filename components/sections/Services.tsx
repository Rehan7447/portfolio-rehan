import { FiCpu, FiLayers, FiServer } from "react-icons/fi";
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
              <article className="flex h-full flex-col rounded-xl border border-line bg-surface p-6">
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
              </article>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </section>
  );
}
