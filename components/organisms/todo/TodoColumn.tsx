import { TodoItemProps } from "@/types/Item";
import { BaseButton } from "@/components/atoms/button"; // 경로 확인
import { Heading } from "@/components/atoms/heading/Heading"; // 경로 확인
import TodoCard from "@/components/organisms/todo/TodoCard";
import styles from "./TodoColumn.module.css";

interface TodoColumnProps {
  mode: TodoItemProps["status"];
  todos: TodoItemProps[];
  onDragStart: (e: React.DragEvent<HTMLElement>) => void;
  onDrop: (
    e: React.DragEvent<HTMLElement>,
    mode: TodoItemProps["status"]
  ) => void;
  onDragOver: (e: React.DragEvent<HTMLElement>) => void;
  onAddTodo: () => void;
}

const headingMap: { [key: string]: string } = {
  start: "시작",
  done: "완료",
};

const TodoColumn = ({
  mode,
  todos,
  onDragStart,
  onDrop,
  onDragOver,
  onAddTodo,
}: TodoColumnProps) => {
  return (
    <div className={styles.column}>
      <Heading className={styles.heading}>{headingMap[mode]}</Heading>
      <ul
        className={styles.list}
        onDrop={(e) => onDrop(e, mode)}
        onDragOver={onDragOver}
      >
        {todos.map((todo) => (
          <li
            key={todo.id}
            draggable
            onDragStart={onDragStart}
            data-id={todo.id}
          >
            <TodoCard {...todo} data-id={todo.id} />
          </li>
        ))}
        {mode === "start" && (
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

export default TodoColumn;
