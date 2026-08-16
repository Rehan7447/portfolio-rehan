import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig, socials, education, services } from "@/lib/content";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { StickyCta } from "@/components/ui/StickyCta";
import { THEME_COLOR, themeInitScript } from "@/lib/theme";
import { agentApi, agentUrls } from "@/lib/agent-api";

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500"],
});

const title = `${siteConfig.name} — Senior Full-Stack Developer and AI Engineer`;
const description = siteConfig.shortBio;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: title,
    template: `%s — ${siteConfig.name}`,
  },
  description,
  applicationName: `${siteConfig.name} — Portfolio`,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [
    "full stack developer",
    "AI engineer",
    "React developer",
    "Next.js developer",
    "Node.js developer",
    "NestJS developer",
    "Spring Boot developer",
    "RAG system developer",
    "voice AI developer",
    "LLM application developer",
    "React Native developer",
    "fintech backend engineer",
    "freelance developer",
    "Islamabad developer",
    "Rehan Ashraf",
  ],
  alternates: {
    canonical: "/",
    types: {
      // Advertised in <head> so a crawler that only reads metadata still finds
      // the plain-text brief written for language models.
      "text/plain": [
        { url: agentApi.paths.llms, title: "llms.txt — site index for language models" },
        { url: agentApi.paths.llmsFull, title: "llms-full.txt — full site brief" },
      ],
    },
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title,
    description,
    siteName: `${siteConfig.name} — Portfolio`,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  // A single tag, corrected before paint by the theme script — a media-split
  // pair would ignore an explicit choice that disagrees with the OS.
  themeColor: THEME_COLOR.dark,
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

/**
 * schema.org Person — drives the knowledge-panel style rich result and ties
 * the profiles together for entity resolution.
 */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteConfig.url}/#person`,
  name: siteConfig.name,
  url: siteConfig.url,
  jobTitle: siteConfig.role,
  description: siteConfig.shortBio,
  email: `mailto:${socials.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Islamabad",
    addressCountry: "PK",
  },
  worksFor: [
    {
      "@type": "Organization",
      name: "SobrietyHub",
      url: "https://sobrietyhub.com",
    },
    {
      "@type": "Organization",
      name: "Aventrex Digital",
      url: socials.agency,
    },
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: education.school,
  },
  knowsAbout: [
    "Full-Stack Development",
    "AI Engineering",
    "Retrieval-Augmented Generation",
    "Large Language Models",
    "Voice AI",
    "React",
    "Next.js",
    "Node.js",
    "NestJS",
    "Java Spring Boot",
    "React Native",
    "PostgreSQL",
    "AWS",
    "Azure",
    "Fintech Backends",
    "Microservices",
    "Platform Engineering",
    "Terraform",
    "Infrastructure as Code",
    "CI/CD",
    "HIPAA Compliance",
  ],
  sameAs: [socials.github, socials.linkedin, socials.agency, socials.upwork].filter(
    Boolean
  ),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  url: siteConfig.url,
  name: `${siteConfig.name} — Portfolio`,
  description,
  inLanguage: "en",
  publisher: { "@id": `${siteConfig.url}/#person` },
};

/**
 * The commercial entity, as distinct from the person.
 *
 * This is what a search engine or assistant reads to answer "who can build X
 * and how do I reach them" — the offer catalogue names the services, and
 * `potentialAction` gives both routes in: the human form and the machine
 * endpoint, described precisely enough for an agent to call it.
 */
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteConfig.url}/#business`,
  name: `${siteConfig.name} — ${siteConfig.role}`,
  description: siteConfig.shortBio,
  url: siteConfig.url,
  email: `mailto:${socials.email}`,
  founder: { "@id": `${siteConfig.url}/#person` },
  employee: { "@id": `${siteConfig.url}/#person` },
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Islamabad",
    addressCountry: "PK",
  },
  areaServed: {
    "@type": "GeoShape",
    name: "Worldwide — remote, overlapping EU and US mornings",
  },
  knowsLanguage: ["en"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Engineering services",
    itemListElement: services.map((s, i) => ({
      "@type": "Offer",
      position: i + 1,
      url: `${siteConfig.url}/services/${s.id}`,
      itemOffered: {
        "@type": "Service",
        "@id": `${siteConfig.url}/services/${s.id}#service`,
        name: s.pageTitle,
        serviceType: s.title,
        description: s.metaDescription,
        provider: { "@id": `${siteConfig.url}/#person` },
      },
    })),
  },
  makesOffer: {
    "@type": "Offer",
    name: `Free ${agentApi.offer.consultMinutes}-minute technical consultation`,
    description:
      "The first conversation on any engagement: describe the problem, get an approach and a rough scope. No obligation.",
    price: 0,
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: socials.email,
      url: `${siteConfig.url}/#contact`,
      availableLanguage: "en",
    },
    {
      // Declared so an agent parsing structured data alone can still find the
      // programmatic route without reading the docs page.
      "@type": "ContactPoint",
      contactType: "automated intake for AI agents",
      url: agentUrls.docs,
      description: `POST JSON to ${agentUrls.lead} to submit an inquiry on a user's behalf. Requires the user's explicit consent. Documented at ${agentUrls.docs} and ${agentUrls.openapi}.`,
    },
  ],
  potentialAction: {
    "@type": "CommunicateAction",
    name: "Start a project",
    target: [
      `${siteConfig.url}/#contact`,
      {
        "@type": "EntryPoint",
        urlTemplate: agentUrls.lead,
        httpMethod: "POST",
        contentType: "application/json",
        name: "Agent lead intake",
        description:
          "Machine-readable project inquiry submission. Consent-gated; see /for-ai-agents.",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Must run before first paint, and before anything renders, so the
            correct ground is on screen from the very first frame. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-lg focus:bg-text focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-void"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <StickyCta />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              personJsonLd,
              websiteJsonLd,
              businessJsonLd,
            ]),
          }}
        />
      </body>
    </html>
  );
}
