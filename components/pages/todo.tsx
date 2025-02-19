"use client";

import { FormEvent, useEffect, useState } from "react";
import { FixedInput } from "@/components/atoms/input";
import { FixedButton } from "@/components/atoms/button";
import { TodoItem } from "@/types/Item";
import { formatDate } from "@/lib/util";

function TodoPage() {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  useEffect(() => {
    setTodos(() => {
      if (typeof window !== "undefined") {
        const data = localStorage.getItem("data");

        if (data) {
          return JSON.parse(data);
        }
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
    <div className="flex flex-col items-center justify-center w-full gap-12 overflow-y-auto">
      <div className="flex flex-row justify-center w-full">
        <form className="flex gap-4" onSubmit={handleSubmit}>
          <FixedInput
            name="todo"
            as="textarea"
            required
            className="min-w-[300px] h-40"
          ></FixedInput>
          <FixedButton
            type="submit"
            size="xl"
            className="bg-slate-50 text-gray-600 w-[100px]"
          >
            추가
          </FixedButton>
        </form>
      </div>
      <div className="todoList flex flex-col gap-8">
        {todos.map((todo) => {
          return (
            <div key={todo.id}>
              <p>{todo.content}</p>
              <p>{todo.tag}</p>
              <p>{formatDate(todo.createdAt)}</p>
              <p>{todo.isCompleted ? "completed" : "not yet"}</p>
              <p>{todo.dueDate?.getTime()}</p>
              <p>{todo.priority}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TodoPage;
