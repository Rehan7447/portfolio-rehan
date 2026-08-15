import clsx, { type ClassValue } from "clsx";

/** Tailwind-friendly className combiner. */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Detects whether the user prefers reduced motion (safe on server). */
export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
