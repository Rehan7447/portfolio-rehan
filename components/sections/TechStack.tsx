import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { techGroups } from "@/lib/content";

/**
 * A plain, scannable inventory. No logo wall — a hiring manager reading this
 * wants to find a keyword fast, not admire icons.
 */
export function TechStack() {
  return (
    <section
      id="stack"
      className="scroll-mt-20 border-y border-line bg-void/40 py-20 md:py-28"
    >
      <div className="container-px">
        <SectionHeading
          index="04"
          kicker="Stack"
          title="What I build with."
          description="Tools I've shipped production systems on — not a list of things I've read about."
        />

        <div className="mt-12 flex flex-col">
          {techGroups.map((group, i) => (
            <Reveal
              key={group.label}
              delay={i * 0.03}
              className="grid gap-4 border-t border-line py-6 md:grid-cols-[11rem_1fr] md:gap-8 md:py-7"
            >
              <h3 className="font-mono text-xs uppercase tracking-wider text-accent">
                {group.label}
              </h3>
              <ul className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li key={item}>
                    <Tag className="px-2.5 py-1.5 text-[11.5px] text-text">
                      {item}
                    </Tag>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
