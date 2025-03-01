import { TodoItemProps } from "@/types/Item";
import BaseCheckBox from "@/components/atoms/checkbox/BaseCheckBox";

export default function TodoItem(props: TodoItemProps) {
  const { content, tags, createdAt, status, dueDate, priority } = props;

  const isCompleted = status === "start" ? false : true;

  return (
    <div className="flex flex-row self-start gap-3">
      <BaseCheckBox checked={isCompleted} />
      <p className="text-black">{content}</p>
    </div>
  );
}
