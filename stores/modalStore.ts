import { create } from "zustand";

interface State {
  isOpen: boolean;
  title?: string;
  content?: React.ReactNode;
}

interface Action {
  openModal: (title?: string, content?: React.ReactNode) => void;
  closeModal: () => void;
}

export const useModalStore = create<State & Action>((set) => ({
  isOpen: false,
  title: undefined,
  content: undefined,
  openModal: (title?: string, content?: React.ReactNode) =>
    set({ isOpen: true, title, content }),
  closeModal: () =>
    set({ isOpen: false, title: undefined, content: undefined }),
}));
