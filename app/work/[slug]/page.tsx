import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight, FiLock } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { TagList } from "@/components/ui/Tag";
import { projects, getProject, siteConfig } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const description = `${project.overview} Built with ${project.tags
    .slice(0, 5)
    .join(", ")}.`;

  return {
    title: `${project.title} — ${project.type}`,
    description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${project.title} — ${project.type}`,
      description,
      url: `${siteConfig.url}/work/${project.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — ${project.type}`,
      description,
    },
  };
}

export default async function CaseStudy({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.title,
      url: `${siteConfig.url}/work/${project.slug}`,
      abstract: project.summary,
      description: project.overview,
      genre: project.type,
      keywords: project.tags.join(", "),
      creator: { "@id": `${siteConfig.url}/#person` },
      ...(project.href ? { sameAs: project.href } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteConfig.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Work",
          item: `${siteConfig.url}/work`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: project.title,
          item: `${siteConfig.url}/work/${project.slug}`,
        },
      ],
    },
  ];

  return (
    <article className="container-px pb-20 pt-28 md:pb-24 md:pt-36">
      <nav aria-label="Breadcrumb">
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-text"
        >
          <FiArrowLeft
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5"
            aria-hidden
          />
          All work
        </Link>
      </nav>

      <header className="mt-8 border-b border-line pb-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-wider text-accent">
            {project.type}
          </span>
          {project.confidential && (
            <span className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-dim">
              <FiLock className="h-3 w-3" aria-hidden />
              Client confidential
            </span>
          )}
        </div>

        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tightest text-text md:text-6xl">
          {project.title}
        </h1>
        <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted md:text-lg">
          {project.overview}
        </p>

        {project.href && (
          <div className="mt-8">
            <Button href={project.href} variant="secondary">
              {project.hrefLabel ?? "View live"}
              <FiArrowUpRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        )}
      </header>

      <div className="grid gap-12 py-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <h2 className="kicker">What shipped</h2>
          <ul className="mt-6 flex flex-col gap-4">
            {project.highlights.map((h) => (
              <li
                key={h}
                className="flex gap-3.5 text-pretty text-[0.9375rem] leading-relaxed text-muted"
              >
                <span
                  className="mt-[0.6rem] h-px w-3.5 shrink-0 bg-accent/60"
                  aria-hidden
                />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="lg:col-span-5">
          <div className="rounded-xl border border-line bg-surface p-6 lg:sticky lg:top-24">
            <p className="kicker mb-4">Stack</p>
            <TagList items={project.tags} />

            <p className="kicker mb-2 mt-7">Type</p>
            <p className="text-sm text-text">{project.type}</p>

            <p className="kicker mb-2 mt-7">Role</p>
            <p className="text-sm text-text">
              Full-stack engineering — architecture through deployment
            </p>
          </div>
        </aside>
      </div>

      {/* Next case study + conversion exit */}
      <div className="grid gap-4 border-t border-line pt-10 md:grid-cols-2 lg:gap-5">
        <Link
          href={`/work/${next.slug}`}
          className="group flex flex-col justify-between rounded-xl border border-line bg-surface p-6 transition-colors hover:border-line-strong hover:bg-surface-2"
        >
          <span className="kicker">Next case study</span>
          <span className="mt-6 flex items-center justify-between gap-4">
            <span className="text-xl font-semibold tracking-tight text-text">
              {next.title}
            </span>
            <FiArrowRight
              className="h-4 w-4 shrink-0 text-dim transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden
            />
          </span>
        </Link>

        <div className="flex flex-col justify-between rounded-xl border border-line bg-surface p-6">
          <span className="kicker">Building something similar?</span>
          <div className="mt-6">
            <p className="text-pretty text-sm leading-relaxed text-muted">
              I take on freelance and contract work across AI, full-stack, and
              backend engineering.
            </p>
            <Button href="/#contact" variant="primary" className="mt-5">
              Start a project
              <FiArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}
