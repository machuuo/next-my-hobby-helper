import { TodoItemProps } from "@/types/Item";
import BaseTag from "@/components/atoms/tag/BaseTag";
import TodoItem from "./TodoItem";
import classNames from "classnames";

export default function TodoCard(props: TodoItemProps) {
  const { tags, status, priority } = props;

  const priorityColor = {
    high: "border-red-500",
    medium: "border-yellow-500",
    low: "border-gray-500",
  }[priority || "low"];

  const cardStyle = `${priorityColor} ${
    status === "done" ? "opacity-60" : ""
  } flex flex-col items-center gap-3 rounded-md p-3 my-2 border bg-white shadow-md hover:cursor-pointer`;

  // TODO: 체크박스(atoms), 모달(molecules) 컴포넌트 필요
  return (
    <div className={classNames(cardStyle)}>
      <div className="flex flex-row self-end gap-1">
        {tags.map((tag) => (
          // 태그(atoms) 컴포넌트 필요
          <BaseTag key={tag} text={tag} color="red" />
        ))}
      </div>
      <TodoItem {...props} />
    </div>
  );
}
