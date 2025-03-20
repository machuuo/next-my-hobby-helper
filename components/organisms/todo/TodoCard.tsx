import { TodoItemProps, TodoTemplateProps } from "@/types/Item";
import TodoItem from "./TodoItem";
import styles from "./TodoCard.module.css";
import classNames from "classnames";

interface Props extends TodoTemplateProps {
  status: TodoItemProps["status"];
  context: "list" | "options";
  onDelete: (id: string) => void;
}

export default function TodoCard({
  context,
  priority,
  isRepeat,
  status = "start",
  onDelete,
  ...rest
}: Props) {
  const priorityColor = {
    high: "border-red-500",
    medium: "border-yellow-500",
    low: "border-gray-500",
  }[priority || "low"];

  const cardStyle = classNames(
    styles.card,
    priorityColor,
    {
      [styles.done]: status === "done",
    },
    isRepeat ? "bg-white" : "bg-yellow-100"
  );

  // TODO: 체크박스(atoms), 모달(molecules) 컴포넌트 필요
  return (
    <div className={cardStyle}>
      <TodoItem
        context={context}
        priority={priority}
        isRepeat={isRepeat}
        status={status}
        onDelete={onDelete}
        {...rest}
      />
    </div>
  );
}
