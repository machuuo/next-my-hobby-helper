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
      darkMode: "class",
    },
  },
  // h1, h2, h3, ... => font-size, font-weight inherit 속성 제거
  corePlugins: {
    // preflight = 예비요청
    // preflight: false,
  },
  plugins: [],
} satisfies Config;
