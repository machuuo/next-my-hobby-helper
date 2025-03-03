"use client";

import { FormEvent, useEffect, useState } from "react";
import { TodoListProps } from "@/types/Item";
import TodoHeader from "@/components/organisms/todo/TodoHeader";
import TodoList from "@/components/organisms/todo/TodoList";
import styles from "@/components/organisms/todo/Todo.module.css";
import classNames from "classnames";

function TodoPage() {
  const [todos, setTodos] = useState<TodoListProps>([]);

  useEffect(() => {
    setTodos(() => {
      const data = localStorage.getItem("data");

      if (data) {
        return JSON.parse(data);
      }

      return [];
    });
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const todo = formData.get("todo")?.toString();

    if (!todo?.trim()) return;

    const newTodo = {
      id: new Date().getTime().toString(),
      tags: ["study", "game", "sports"],
      content: todo,
      status: "start" as const,
      createdAt: new Date(),
      priority: "low" as const,
    };

    setTodos((prevState) => {
      // 로컬 스토리지에 저장
      localStorage.setItem("data", JSON.stringify([...prevState, newTodo]));

      return [...prevState, newTodo];
    });

    e.currentTarget.reset();
  };

  return (
    <div className={classNames(styles.TodoWrapper, "w-[400px]")}>
      <TodoHeader handleSubmit={handleSubmit} />
      {/* TodoList Area */}
      <div className="flex flex-row gap-12">
        <TodoList todos={todos} handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default TodoPage;
