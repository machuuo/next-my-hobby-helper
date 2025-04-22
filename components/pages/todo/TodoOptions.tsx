"use client";

import { TodoColumn, TodoHeader } from "@/components/organisms/todo";
import { TodoTemplate } from "@/components/templates/TodoTemplate";
import { useTodoTemplateStore } from "@/stores/todo/todoTemplateStore";
import {
  selectTodoTemplates,
  selectLoadTodoTemplates,
  selectHandleSubmitTemplateItems,
  selectUpdateTemplateItems,
  selectDeleteTemplateItems,
} from "@/stores/todo/todoTemplateSelectors";
import { useEffect } from "react";

export default function TodoOptions() {
  const todoTemplates = useTodoTemplateStore(selectTodoTemplates);
  const loadTodoTemplates = useTodoTemplateStore(selectLoadTodoTemplates);
  const handleSubmitTemplateItems = useTodoTemplateStore(
    selectHandleSubmitTemplateItems
  );
  const updateTemplateItems = useTodoTemplateStore(selectUpdateTemplateItems);
  const deleteTemplateItems = useTodoTemplateStore(selectDeleteTemplateItems);

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
        onSubmit={handleSubmitTemplateItems}
      />
      <div className="flex flex-row">
        <TodoColumn
          todos={todoTemplates}
          context="options"
          onUpdateTodo={updateTemplateItems}
          onDeleteTodo={deleteTemplateItems}
        />
      </div>
    </TodoTemplate>
  );
}
