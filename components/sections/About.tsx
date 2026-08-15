import { FiArrowUpRight } from "react-icons/fi";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { about, socials } from "@/lib/content";

export function About() {
  return (
    <section id="about" className="container-px scroll-mt-20 py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHeading index="05" kicker="About" title="Who you'd be working with." />

          <div className="mt-8 flex max-w-prose flex-col gap-5 text-pretty text-[0.9375rem] leading-relaxed text-muted md:text-base">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.12}>
            <a
              href={socials.agency}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-2 text-sm text-accent-soft transition-colors hover:text-text"
            >
              Visit Aventrex Digital
              <FiArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </a>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={0.06} className="lg:sticky lg:top-24">
            <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-1">
              {about.facts.map((f) => (
                <div key={f.label} className="bg-surface px-5 py-4">
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-dim">
                    {f.label}
                  </dt>
                  <dd className="mt-1.5 text-sm font-medium text-text">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
