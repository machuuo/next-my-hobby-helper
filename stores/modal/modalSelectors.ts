import { ModalState, ModalAction } from "./modalStore";

export const selectModalIsOpen = (state: ModalState & ModalAction) =>
  state.isOpen;
export const selectModalTitle = (state: ModalState & ModalAction) =>
  state.title;
export const selectModalContent = (state: ModalState & ModalAction) =>
  state.content;
export const selectOpenModal = (state: ModalState & ModalAction) =>
  state.openModal;
export const selectCloseModal = (state: ModalState & ModalAction) =>
  state.closeModal;
