import { FiArrowDown, FiGithub, FiArrowUpRight } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { siteConfig, socials, stats } from "@/lib/content";

/**
 * Server-rendered hero. The entrance is a CSS animation with staggered delays
 * rather than a JS motion library, so the first paint is the real content.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden border-b border-line pb-16 pt-32 md:pb-20 md:pt-40"
    >
      <div
        aria-hidden
        className="mask-fade pointer-events-none absolute inset-0 -z-10 bg-grid"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[30rem] w-[46rem] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-[130px]"
      />

      <div className="container-px">
        <p
          className="animate-fade-up opacity-0 [animation-delay:60ms]"
          style={{ animationFillMode: "forwards" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok/60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ok" />
            </span>
            <span className="font-mono text-xs text-muted">
              Available for freelance &amp; contract work
            </span>
          </span>
        </p>

        <h1
          className="mt-7 max-w-4xl animate-fade-up text-[2.5rem] font-semibold leading-[1.05] tracking-tightest text-text opacity-0 [animation-delay:140ms] sm:text-6xl lg:text-[4.25rem]"
          style={{ animationFillMode: "forwards" }}
        >
          Senior Full-Stack Developer
          <br className="hidden sm:block" />{" "}
          <span className="text-dim">&amp;</span> AI Engineer
        </h1>

        <p
          className="mt-7 max-w-2xl animate-fade-up text-pretty text-base leading-relaxed text-muted opacity-0 [animation-delay:220ms] md:text-lg"
          style={{ animationFillMode: "forwards" }}
        >
          {siteConfig.subheadline}
        </p>

        <div
          className="mt-9 flex animate-fade-up flex-wrap items-center gap-3 opacity-0 [animation-delay:300ms]"
          style={{ animationFillMode: "forwards" }}
        >
          <Button href="/#contact" variant="primary" size="lg">
            Start a project
          </Button>
          <Button href="/#work" variant="secondary" size="lg">
            View selected work
            <FiArrowDown className="h-4 w-4" aria-hidden />
          </Button>
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-2 py-3 text-sm text-muted transition-colors hover:text-text"
          >
            <FiGithub className="h-4 w-4" aria-hidden />
            GitHub
            <FiArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>

        {/* Proof strip — every number here is verifiable. */}
        <dl
          className="mt-14 grid animate-fade-up grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line opacity-0 [animation-delay:380ms] md:mt-16 md:grid-cols-4"
          style={{ animationFillMode: "forwards" }}
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-bg px-5 py-6">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block text-2xl font-semibold tracking-tight text-text md:text-3xl">
                  {s.value}
                </span>
                <span className="mt-1.5 block text-xs leading-relaxed text-dim md:text-[13px]">
                  {s.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
