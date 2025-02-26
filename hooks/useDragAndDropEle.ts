"use client";

import { TodoItemProps } from "@/types/Item";
import { useCallback, useRef } from "react";

interface Props {
  onDragStart?: (dragEl: HTMLElement) => void; // 드래그 시작 시 호출
  onDrop?: (
    dragEl: HTMLElement,
    dropEl: HTMLElement,
    mode?: TodoItemProps["status"]
  ) => void; // 드롭 완료 시 호출
}

export default function useDragAndDropEle({ onDragStart, onDrop }: Props) {
  const dragElRef = useRef<HTMLElement | null>(null);
  const resultElRef = useRef<HTMLElement | null>(null);

  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLElement>) => {
      const target = e.target as HTMLElement;
      dragElRef.current = target;
      e.dataTransfer.setData("myData", target.innerHTML);
      onDragStart?.(target);
    },
    [onDragStart]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLElement>, mode?: TodoItemProps["status"]) => {
      e.preventDefault();
      if (!dragElRef.current) return;

      const dropEl = e.target as HTMLElement;
      const isContainer = dropEl.hasAttribute("data-droppable"); // 드롭 가능 컨테이너 여부 확인

      if (isContainer) {
        dropEl.appendChild(dragElRef.current);
        onDrop?.(dragElRef.current, dropEl, mode);
      } else {
        const parentContainer = dropEl.closest(
          "[data-droppable]"
        ) as HTMLElement | null;

        if (parentContainer) {
          parentContainer.insertBefore(dragElRef.current, dropEl);
          onDrop?.(dragElRef.current, dropEl, mode);
        }
      }
    },
    [onDrop]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  }, []);

  return {
    dragElRef,
    resultElRef,
    handleDragStart,
    handleDrop,
    handleDragOver,
  };
}
