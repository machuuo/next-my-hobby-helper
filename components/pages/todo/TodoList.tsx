"use client";

import { useCallback, useEffect } from "react";
import { TodoListProps, TodoStatus } from "@/types/Item";
import { useTodoStore } from "@/stores/todo/todoStore";
import {
  selectTodos,
  selectLoadTodos,
  selectHandleSubmit,
  selectToggleStatus,
  selectUpdateTodoItems,
  selectDeleteTodoItems,
} from "@/stores/todo/todoSelectors";
import { useModalStore } from "@/stores/modal/modalStore";
import { selectOpenModal } from "@/stores/modal/modalSelectors";
import useDragAndDropEle from "@/hooks/useDragAndDrop";
import { TodoTemplate } from "@/components/templates/TodoTemplate";
import {
  TodoHeader,
  TodoColumn,
  TodoModalItem,
} from "@/components/organisms/todo";

export default function TodoList() {
  // modal
  const openModal = useModalStore(selectOpenModal);
  // todo
  const todos = useTodoStore(selectTodos);
  const handleSubmit = useTodoStore(selectHandleSubmit);
  const updateTodoItems = useTodoStore(selectUpdateTodoItems);
  const deleteTodoItems = useTodoStore(selectDeleteTodoItems);
  const toggleStatus = useTodoStore(selectToggleStatus);
  const loadTodos = useTodoStore(selectLoadTodos);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  useEffect(() => {
    if (todos.length) localStorage.setItem("today", JSON.stringify(todos));
  }, [todos]);

  // 드롭 커스텀 이벤트 핸들러 -> 훅 내부 드롭 이벤트 처리 시 실행할 함수
  const handleUpdateStatus = useCallback(
    (id: string, mode: TodoStatus) => {
      toggleStatus(id, mode);
    },
    [toggleStatus]
  );

  const { handleDragStart, handleDrop, handleDragOver } = useDragAndDropEle({
    onDrop: handleUpdateStatus,
  });

  const handleOpenModal = useCallback(() => {
    openModal("Todo 추가", <TodoModalItem buttonLabel="추가" context="list" />); // 모달 내용 추가 필요
  }, [openModal]);

  const todoList: Record<TodoStatus, TodoListProps> = {
    start: todos.filter((todo) => todo.status === "start"),
    done: todos.filter((todo) => todo.status === "done"),
  };

  const modes: TodoStatus[] = ["start", "done"];

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
            mode={mode as TodoStatus}
            todos={todoList[mode] || []}
            context="list"
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onAddTodo={handleOpenModal}
            onUpdateTodo={updateTodoItems}
            onDeleteTodo={deleteTodoItems}
            onUpdateStatus={handleUpdateStatus}
          />
        ))}
      </div>
    </TodoTemplate>
  );
}
