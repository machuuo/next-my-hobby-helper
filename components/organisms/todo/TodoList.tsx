"use client";

import { FormEvent, useCallback } from "react";
import { TodoItemProps, TodoListProps } from "@/types/Item";
import { BaseButton } from "@/components/atoms/button";
import TodoCard from "@/components/organisms/todo/TodoCard";
import TodoModalItem from "./TodoModalItem";
import { useModalStore } from "@/stores/modalStore";
import useDragAndDropEle from "@/hooks/useDragAndDrop";
import styles from "./Todo.module.css";
import classNames from "classnames";

interface Props {
  todos: TodoListProps;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleTodos: (id: string, mode: TodoItemProps["status"]) => void;
  className?: string;
}

interface HeadingMap {
  [key: string]: string;
}

export default function TodoList({
  todos,
  handleSubmit,
  handleTodos,
  className,
}: Props) {
  const { openModal } = useModalStore();

  // 드롭 커스텀 이벤트 핸들러 -> 훅 내부 드롭 이벤트 처리 시 실행할 함수
  const handleDropUpdate = useCallback(
    (id: string, mode?: TodoItemProps["status"]) => {
      if (id && mode) {
        handleTodos(id, mode); // 상위 컴포넌트로 id와 mode 전달
      }
    },
    [handleTodos]
  );

  const { handleDragStart, handleDrop, handleDragOver } = useDragAndDropEle({
    onDrop: handleDropUpdate,
  });

  const handleOpenModal = useCallback(() => {
    openModal("Todo 추가", <TodoModalItem handleSubmit={handleSubmit} />); // 모달 내용 추가 필요
  }, [openModal, handleSubmit]);

  return (
    <div className={classNames(styles.TodoListWrapper, className)}>
      {["start", "done"].map((mode) => {
        const headingMap: HeadingMap = {
          start: "시작",
          done: "완료",
        };
        const HeadingStr = headingMap[mode];

        const filteredTodoList = todos.filter((todo) => todo.status === mode);

        return (
          <div
            key={mode}
            className="flex flex-col flex-1 gap-8 rounded-md p-3 min-w-[200px] w-[500px] h-[60vh] bg-slate-400 overflow-auto overflow-scroll [&::-webkit-scrollbar]:hidden text-neutral-800/80"
          >
            <h2 className="self-center text-black">{HeadingStr}</h2>
            <ul
              className="flex-1"
              onDrop={(e) => {
                handleDrop(e, mode as TodoItemProps["status"]);
              }}
              onDragOver={handleDragOver}
            >
              {filteredTodoList.map((todo) => (
                <li
                  key={todo.id}
                  draggable
                  onDragStart={handleDragStart}
                  data-id={todo.id}
                >
                  <TodoCard {...todo} data-id={todo.id} />
                </li>
              ))}
              {mode === "start" && (
                <li>
                  <BaseButton
                    className={styles.newTodoButton}
                    onClick={handleOpenModal}
                  >
                    Todo 추가
                  </BaseButton>
                </li>
              )}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
