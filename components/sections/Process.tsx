import { SectionHeading } from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { processSteps } from "@/lib/content";

export function Process() {
  return (
    <section
      id="process"
      className="scroll-mt-20 border-y border-line bg-void/40 py-20 md:py-28"
    >
      <div className="container-px">
        <SectionHeading
          index="06"
          kicker="How I Work"
          title="Predictable from scope to support."
          description="No surprises on cost, timeline, or what you get at the end. This is the same process whether it's a two-week build or a six-month engagement."
        />

        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {processSteps.map((s) => (
            <RevealItem key={s.step} className="h-full">
              <div className="flex h-full flex-col rounded-xl border border-line bg-surface p-6">
                <span className="font-mono text-xs text-accent">{s.step}</span>
                <h3 className="mt-4 text-base font-semibold tracking-tight text-text">
                  {s.title}
                </h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">
                  {s.body}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
