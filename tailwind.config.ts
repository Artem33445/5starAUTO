import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        hermes: {
          blue: "#0000F2",          // Electric Klein Blue (Hermes signature)
          "blue-dark": "#0000C2",   // Deep Cobalt
          "blue-darker": "#00008F",
          "blue-light": "#3333FF",
          "blue-glow": "rgba(0, 0, 242, 0.4)",
          dark: "#090915",          // Deep void background
          darker: "#05050C",
          surface: "#101026",       // Card surface
          "surface-light": "#191938",
          border: "rgba(255, 255, 255, 0.12)",
          "border-subtle": "rgba(255, 255, 255, 0.07)",
          text: "#F2F2F7",
          muted: "#9494AD",
          accent: "#00F0FF",        // Electric Cyan
          success: "#00FF85",       // Terminal Green
          amber: "#FFB800",
        },
      },
      fontFamily: {
        heading: ["'Space Grotesk'", "sans-serif"],
        display: ["'Syne'", "'Space Grotesk'", "sans-serif"],
        sans: ["'Public Sans'", "sans-serif"],
        mono: ["'Space Mono'", "'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        "hermes-glow": "0 0 35px rgba(0, 0, 242, 0.45)",
        "hermes-glow-lg": "0 0 60px rgba(0, 0, 242, 0.6)",
        "hermes-card": "0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 0 0 1px rgba(255, 255, 255, 0.08)",
        "hermes-button": "0 0 20px rgba(0, 0, 242, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.25)",
      },
      animation: {
        "marquee": "marquee 28s linear infinite",
        "marquee-reverse": "marquee-reverse 28s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-sweep": "glow-sweep 3s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "glow-sweep": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
