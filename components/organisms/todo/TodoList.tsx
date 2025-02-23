"use client";

import { TodoListProps } from "@/types/Item";
import TodoItem from "@/components/molecules/todo/TodoItem";
import styles from "./TodoList.module.css";

interface Props {
  mode: "start" | "progress" | "done";
  todos?: TodoListProps;
}

export default function TodoList({ mode, todos = [] }: Props) {
  let HeadingStr;

  if (mode === "start") {
    HeadingStr = <h3>시작</h3>;
  } else if (mode === "progress") {
    HeadingStr = <h3>진행</h3>;
  } else {
    HeadingStr = <h3>완료</h3>;
  }

  return (
    <div className={styles.todoListWrapper}>
      {HeadingStr}
      <div className={styles.todoList}>
        {todos.length > 0 &&
          todos.map((todo) => {
            return <TodoItem key={todo.id} todo={todo} />;
          })}
      </div>
    </div>
  );
}
