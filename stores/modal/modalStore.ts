import { create } from "zustand";

export interface ModalState {
  isOpen: boolean;
  title?: string;
  content?: React.ReactNode;
}

export interface ModalAction {
  openModal: (title?: string, content?: React.ReactNode) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState & ModalAction>((set) => ({
  isOpen: false,
  title: undefined,
  content: undefined,
  openModal: (title?: string, content?: React.ReactNode) =>
    set({ isOpen: true, title, content }),
  closeModal: () =>
    set({ isOpen: false, title: undefined, content: undefined }),
}));
