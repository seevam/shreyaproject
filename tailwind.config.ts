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
        card: "1.25rem",
        blob: "42% 58% 63% 37% / 41% 44% 56% 59%",
      },
      boxShadow: {
        // Hard offset "sticker" shadows in the cards' navy.
        pop: "4px 4px 0 0 var(--color-navy)",
        "pop-sm": "3px 3px 0 0 var(--color-navy)",
        "pop-lg": "7px 7px 0 0 var(--color-navy)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        marquee: "marquee 45s linear infinite",
        floaty: "floaty 6s ease-in-out infinite",
        wiggle: "wiggle 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
