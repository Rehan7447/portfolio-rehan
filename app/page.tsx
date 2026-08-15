import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { Experience } from "@/components/sections/Experience";
import { Services } from "@/components/sections/Services";
import { TechStack } from "@/components/sections/TechStack";
import { About } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { faqs, siteConfig } from "@/lib/content";

/** FAQPage structured data — the answers are already in the DOM below. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${siteConfig.url}/#faq`,
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const profileJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${siteConfig.url}/#profilepage`,
  url: siteConfig.url,
  mainEntity: { "@id": `${siteConfig.url}/#person` },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <Experience />
      <Services />
      <TechStack />
      <About />
      <Process />
      <FAQ />
      <Contact />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([faqJsonLd, profileJsonLd]),
        }}
      />
    </>
  );
}
