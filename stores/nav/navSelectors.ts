import { NavState, NavAction } from "./navStore";

export const selectMenus = (state: NavState & NavAction) => state.menus;
export const selectOpenMenu = (state: NavState & NavAction) => state.openMenu;
export const selectToggleMenu = (state: NavState & NavAction) =>
  state.toggleMenu;
