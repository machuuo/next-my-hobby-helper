import { formatDate } from "@/lib/util";
import { TodoItemProps } from "@/types/Item";

interface Props {
  todo: TodoItemProps;
}

export default function TodoItem({ todo }: Props) {
  return (
    <div title={todo.content}>
      <p>{todo.tag}</p>
      <p>{formatDate(todo.createdAt)}</p>
      <p>{todo.isCompleted ? "completed" : "not yet"}</p>
      <p>{todo.dueDate?.getTime()}</p>
      <p>{todo.priority}</p>
    </div>
  );
}
