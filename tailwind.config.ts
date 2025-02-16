import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      height: {
        main: "calc(100% - var(--HEADER-HEIGHT) - var(--NAVIGATION-HEIGHT) - var(--FOOTER-HEIGHT))",
      },
    },
  },
  plugins: [],
} satisfies Config;
