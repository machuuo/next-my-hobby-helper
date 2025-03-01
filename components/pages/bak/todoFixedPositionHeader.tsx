"use client";

import { FormEvent, useEffect, useState } from "react";
import { StyledInput } from "@/components/atoms/input";
import { StyledButton } from "@/components/atoms/button";
import { TodoListProps } from "@/types/Item";
import { formatDate } from "@/lib/util";

function TodoPage() {
  const [todos, setTodos] = useState<TodoListProps>([]);

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
    <div className="flex flex-col items-center w-full flex-1 gap-12 overflow-auto">
      <header className="fixed flex flex-col items-center justify-center z-10 w-full h-[200px] bg-blue-500 text-white">
        <h1 className="text-2xl">{formatDate(new Date())}</h1>
        <div className="flex flex-row justify-center w-full">
          <form className="flex gap-4" onSubmit={handleSubmit}>
            <StyledInput
              name="todo"
              as="textarea"
              required
              className="min-w-[300px] h-30"
            ></StyledInput>
            <StyledButton
              type="submit"
              size="xl"
              className="bg-slate-50 text-gray-600 w-[100px]"
            >
              추가
            </StyledButton>
          </form>
        </div>
      </header>
      {/* TodoList Area */}
      <div className="flex flex-row gap-10 pt-[250px] pb-40">
        {/* to start */}
        <div className="flex flex-col flex-1 gap-8 min-w-60 max-w-xs bg-slate-400">
          {todos.map((todo) => {
            return (
              <div key={todo.id}>
                <p>{todo.content}</p>
                <p>{todo.tags}</p>
                <p>{formatDate(todo.createdAt)}</p>
                <p>{todo.status ? "start" : "done"}</p>
                <p>{todo.dueDate?.getTime()}</p>
                <p>{todo.priority}</p>
              </div>
            );
          })}
        </div>
        {/* done */}
        <div className="flex flex-col flex-1 gap-8 min-w-60 max-w-xs bg-gray-600"></div>
      </div>
    </div>
  );
}

export default TodoPage;
