import { ThemeState, ThemeAction } from "./themeStore";

export const selectTheme = (state: ThemeState & ThemeAction) => state.theme;
export const selectSetTheme = (state: ThemeState & ThemeAction) =>
  state.setTheme;
export const selectToggleTheme = (state: ThemeState & ThemeAction) =>
  state.toggleTheme;
