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

  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLElement>) => {
      const target = e.target as HTMLElement;
      if (target.hasAttribute("data-fixed")) return;
      dragElRef.current = target;
      e.dataTransfer.setData("myData", target.innerHTML);
      onDragStart?.(target);
    },
    [onDragStart]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLElement>, mode: TodoItemProps["status"]) => {
      e.preventDefault();
      if (!dragElRef.current) return;

      let dropEl = e.target as HTMLElement;
      const isContainer =
        dropEl.tagName.toLowerCase() === "ul" &&
        dropEl.hasAttribute("data-droppable");

      if (!isContainer) {
        dropEl = dropEl.closest("li") as HTMLElement; // 상위 li로 조정
        if (!dropEl) return; // li가 없으면 종료
      }

      if (isContainer) {
        const fixedEl = dropEl.querySelector("[data-fixed]");
        if (fixedEl) {
          dropEl.insertBefore(dragElRef.current, fixedEl);
        } else {
          dropEl.appendChild(dragElRef.current);
        }
        onDrop?.(dragElRef.current, dropEl, mode);
      } else if (dropEl.tagName.toLowerCase() === "li") {
        const parentContainer = dropEl.parentNode as HTMLElement;
        if (parentContainer && !dropEl.hasAttribute("data-fixed")) {
          parentContainer.insertBefore(dragElRef.current, dropEl);
          onDrop?.(dragElRef.current, dropEl, mode);
        }
      }
    },
    [onDrop]
  );

  /*
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLElement>, mode?: TodoItemProps["status"]) => {
      e.preventDefault(); // 파일 열기, 링크 이동 방지
      if (!dragElRef.current) return;

      const dropEl = e.target as HTMLElement;
      const isContainer = dropEl.hasAttribute("data-droppable"); // 드롭 가능 컨테이너 여부 확인

      if (isContainer) {
        const fixedEl = dropEl.querySelector("[data-fixed]");
        if (fixedEl && fixedEl !== dragElRef.current) {
          dropEl.insertBefore(dragElRef.current, fixedEl); // 고정 요소 앞에 삽입
        } else {
          dropEl.appendChild(dragElRef.current);
        }

        onDrop?.(dragElRef.current, dropEl, mode);
      } else {
        const parentContainer = dropEl.closest(
          "[data-droppable]"
        ) as HTMLElement | null;
        if (parentContainer) {
          const fixedEl = parentContainer.querySelector("[data-fixed]");
          if (fixedEl && dropEl !== fixedEl) {
            parentContainer.insertBefore(dragElRef.current, fixedEl);
          } else {
            parentContainer.insertBefore(dragElRef.current, dropEl);
          }
          onDrop?.(dragElRef.current, dropEl, mode);
        }
      }
    },
    [onDrop]
  );
  */

  const handleDragOver = useCallback((e: React.DragEvent<HTMLElement>) => {
    e.preventDefault(); // 드롭 허용
  }, []);

  return {
    dragElRef,
    handleDragStart,
    handleDrop,
    handleDragOver,
  };
}
