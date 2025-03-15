import { TodoItemProps } from "@/types/Item";
import TodoItem from "./TodoItem";
import classNames from "classnames";
import styles from "./TodoCard.module.css";

export default function TodoCard(props: TodoItemProps) {
  const { status, priority } = props;

  const priorityColor = {
    high: "border-red-500",
    medium: "border-yellow-500",
    low: "border-gray-500",
  }[priority || "low"];

  const cardStyle = `${styles.card} ${priorityColor} ${
    status === "done" ? styles.done : ""
  }`;

  // TODO: 체크박스(atoms), 모달(molecules) 컴포넌트 필요
  return (
    <div className={classNames(cardStyle, priorityColor)}>
      <TodoItem {...props} />
    </div>
  );
}
