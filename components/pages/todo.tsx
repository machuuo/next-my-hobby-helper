"use client";

import { FormEvent, useEffect, useState } from "react";
import { TodoItemProps, TodoListProps } from "@/types/Item";
import TodoHeader from "@/components/organisms/todo/TodoHeader";
import TodoList from "@/components/organisms/todo/TodoList";
import styles from "@/components/organisms/todo/Todo.module.css";
import classNames from "classnames";

function TodoPage() {
  const [todos, setTodos] = useState<TodoListProps>([]);

  useEffect(() => {
    const savedData = localStorage.getItem("data");
    if (savedData) {
      try {
        setTodos(JSON.parse(savedData));
      } catch (error) {
        console.error("Failed to parse localStorage data:", error);
        setTodos([]); // 기본값으로 초기화
      }
    }
  }, []);

  useEffect(() => {
    if (todos.length) localStorage.setItem("data", JSON.stringify(todos));
  }, [todos]);

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
      localStorage.setItem("data", JSON.stringify([...prevState, newTodo]));

      return [...prevState, newTodo];
    });

    e.currentTarget.reset();
  };

  const handleTodos = (id: string, mode: TodoItemProps["status"]) => {
    setTodos((prevState) =>
      prevState.map((todo) => {
        if (todo.id === id) {
          return { ...todo, status: mode };
        } else {
          return todo;
        }
      })
    );
  };

  return (
    <div className={classNames(styles.TodoWrapper, "w-[400px]")}>
      <TodoHeader handleSubmit={handleSubmit} />
      {/* TodoList Area */}
      <div className="flex flex-row gap-12">
        <TodoList
          todos={todos}
          handleSubmit={handleSubmit}
          handleTodos={handleTodos}
        />
      </div>
    </div>
  );
}

export default TodoPage;
