import type { Config } from "tailwindcss";

/**
 * Colours are declared once as CSS custom properties in src/app/globals.css,
 * sampled from the Signal Cards deck. Edit the hex values THERE and the whole
 * site follows. Do not hard-code colours in components.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: "var(--color-paper)",
        surface: "var(--color-surface)",
        ink: "var(--color-ink)",
        navy: "var(--color-navy)",
        muted: "var(--color-muted)",
        line: "var(--color-line)",
        "line-strong": "var(--color-line-strong)",
        accent: "var(--color-accent)",
        "accent-strong": "var(--color-accent-strong)",
        "accent-soft": "var(--color-accent-soft)",
        secondary: "var(--color-secondary)",
        "secondary-soft": "var(--color-secondary-soft)",
        grownup: "var(--color-grownup)",
        sun: "var(--color-sun)",
        "sun-soft": "var(--color-sun-soft)",
        "on-dark": "var(--color-on-dark)",
        "on-dark-line": "var(--color-on-dark-line)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose: "68ch",
      },
      borderRadius: {
        card: "0.875rem",
      },
    },
  },
  plugins: [],
};

export default config;
