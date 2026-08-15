import type { Config } from "tailwindcss";

/**
 * Design tokens.
 *
 * The palette is deliberately near-monochrome: a graphite ground with one
 * signal color. Color carries meaning here (links, focus, active state) rather
 * than decoration, which is what keeps a dense technical page readable.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ground
        void: "#08090B",
        bg: "#0B0C0E",
        surface: "#111316",
        "surface-2": "#16181C",
        line: "#22252B",
        "line-strong": "#2E323A",

        // Type
        text: "#EDEEF0",
        muted: "#9BA1A9",
        dim: "#6C7178",

        // Signal — used sparingly: links, focus, active nav, key numbers.
        accent: {
          DEFAULT: "#6B8CFF",
          soft: "#9DB2FF",
          dim: "#4E6BD6",
          faint: "rgba(107,140,255,0.12)",
        },
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
        card: "0 1px 2px rgba(0,0,0,0.4), 0 8px 24px -12px rgba(0,0,0,0.6)",
        lift: "0 1px 2px rgba(0,0,0,0.4), 0 16px 40px -16px rgba(0,0,0,0.75)",
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
