"use client";

import Modal from "@/components/organisms/modal/Modal";
import { useModalStore } from "@/stores/modalStore";

export default function ModalWrapper() {
  const { isOpen, title, content, closeModal } = useModalStore();

  return (
    <Modal isOpen={isOpen} onClose={closeModal} title={title}>
      {content}
    </Modal>
  );
}
