import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        bg: {
          DEFAULT: "#05060a",
          elevated: "#0b0f1a",
          surface: "#0f1526",
        },
        ink: {
          DEFAULT: "#eaf0ff",
          muted: "#a7b0c7",
          soft: "#7d88a6",
        },
        stroke: {
          DEFAULT: "rgba(255,255,255,0.10)",
          strong: "rgba(255,255,255,0.16)",
        },
        accent: {
          DEFAULT: "#7c5cff",
          cyan: "#38bdf8",
          mint: "#34d399",
        },
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(124,92,255,0.22), 0 24px 60px rgba(0,0,0,0.55)",
        card: "0 1px 0 rgba(255,255,255,0.06) inset, 0 18px 50px rgba(0,0,0,0.45)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        "bg-shift": {
          "0%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(-4%,2%,0) scale(1.03)" },
          "100%": { transform: "translate3d(0,0,0) scale(1)" },
        },
        "shine-x": {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(240%)" },
        },
      },
      animation: {
        "bg-shift": "bg-shift 12s ease-in-out infinite",
        "shine-x": "shine-x 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;

