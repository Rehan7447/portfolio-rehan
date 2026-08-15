import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig, socials, education } from "@/lib/content";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

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
  alternates: { canonical: "/" },
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
  themeColor: "#0B0C0E",
  colorScheme: "dark",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([personJsonLd, websiteJsonLd]),
          }}
        />
      </body>
    </html>
  );
}
