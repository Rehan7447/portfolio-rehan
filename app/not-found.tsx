import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { featuredProjects } from "@/lib/content";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="container-px py-40 md:py-52">
      <p className="kicker">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tightest text-text md:text-5xl">
        That page doesn&apos;t exist.
      </h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
        The link may be out of date. Here&apos;s where to go instead.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/" variant="primary">
          Back to home
        </Button>
        <Button href="/work" variant="secondary">
          Browse case studies
        </Button>
      </div>

      <ul className="mt-12 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-6">
        {featuredProjects.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/work/${p.slug}`}
              className="text-sm text-muted transition-colors hover:text-text"
            >
              {p.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
