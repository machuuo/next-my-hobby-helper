"use client";

import { TodoColumn, TodoHeader } from "@/components/organisms/todo";
import { TodoTemplate } from "@/components/templates/TodoTemplate";
import { useTodoStore } from "@/stores/todoStore";
import { useEffect } from "react";

export default function TodoOptions() {
  const { todoTemplates, loadTodoTemplates, handleSubmitTemplate } =
    useTodoStore();

  useEffect(() => {
    loadTodoTemplates();
  }, [loadTodoTemplates]);

  useEffect(() => {
    if (todoTemplates.length)
      localStorage.setItem("templates", JSON.stringify(todoTemplates));
  }, [todoTemplates]);

  return (
    <TodoTemplate>
      <TodoHeader
        showDate={false}
        inputLabel="반복할 일 입력"
        onSubmit={handleSubmitTemplate}
      />
      <div className="flex flex-row">
        <TodoColumn todos={todoTemplates} />
      </div>
    </TodoTemplate>
  );
}
