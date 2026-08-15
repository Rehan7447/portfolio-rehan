import { FiPlus } from "react-icons/fi";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { faqs } from "@/lib/content";

/**
 * Native <details> accordion — zero JS, keyboard-accessible for free, and the
 * answers stay in the DOM so search engines index them (see FAQPage JSON-LD).
 */
export function FAQ() {
  return (
    <section id="faq" className="container-px scroll-mt-20 py-20 md:py-28">
      <SectionHeading
        index="07"
        kicker="FAQ"
        title="Questions I get before we start."
      />

      <div className="mt-12 max-w-3xl">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 0.02}>
            <details className="group border-t border-line last:border-b">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left text-[0.9375rem] font-medium text-text marker:hidden [&::-webkit-details-marker]:hidden">
                {f.q}
                <FiPlus
                  className="mt-0.5 h-4 w-4 shrink-0 text-dim transition-transform duration-200 group-open:rotate-45"
                  aria-hidden
                />
              </summary>
              <p className="max-w-prose pb-6 pr-10 text-pretty text-sm leading-relaxed text-muted">
                {f.a}
              </p>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
