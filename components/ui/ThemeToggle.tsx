"use client";

import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { cn } from "@/lib/utils";
import {
  applyTheme,
  systemTheme,
  THEME_STORAGE_KEY,
  type Theme,
} from "@/lib/theme";

/**
 * Light/dark switch.
 *
 * Starts on whatever the OS prefers and keeps following it — until the button
 * is pressed, at which point the choice is written to localStorage and wins
 * from then on. The visible glyph is chosen by CSS from `data-theme` (see
 * `.theme-icon` in globals.css) so the server and client render the same markup.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  // Read the theme the inline script already resolved, rather than deciding
  // again here — that keeps a single source of truth for the initial value.
  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "light" : "dark");
  }, []);

  // Track the OS while no explicit choice has been stored.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => {
      if (localStorage.getItem(THEME_STORAGE_KEY)) return;
      const next = systemTheme();
      applyTheme(next);
      setTheme(next);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    // Fall back to the attribute in the unlikely case of a click landing
    // between hydration and the effect above.
    const current =
      theme ??
      (document.documentElement.getAttribute("data-theme") === "light"
        ? "light"
        : "dark");
    const next: Theme = current === "light" ? "dark" : "light";
    applyTheme(next);
    setTheme(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Private mode or blocked storage — the theme still applies for this visit.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-line-strong hover:text-text",
        className
      )}
      aria-label={
        theme
          ? `Switch to ${theme === "dark" ? "light" : "dark"} theme`
          : "Switch color theme"
      }
      title="Switch color theme"
    >
      <FiSun className="theme-icon theme-icon-when-dark h-4 w-4" aria-hidden />
      <FiMoon className="theme-icon theme-icon-when-light h-4 w-4" aria-hidden />
    </button>
  );
}
