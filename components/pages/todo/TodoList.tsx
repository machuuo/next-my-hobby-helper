"use client";

import { useCallback, useEffect } from "react";
import { TodoItemProps } from "@/types/Item";
import { useTodoStore } from "@/stores/todoStore";
import { useModalStore } from "@/stores/modalStore";
import useDragAndDropEle from "@/hooks/useDragAndDrop";
import { TodoTemplate } from "@/components/templates/TodoTemplate";
import {
  TodoHeader,
  TodoColumn,
  TodoModalItem,
} from "@/components/organisms/todo";

export default function TodoList() {
  const { openModal } = useModalStore();
  const {
    todos,
    loadTodos,
    handleSubmit,
    toggleStatus,
    updateTodoItems,
    deleteTodoItems,
  } = useTodoStore();

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  useEffect(() => {
    if (todos.length) localStorage.setItem("today", JSON.stringify(todos));
  }, [todos]);

  // 드롭 커스텀 이벤트 핸들러 -> 훅 내부 드롭 이벤트 처리 시 실행할 함수
  const handleDropUpdate = useCallback(
    (id: string, mode: TodoItemProps["status"]) => {
      toggleStatus(id, mode);
    },
    [toggleStatus]
  );

  const { handleDragStart, handleDrop, handleDragOver } = useDragAndDropEle({
    onDrop: handleDropUpdate,
  });

  const handleOpenModal = useCallback(() => {
    openModal("Todo 추가", <TodoModalItem buttonLabel="추가" context="list" />); // 모달 내용 추가 필요
  }, [openModal]);

  const todoList: Record<TodoItemProps["status"], TodoItemProps[]> = {
    start: todos.filter((todo) => todo.status === "start"),
    done: todos.filter((todo) => todo.status === "done"),
  };

  const modes: TodoItemProps["status"][] = ["start", "done"];

  return (
    <TodoTemplate>
      <TodoHeader
        inputLabel="추가할 일 입력 (반복 X)"
        onSubmit={handleSubmit}
      />
      <div className="flex flex-row gap-12">
        {modes.map((mode) => (
          <TodoColumn
            key={mode}
            mode={mode as TodoItemProps["status"]}
            todos={todoList[mode] || []}
            context="list"
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onAddTodo={handleOpenModal}
            onUpdateTodo={updateTodoItems}
            onDeleteTodo={deleteTodoItems}
          />
        ))}
      </div>
    </TodoTemplate>
  );
}
