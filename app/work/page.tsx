import type { Metadata } from "next";
import { ProjectCard } from "@/components/sections/Work";
import { projects, siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Case studies from production builds by Rehan Ashraf — AI and RAG platforms, voice AI, multi-tenant SaaS, fintech backends, and high-traffic mobile apps.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: `Selected Work — ${siteConfig.name}`,
    description:
      "Case studies from production builds: AI and RAG platforms, voice AI, multi-tenant SaaS, fintech backends, and high-traffic mobile apps.",
    url: `${siteConfig.url}/work`,
  },
};

const listJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Selected Work",
  url: `${siteConfig.url}/work`,
  hasPart: projects.map((p) => ({
    "@type": "CreativeWork",
    name: p.title,
    url: `${siteConfig.url}/work/${p.slug}`,
    abstract: p.summary,
  })),
};

export default function WorkIndex() {
  return (
    <div className="container-px pb-20 pt-28 md:pb-24 md:pt-36">
      <p className="kicker">Case Studies</p>
      <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tightest text-text md:text-5xl">
        Selected work
      </h1>
      <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted md:text-lg">
        Production systems across SaaS, applied AI, fintech, and consumer
        mobile. Each case study covers what the product does, how it&apos;s
        built, and what shipped.
      </p>

      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:gap-5">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listJsonLd) }}
      />
    </div>
  );
}
