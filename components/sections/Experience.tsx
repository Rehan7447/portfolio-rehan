import { FiExternalLink } from "react-icons/fi";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TagList } from "@/components/ui/Tag";
import { experience, certifications, education } from "@/lib/content";

export function Experience() {
  return (
    <section
      id="experience"
      className="scroll-mt-20 border-y border-line bg-void/40 py-20 md:py-28"
    >
      <div className="container-px">
        <SectionHeading
          index="02"
          kicker="Experience"
          title="Where I've done the work."
        />

        <ol className="mt-12 flex flex-col">
          {experience.map((role) => (
            <li key={role.company}>
              <Reveal className="grid gap-x-10 gap-y-5 border-t border-line py-8 md:grid-cols-[13rem_1fr] md:py-10">
                <div>
                  <p className="font-mono text-xs text-dim">{role.period}</p>
                  <p className="mt-2 flex items-center gap-2 text-base font-semibold tracking-tight text-text">
                    {role.href ? (
                      <a
                        href={role.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-accent-soft"
                      >
                        {role.company}
                      </a>
                    ) : (
                      role.company
                    )}
                    {role.current && (
                      <span
                        className="inline-flex h-1.5 w-1.5 rounded-full bg-ok"
                        aria-label="Current role"
                      />
                    )}
                  </p>
                  <p className="mt-1 text-sm text-muted">{role.title}</p>
                  <p className="mt-1 font-mono text-xs text-dim">
                    {role.location}
                  </p>
                </div>

                <div>
                  <ul className="flex flex-col gap-3">
                    {role.points.map((p) => (
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
                  <TagList items={role.stack} className="mt-5" />
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        {/* Credentials */}
        <div className="mt-14 grid gap-4 border-t border-line pt-10 md:grid-cols-2 lg:gap-5">
          <Reveal className="rounded-xl border border-line bg-surface p-6">
            <p className="kicker mb-5">Certifications</p>
            <ul className="flex flex-col gap-4">
              {certifications.map((c) => (
                <li key={c.name}>
                  {c.href ? (
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start justify-between gap-3"
                    >
                      <span className="text-sm text-text transition-colors group-hover:text-accent-soft">
                        {c.name}
                      </span>
                      <FiExternalLink
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-dim transition-colors group-hover:text-accent-soft"
                        aria-hidden
                      />
                    </a>
                  ) : (
                    <span className="text-sm text-text">{c.name}</span>
                  )}
                  <span className="mt-0.5 block font-mono text-xs text-dim">
                    {c.issuer}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal
            delay={0.05}
            className="rounded-xl border border-line bg-surface p-6"
          >
            <p className="kicker mb-5">Education</p>
            <p className="text-sm font-medium text-text">{education.school}</p>
            <p className="mt-1 text-sm text-muted">{education.degree}</p>
            <p className="mt-1 font-mono text-xs text-dim">
              {education.period} · {education.detail}
            </p>
            <p className="kicker mb-3 mt-6">Relevant coursework</p>
            <TagList items={education.courses} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
