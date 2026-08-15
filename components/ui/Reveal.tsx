import type { ReactNode } from "react";

/**
 * Layout wrappers, deliberately without scroll-triggered animation.
 *
 * These used to be framer-motion `whileInView` reveals. That approach inlines
 * `opacity: 0` into the server-rendered HTML, so every section below the fold
 * stays invisible until hydration finishes — and stays invisible forever if it
 * doesn't. Content that only exists after JavaScript succeeds is a bad trade
 * for a page whose job is to be read, so the reveals are gone and the markup
 * ships visible. Motion now lives where it can't hide anything: the hero's
 * CSS load-in, hover states, and the FAQ accordion.
 *
 * The components are kept (rather than removed from every call site) so the
 * sections keep a single, named seam if a reveal is ever reintroduced.
 */
export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  /** Accepted and ignored — kept so call sites read as intent, not timing. */
  delay?: number;
}) {
  return <div className={className}>{children}</div>;
}

export function RevealGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return <div className={className}>{children}</div>;
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
