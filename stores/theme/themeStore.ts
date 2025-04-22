import { create } from "zustand";

export interface ThemeState {
  theme: string;
}

export interface ThemeAction {
  setTheme(theme: string): void;
  toggleTheme(): void;
}

export const useThemeStore = create<ThemeState & ThemeAction>((set) => ({
  theme: "light",
  setTheme: (theme) => set({ theme }),
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
}));
