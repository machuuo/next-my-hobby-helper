"use client";

import { useEffect, useState } from "react";
import { TodoItemProps, TodoListProps } from "@/types/Item";
import TodoCard from "@/components/organisms/todo/TodoCard";
import useDragAndDropEle from "@/hooks/useDragAndDropEle";
import styles from "./TodoList.module.css";
import classNames from "classnames";

interface Props {
  todos?: TodoListProps;
  className?: string;
}

export default function TodoList({ todos, className }: Props) {
  const [todoList, setTodoList] = useState<TodoListProps>([]);

  const { handleDragStart, handleDrop, handleDragOver } = useDragAndDropEle({
    onDrop: (dragEl, dropEl, mode) => {
      const draggedId = dragEl.getAttribute("data-id"); // TodoCard에 data-id 추가 필요
      if (draggedId && mode) {
        setTodoList((prevState) => {
          return prevState.map((todo) =>
            todo.id === draggedId ? { ...todo, status: mode } : todo
          );
        });
      }
    },
  });

  useEffect(() => {
    if (todos) setTodoList(todos);
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

        const Heading = <h2 className="self-center">{HeadingStr}</h2>;

        return (
          <div key={mode} className={styles.todoList}>
            {Heading}
            <ul
              className="h-[500px]"
              data-droppable
              onDrop={(e) => {
                handleDrop(e, mode as TodoItemProps["status"]);
              }}
              onDragOver={handleDragOver}
            >
              {todoList.length > 0 &&
                todoList
                  .filter((todo) => todo.status === mode)
                  .map((todo) => (
                    <li key={todo.id} draggable onDragStart={handleDragStart}>
                      <TodoCard {...todo} data-id={todo.id} />
                    </li>
                  ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
