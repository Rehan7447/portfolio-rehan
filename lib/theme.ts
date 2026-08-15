/**
 * Theme plumbing shared by the pre-paint inline script and the toggle button.
 *
 * The resolved theme lives in one place — the `data-theme` attribute on <html>
 * — which the CSS variables in globals.css key off. localStorage holds the
 * user's *explicit* choice only; its absence means "follow the system", so the
 * site keeps tracking the OS until someone actually presses the button.
 */

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

/** Browser chrome color per theme — kept in sync with --c-bg. */
export const THEME_COLOR: Record<Theme, string> = {
  dark: "#0B0C0E",
  light: "#FFFFFF",
};

/**
 * Runs before first paint, inlined in <head>, so the page never flashes the
 * wrong ground. Stringified into a <script> tag — it must stay self-contained
 * and ES5-ish, with no imports or references to module scope.
 */
export const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("${THEME_STORAGE_KEY}");
    var theme =
      stored === "light" || stored === "dark"
        ? stored
        : window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
    var root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.style.colorScheme = theme;
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "light" ? "${THEME_COLOR.light}" : "${THEME_COLOR.dark}");
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();
`;

/** Applies a theme to the document. Safe to call on every change. */
export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  root.style.colorScheme = theme;
  document
    .querySelectorAll('meta[name="theme-color"]')
    .forEach((meta) => meta.setAttribute("content", THEME_COLOR[theme]));
}

/** What the system currently prefers, ignoring any stored choice. */
export function systemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}
