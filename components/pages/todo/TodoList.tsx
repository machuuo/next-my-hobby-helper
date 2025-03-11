"use client";

import { useCallback, useEffect } from "react";
import { TodoItemProps } from "@/types/Item";
import { useTodoStore } from "@/stores/todoStore";
import { useModalStore } from "@/stores/modalStore";
import useDragAndDropEle from "@/hooks/useDragAndDrop";
import TodoModalItem from "@/components/organisms/todo/TodoModalItem";
import { TodoListTemplate } from "@/components/templates/TodoListTemplate";
import TodoColumn from "@/components/organisms/todo/TodoColumn";
import { TodoHeader } from "@/components/organisms/todo/TodoHeader";

export default function TodoList() {
  const { openModal } = useModalStore();
  const { todos, loadTodos, updateTodoStatus } = useTodoStore();

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  useEffect(() => {
    if (todos.length) localStorage.setItem("data", JSON.stringify(todos));
  }, [todos]);

  // 드롭 커스텀 이벤트 핸들러 -> 훅 내부 드롭 이벤트 처리 시 실행할 함수
  const handleDropUpdate = useCallback(
    (id: string, mode?: TodoItemProps["status"]) => {
      if (id && mode) {
        updateTodoStatus(id, mode); // 상위 컴포넌트로 id와 mode 전달
      }
    },
    [updateTodoStatus]
  );

  const { handleDragStart, handleDrop, handleDragOver } = useDragAndDropEle({
    onDrop: handleDropUpdate,
  });

  const handleOpenModal = useCallback(() => {
    openModal("Todo 추가", <TodoModalItem />); // 모달 내용 추가 필요
  }, [openModal]);

  return (
    <TodoListTemplate
      todoHeader={<TodoHeader />}
      todoColumn={["start", "done"].map((mode) => {
        const filteredTodoList = todos.filter((todo) => todo.status === mode);
        return (
          <TodoColumn
            key={mode}
            mode={mode as TodoItemProps["status"]}
            todos={filteredTodoList}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onAddTodo={handleOpenModal}
          />
        );
      })}
    />
  );
}
