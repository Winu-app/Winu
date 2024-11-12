import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        foreground: "#1a1a1a",
        dark: "#111111",
        active: "#333333",
        purple: "#634cc3",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
