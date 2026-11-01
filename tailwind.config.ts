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
        dark: {
          950: "#F8FAFC",
          900: "#FFFFFF",
          850: "#F1F5F9",
          800: "#E2E8F0",
          700: "#CBD5E1",
          600: "#94A3B8",
        },
        brand: {
          red: "#DC2626",
          darkred: "#B91C1C",
          crimson: "#991B1B",
          accent: "#EF4444",
          light: "#FEE2E2",
          gold: "#F59E0B",
        },
      },
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        sans: ["Plus Jakarta Sans", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        "metal": "0 4px 20px -2px rgba(0, 0, 0, 0.06)",
        "red-subtle": "0 8px 20px -6px rgba(220, 38, 38, 0.28)",
        "card": "0 2px 12px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.03)",
        "card-hover": "0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)",
      },
      animation: {
        "shake": "shake 0.4s ease-in-out",
      },
      keyframes: {
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
