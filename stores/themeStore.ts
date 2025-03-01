import { create } from "zustand";

interface State {
  theme: string;
}

interface Action {
  setTheme(theme: string): void;
  toggleTheme(): void;
}

export const useThemeStore = create<State & Action>((set) => ({
  theme: "light",
  setTheme: (theme) => set({ theme }),
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
}));
