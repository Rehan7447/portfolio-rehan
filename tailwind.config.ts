import type { Config } from "tailwindcss";

/**
 * Design tokens.
 *
 * The palette is deliberately near-monochrome: a graphite ground with one
 * signal color. Color carries meaning here (links, focus, active state) rather
 * than decoration, which is what keeps a dense technical page readable.
 *
 * Every token resolves through a CSS variable holding bare RGB channels, so the
 * same utility class (`text-muted`, `bg-surface/40`) works in both themes and
 * Tailwind's opacity modifiers keep working. The channel values live in
 * `app/globals.css`; the light theme swaps them, nothing else.
 */
const token = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  // The theme is an explicit attribute on <html> — set before paint by the
  // inline script in the root layout — so `dark:` follows the resolved choice
  // rather than the OS alone.
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Ground
        void: token("void"),
        bg: token("bg"),
        surface: token("surface"),
        "surface-2": token("surface-2"),
        line: token("line"),
        "line-strong": token("line-strong"),

        // Type
        text: token("text"),
        // Maximum-contrast ink, used for the hover state of inverted buttons.
        "text-strong": token("text-strong"),
        muted: token("muted"),
        dim: token("dim"),

        // Signal — used sparingly: links, focus, active nav, key numbers.
        accent: {
          DEFAULT: token("accent"),
          soft: token("accent-soft"),
          dim: token("accent-dim"),
          faint: "rgb(var(--c-accent) / 0.12)",
        },

        // Status — one step darker in light mode so small text stays legible.
        ok: token("ok"),
        danger: token("danger"),
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.035em",
      },
      maxWidth: {
        container: "1120px",
        prose: "68ch",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        lift: "var(--shadow-lift)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s cubic-bezier(0.22,1,0.36,1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
