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
        unslop: {
          deep: "#07080d",
          bg: "#0b0d14",
          card: "#11141c",
          raised: "#1a1e28",
          hairline: "rgba(238, 240, 245, 0.08)",
          hairlineHover: "rgba(238, 240, 245, 0.16)",
          textPrimary: "#eef0f5",
          textSecondary: "#a3a9b8",
          textMuted: "#7a8296",
          accent: "#2563eb",
          accentHover: "#1d4ed8",
          emerald: "#10b981",
          amber: "#f59e0b",
        },
      },
      fontFamily: {
        sans: ["'Public Sans'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        heading: ["'Public Sans'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      borderRadius: {
        tag: "4px",
        control: "8px",
        card: "14px",
        panel: "18px",
      },
    },
  },
  plugins: [],
};

export default config;
