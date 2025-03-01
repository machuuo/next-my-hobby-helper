"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { TodoItemProps, TodoListProps } from "@/types/Item";
import { BaseButton, StyledButton } from "@/components/atoms/button";
import { StyledInput } from "@/components/atoms/input";
import { useModalStore } from "@/stores/modalStore";
import TodoCard from "@/components/organisms/todo/TodoCard";
import useDragAndDropEle from "@/hooks/useDragAndDropEle";
import styles from "./TodoList.module.css";
import classNames from "classnames";

interface Props {
  todos?: TodoListProps;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  className?: string;
}

export default function TodoList({ todos, handleSubmit, className }: Props) {
  const { openModal } = useModalStore();
  const [todoList, setTodoList] = useState<TodoListProps>([]);

  const onDrop = useCallback(
    (
      dragEl: HTMLElement,
      dropEl: HTMLElement,
      mode?: TodoItemProps["status"]
    ) => {
      const draggedId = dragEl.getAttribute("data-id"); // TodoCard에 data-id 추가 필요
      if (draggedId && mode) {
        setTodoList((prevState) => {
          return prevState.map((todo) =>
            todo.id === draggedId ? { ...todo, status: mode } : todo
          );
        });
      }
    },
    [setTodoList]
  );

  const { handleDragStart, handleDrop, handleDragOver } = useDragAndDropEle({
    onDrop,
  });

  const handleOpenModal = () => {
    openModal(
      "Todo 추가",
      <div className={styles.todoInput}>
        <form className="flex gap-4" onSubmit={handleSubmit}>
          <StyledInput
            name="todo"
            as="textarea"
            required
            className="min-w-[300px] h-30"
            placeholder="할 일 입력"
          />
          <StyledButton
            type="submit"
            size="xl"
            className="bg-slate-50 text-gray-600 w-[100px]"
          >
            추가
          </StyledButton>
        </form>
      </div>
    ); // 모달 내용 추가 필요
  };

  useEffect(() => {
    if (todos) {
      setTodoList(todos);
    }
  }, [todos]);

  return (
    <div className={classNames(styles.todoListWrapper, className)}>
      {["start", "done"].map((mode) => {
        let HeadingStr;

        if (mode === "start") {
          HeadingStr = "시작";
        } else {
          HeadingStr = "완료";
        }

        const filteredTodoList = todoList.filter(
          (todo) => todo.status === mode
        );

        return (
          <div key={mode} className={styles.todoList}>
            <h2 className="self-center text-black">{HeadingStr}</h2>
            <ul
              className="flex-1"
              data-droppable
              onDrop={(e) => {
                handleDrop(e, mode as TodoItemProps["status"]);
              }}
              onDragOver={handleDragOver}
            >
              {filteredTodoList.map((todo) => (
                <li key={todo.id} draggable onDragStart={handleDragStart}>
                  <TodoCard {...todo} data-id={todo.id} />
                </li>
              ))}
              {mode === "start" && (
                <li data-fixed>
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
