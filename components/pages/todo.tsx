"use client";

import { useEffect } from "react";
import TodoHeader from "@/components/organisms/todo/TodoHeader";
import TodoList from "@/components/organisms/todo/TodoList";
import styles from "@/components/organisms/todo/Todo.module.css";
import { useTodoStore } from "@/stores/todoStore";
import classNames from "classnames";

function TodoPage() {
  const { todos, loadTodos } = useTodoStore();

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  useEffect(() => {
    if (todos.length) localStorage.setItem("data", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className={classNames(styles.TodoWrapper, "w-[400px]")}>
      <TodoHeader />
      {/* TodoList Area */}
      <div className="flex flex-row gap-12">
        <TodoList />
      </div>
    </div>
  );
}

export default TodoPage;
