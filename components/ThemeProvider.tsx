"use client";

import { useThemeStore } from "@/stores/theme/themeStore";
import { selectTheme, selectSetTheme } from "@/stores/theme/themeSelectors";
import { useEffect } from "react";

export default function ThemeProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const theme = useThemeStore(selectTheme);
  const setTheme = useThemeStore(selectSetTheme);

  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    setTheme(systemTheme); // 초기 시스템 테마 적용
  }, [setTheme]);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("dark", theme === "dark");
    html.classList.add("text-foreground"); // 전역 클래스 추가
  }, [theme]);

  return <>{children}</>;
}
