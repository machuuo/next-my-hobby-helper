"use client";

import { TodoItemProps } from "@/types/Item";
import { useCallback } from "react";

interface Props {
  onDragStart?: (dragEl: HTMLElement) => void; // 드래그 시작 시 호출
  onDrop?: (id: string, mode?: TodoItemProps["status"]) => void; // 드롭 완료 시 호출
}

export default function useDragAndDropEle({ onDragStart, onDrop }: Props) {
  const handleDragStart = (e: React.DragEvent<HTMLElement>) => {
    const draggedId = e.currentTarget.getAttribute("data-id");
    e.dataTransfer.setData("text/plain", draggedId || "");
    if (onDragStart) {
      onDragStart(e.currentTarget);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLElement>, mode: TodoItemProps["status"]) => {
      e.preventDefault();
      const draggedId = e.dataTransfer.getData("text/plain");
      if (draggedId && onDrop) {
        onDrop(draggedId, mode);
      }
      // onDrop?.(draggedId, mode);
    },
    [onDrop]
  );

  return { handleDragStart, handleDrop, handleDragOver };
}
