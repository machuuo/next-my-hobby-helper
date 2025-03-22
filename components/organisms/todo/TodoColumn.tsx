import React from "react";
import {
  TodoContext,
  TodoStatus,
  TodoTemplateListProps,
  TodoListProps,
} from "@/types/Item";
import { BaseButton } from "@/components/atoms/button";
import { Heading } from "@/components/atoms/heading/Heading";
import TodoCard from "@/components/organisms/todo/TodoCard";
import styles from "./TodoColumn.module.css";

interface Props {
  mode?: string;
  todos: TodoListProps | TodoTemplateListProps;
  context: TodoContext;
  onDragStart?: (e: React.DragEvent<HTMLElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLElement>, mode: string) => void;
  onDragOver?: (e: React.DragEvent<HTMLElement>) => void;
  onAddTodo?: () => void;
  onUpdateTodo: (id: string, content: string) => void;
  onDeleteTodo: (id: string) => void;
}

const headingMap: { [key: string]: string } = {
  start: "시작",
  done: "완료",
};

const TodoColumn = ({
  mode,
  todos,
  context,
  onDragStart,
  onDrop,
  onDragOver,
  onAddTodo,
  onDeleteTodo,
}: Props) => {
  return (
    <div className={styles.column}>
      <Heading className={styles.heading}>
        {headingMap[mode as TodoStatus]}
      </Heading>
      <ul
        className={styles.list}
        onDrop={(e) => onDrop?.(e, mode as TodoStatus)}
        onDragOver={onDragOver}
      >
        {todos.map((todo) => (
          <li
            key={todo.id}
            draggable
            onDragStart={onDragStart}
            data-id={todo.id}
          >
            <TodoCard
              {...todo}
              context={context}
              data-id={todo.id}
              onDelete={onDeleteTodo}
            />
          </li>
        ))}
        {context === "list" && mode === "start" && (
          <li>
            <BaseButton className={styles.addButton} onClick={onAddTodo}>
              Todo 추가
            </BaseButton>
          </li>
        )}
      </ul>
    </div>
  );
};

export default React.memo(TodoColumn);
