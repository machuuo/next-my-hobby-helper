"use client";

import Modal from "@/components/organisms/modal/Modal";
import { useModalStore } from "@/stores/modal/modalStore";
import {
  selectModalIsOpen,
  selectModalTitle,
  selectModalContent,
  selectCloseModal,
} from "@/stores/modal/modalSelectors";

export default function ModalWrapper() {
  const isOpen = useModalStore(selectModalIsOpen);
  const title = useModalStore(selectModalTitle);
  const content = useModalStore(selectModalContent);
  const closeModal = useModalStore(selectCloseModal);

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title={title}>
      {content}
    </Modal>
  );
}
