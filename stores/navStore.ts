import { create } from "zustand";
import { MenuProps } from "@/types/Menu";
import menuJson from "@/data/menu.json";

interface State {
  menus: MenuProps[];
  openMenu: string | null;
}

interface Action {
  toggleMenu: (id: string | null) => void;
}

export const useNavStore = create<State & Action>((set) => ({
  menus: menuJson,
  openMenu: null,
  toggleMenu: (id) =>
    set((state) => ({
      openMenu: state.openMenu === id ? null : id,
    })),
}));
