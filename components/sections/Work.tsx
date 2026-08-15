import Link from "next/link";
import { FiArrowRight, FiLock } from "react-icons/fi";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { TagList } from "@/components/ui/Tag";
import { featuredProjects, type Project } from "@/lib/content";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group flex h-full flex-col rounded-xl border border-line bg-surface p-6 transition-colors duration-200 hover:border-line-strong hover:bg-surface-2"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[11px] uppercase tracking-wider text-accent">
          {project.type}
        </span>
        {project.confidential && (
          <span className="inline-flex items-center gap-1.5 rounded-md border border-line bg-bg px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-dim">
            <FiLock className="h-3 w-3" aria-hidden />
            Confidential
          </span>
        )}
      </div>

      <h3 className="mt-4 text-xl font-semibold tracking-tight text-text">
        {project.title}
      </h3>
      <p className="mt-2.5 text-pretty text-sm leading-relaxed text-muted">
        {project.summary}
      </p>

      <div className="mt-6 flex-1" />
      <TagList items={project.tags} limit={5} />

      <span className="mt-6 inline-flex items-center gap-1.5 border-t border-line pt-5 text-sm text-muted transition-colors group-hover:text-text">
        Read case study
        <FiArrowRight
          className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden
        />
      </span>
    </Link>
  );
}

export function Work() {
  return (
    <section id="work" className="container-px scroll-mt-20 py-20 md:py-28">
      <SectionHeading
        index="01"
        kicker="Selected Work"
        title="Products in production, not prototypes."
        description="Seven builds across SaaS, AI, fintech, and consumer mobile. Each one links to a short case study covering what it does and how it's built."
      />

      <RevealGroup className="mt-12 grid gap-4 md:grid-cols-2 lg:gap-5">
        {featuredProjects.map((p) => (
          <RevealItem key={p.slug}>
            <ProjectCard project={p} />
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
