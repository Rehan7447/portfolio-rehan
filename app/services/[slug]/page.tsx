import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiArrowRight, FiCheck } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/sections/Work";
import {
  getProject,
  getService,
  services,
  siteConfig,
  socials,
} from "@/lib/content";
import { agentUrls } from "@/lib/agent-api";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return {
    title: service.pageTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: { canonical: `/services/${service.id}` },
    openGraph: {
      type: "website",
      title: `${service.pageTitle} — ${siteConfig.name}`,
      description: service.metaDescription,
      url: `${siteConfig.url}/services/${service.id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.pageTitle} — ${siteConfig.name}`,
      description: service.metaDescription,
    },
  };
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const evidence = service.evidence
    .map((s) => getProject(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const others = services.filter((s) => s.id !== service.id);
  const canonical = `${siteConfig.url}/services/${service.id}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: service.pageTitle,
      serviceType: service.title,
      description: service.metaDescription,
      url: canonical,
      provider: { "@id": `${siteConfig.url}/#person` },
      areaServed: {
        "@type": "GeoShape",
        name: "Worldwide — remote, with EU and US morning overlap",
      },
      audience: { "@type": "BusinessAudience", name: "Startups and growing businesses" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${service.title} deliverables`,
        itemListElement: service.deliverables.map((d, i) => ({
          "@type": "Offer",
          position: i + 1,
          itemOffered: { "@type": "Service", name: d },
        })),
      },
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        description:
          "Engagements begin with a free 30-minute technical consultation, then a written scope with milestones and a fixed estimate.",
      },
      potentialAction: {
        "@type": "CommunicateAction",
        name: "Request a free technical consultation",
        target: [
          `${siteConfig.url}/#contact`,
          {
            "@type": "EntryPoint",
            urlTemplate: agentUrls.lead,
            httpMethod: "POST",
            contentType: "application/json",
            description:
              "Machine-readable intake for AI agents submitting on a user's behalf.",
          },
        ],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: `${siteConfig.url}/#services`,
        },
        { "@type": "ListItem", position: 3, name: service.title, item: canonical },
      ],
    },
  ];

  return (
    <article className="container-px pb-20 pt-28 md:pb-24 md:pt-36">
      <nav aria-label="Breadcrumb">
        <Link
          href="/#services"
          className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-text"
        >
          <FiArrowLeft
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5"
            aria-hidden
          />
          All services
        </Link>
      </nav>

      <header className="mt-8 border-b border-line pb-10">
        <p className="font-mono text-xs uppercase tracking-wider text-accent">
          {service.index} · Service
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tightest text-text md:text-5xl">
          {service.pageTitle}
        </h1>
        <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted md:text-lg">
          {service.blurb}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button href="/#contact" variant="primary" size="lg">
            Get a free 30-minute consult
            <FiArrowRight className="h-4 w-4" aria-hidden />
          </Button>
          <Button href={`mailto:${socials.email}`} variant="secondary" size="lg">
            Email directly
          </Button>
        </div>
      </header>

      <div className="grid gap-12 py-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <h2 className="kicker">The approach</h2>
          <div className="mt-6 flex flex-col gap-5">
            {service.intro.map((p) => (
              <p
                key={p}
                className="max-w-prose text-pretty text-[0.9375rem] leading-relaxed text-muted"
              >
                {p}
              </p>
            ))}
          </div>

          <h2 className="kicker mt-14">What you get</h2>
          <ul className="mt-6 flex flex-col gap-4">
            {service.deliverables.map((d) => (
              <li
                key={d}
                className="flex gap-3.5 text-pretty text-[0.9375rem] leading-relaxed text-muted"
              >
                <FiCheck
                  className="mt-1 h-3.5 w-3.5 shrink-0 text-accent"
                  aria-hidden
                />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="lg:col-span-5">
          <div className="rounded-xl border border-line bg-surface p-6 lg:sticky lg:top-24">
            <p className="kicker mb-4">Get in touch if</p>
            <ul className="flex flex-col gap-3">
              {service.idealFor.map((f) => (
                <li
                  key={f}
                  className="flex gap-3 text-pretty text-sm leading-relaxed text-muted"
                >
                  <span
                    className="mt-[0.5rem] h-px w-3 shrink-0 bg-accent/60"
                    aria-hidden
                  />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 border-t border-line pt-6">
              <p className="kicker mb-2">First step</p>
              <p className="text-pretty text-sm leading-relaxed text-muted">
                A free 30-minute technical consultation. You describe the
                problem, I tell you how I&apos;d approach it and what it takes.
                No obligation — and if I&apos;m not the right person, I&apos;ll
                say so.
              </p>
              <Button href="/#contact" variant="primary" className="mt-5 w-full">
                Start a project
                <FiArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </div>
        </aside>
      </div>

      {evidence.length > 0 && (
        <section className="border-t border-line pt-12">
          <h2 className="kicker">Where this shipped</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:gap-5">
            {evidence.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-14 border-t border-line pt-10">
        <h2 className="kicker">Other services</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:gap-5">
          {others.map((s) => (
            <Link
              key={s.id}
              href={`/services/${s.id}`}
              className="group flex flex-col justify-between rounded-xl border border-line bg-surface p-6 transition-colors hover:border-line-strong hover:bg-surface-2"
            >
              <span className="kicker">{s.index}</span>
              <span className="mt-5 flex items-start justify-between gap-4">
                <span>
                  <span className="block text-lg font-semibold tracking-tight text-text">
                    {s.title}
                  </span>
                  <span className="mt-2 block text-pretty text-sm leading-relaxed text-muted">
                    {s.blurb}
                  </span>
                </span>
                <FiArrowRight
                  className="mt-1 h-4 w-4 shrink-0 text-dim transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </article>
  );
}
