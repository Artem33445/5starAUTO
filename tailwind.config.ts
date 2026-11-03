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
        neo: {
          bg: "#F7F4EB", // Warm paper/cream base
          cream: "#FFFDF8",
          black: "#000000",
          yellow: "#FFE600", // Acid Yellow
          coral: "#FF5E5E",  // Hot Coral
          mint: "#23E28B",   // Electric Mint
          lilac: "#B886FF",  // Lilac / Violet
          cyan: "#5CE1E6",   // Sky Cyan
          orange: "#FF9F1C",
          red: "#FF2E2E",
          card: "#FFFFFF",
        },
        brand: {
          red: "#FF2E2E",
          darkred: "#D90429",
          crimson: "#991B1B",
          accent: "#FF5E5E",
          light: "#FFE5E5",
          gold: "#FFE600",
        },
      },
      fontFamily: {
        heading: ["'Space Grotesk'", "sans-serif"],
        display: ["'Lexend Mega'", "'Space Grotesk'", "sans-serif"],
        sans: ["'Public Sans'", "sans-serif"],
        mono: ["'Space Mono'", "monospace"],
      },
      boxShadow: {
        "neo-sm": "3px 3px 0px #000000",
        "neo": "5px 5px 0px #000000",
        "neo-lg": "8px 8px 0px #000000",
        "neo-xl": "12px 12px 0px #000000",
        "neo-hover": "7px 7px 0px #000000",
        "neo-active": "1px 1px 0px #000000",
      },
      borderWidth: {
        '2.5': '2.5px',
        '3': '3px',
      },
      animation: {
        "marquee": "marquee 32s linear infinite",
        "marquee-reverse": "marquee-reverse 32s linear infinite",
        "shake": "shake 0.4s ease-in-out",
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
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%, 60%": { transform: "translateX(-6px)" },
          "40%, 80%": { transform: "translateX(6px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
