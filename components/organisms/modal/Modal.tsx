"use client";

import { useEffect } from "react";
import { ModalProps } from "@/types/Props";
import { BaseButton } from "@/components/atoms/button";

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      // 이벤트 버블링
      onClose();
    }
  };

  // 모달이 열려 있을 때 body 스크롤 막기
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOutsideClick}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        {/* 닫기 버튼 */}
        <BaseButton
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800 text-2xl"
        >
          ×
        </BaseButton>
        {/* 모달 제목 */}
        {title && (
          <h2 className="text-xl font-semibold my-6 text-gray-800">{title}</h2>
        )}
        {/* 모달 내용 */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
