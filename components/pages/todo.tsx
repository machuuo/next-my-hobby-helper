"use client";

import { FormEvent, useEffect, useState } from "react";
import { TodoListProps } from "@/types/Item";
import { PrimaryInput } from "@/components/atoms/input";
import { PrimaryButton } from "@/components/atoms/button";
import TodoList from "@/components/organisms/todo/TodoList";
import styles from "./todo.module.css";

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
      tag: ["study"],
      content: todo,
      isCompleted: false,
      createdAt: new Date(),
      priority: "medium" as const,
    };

    setTodos((prevState) => {
      // 로컬 스토리지에 저장
      localStorage.setItem("data", JSON.stringify([...prevState, newTodo]));

      return [...prevState, newTodo];
    });

    e.currentTarget.reset();
  };

  return (
    <div className={styles.todoWrapper}>
      <header className={styles.todoHeader}>
        {/* <h2>{new Date().toISOString()}</h2> */}
        <div className={styles.todoInput}>
          <form className="flex gap-4" onSubmit={handleSubmit}>
            <PrimaryInput
              name="todo"
              as="textarea"
              required
              className="min-w-[300px] h-30"
              placeholder="할 일 입력"
            />
            <PrimaryButton
              type="submit"
              size="xl"
              className="bg-slate-50 text-gray-600 w-[100px]"
            >
              추가
            </PrimaryButton>
          </form>
        </div>
      </header>
      {/* TodoList Area */}
      <div className={styles.todoList}>
        {/* to start */}
        <TodoList mode="start" todos={todos} />
        {/* in progress */}
        <TodoList mode="progress" />
        {/* done */}
        <TodoList mode="done" />
      </div>
    </div>
  );
}

export default TodoPage;
