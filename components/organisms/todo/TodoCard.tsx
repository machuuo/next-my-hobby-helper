import Card from "@/components/atoms/card/Card";
import { TodoItemProps } from "@/types/Item";
import TodoItem from "./TodoItem";
import styles from "./TodoCard.module.css";
import classNames from "classnames";
import BaseTag from "@/components/atoms/tag/BaseTag";

export default function TodoCard(props: TodoItemProps) {
  const { id, tags, content, status, createdAt, dueDate, priority, updatedAt } =
    props;

  const priorityColor = {
    high: "border-red-500",
    medium: "border-yellow-500",
    low: "border-gray-500",
  }[priority || "low"];

  const cardStyle = `${styles.todoCard} ${priorityColor} ${
    status === "done" ? "opacity-60" : ""
  }`;

  // TODO: 체크박스(atoms), 모달(molecules) 컴포넌트 필요
  return (
    <div className={classNames(cardStyle)}>
      <div className={classNames(styles.tagArea)}>
        {tags.map((tag) => (
          // 태그(atoms) 컴포넌트 필요
          <BaseTag key={tag} text={tag} color="red" />
        ))}
      </div>
      <TodoItem {...props} />
    </div>
  );
}
