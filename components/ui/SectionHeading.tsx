import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

/**
 * Numbered mono kicker + title. The number gives the page a table-of-contents
 * feel and tells the reader where they are in a long scroll.
 */
export function SectionHeading({
  index,
  kicker,
  title,
  description,
  className,
}: {
  index?: string;
  kicker: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <Reveal>
        <p className="kicker flex items-center gap-2.5">
          {index && <span className="text-accent">{index}</span>}
          <span className="h-px w-5 bg-line-strong" aria-hidden />
          {kicker}
        </p>
      </Reveal>
      <Reveal delay={0.04}>
        <h2 className="max-w-3xl text-[1.75rem] font-semibold leading-[1.15] tracking-tightest text-text sm:text-4xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.08}>
          <p className="max-w-2xl text-pretty text-[0.9375rem] leading-relaxed text-muted md:text-base">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
