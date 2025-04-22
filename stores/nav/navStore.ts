import { create } from "zustand";
import { MenuProps } from "@/types/Menu";
import menuJson from "@/data/menu.json";

export interface NavState {
  menus: MenuProps[];
  openMenu: string | null;
}

export interface NavAction {
  toggleMenu: (id: string | null) => void;
}

export const useNavStore = create<NavState & NavAction>((set) => ({
  menus: menuJson,
  openMenu: null,
  toggleMenu: (id) =>
    set((state) => ({
      openMenu: state.openMenu === id ? null : id,
    })),
}));
