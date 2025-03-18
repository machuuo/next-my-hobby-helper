import { TodoTemplateProps } from "@/types/Item";
import TodoItem from "./TodoItem";
import styles from "./TodoCard.module.css";
import classNames from "classnames";

interface Props extends TodoTemplateProps {
  context: "list" | "options";
  onDelete: (id: string) => void;
}

export default function TodoCard({
  context,
  priority,
  onDelete,
  ...rest
}: Props) {
  const priorityColor = {
    high: "border-red-500",
    medium: "border-yellow-500",
    low: "border-gray-500",
  }[priority || "low"];

  const cardStyle = `${styles.card} ${priorityColor} ${
    rest.status === "done" ? styles.done : ""
  }`;

  // TODO: 체크박스(atoms), 모달(molecules) 컴포넌트 필요
  return (
    <div className={classNames(cardStyle, priorityColor)}>
      <TodoItem
        context={context}
        priority={priority}
        onDelete={onDelete}
        {...rest}
      />
    </div>
  );
}
