export interface TodoItemProps {
  id: string;
  tags: string[];
  content: string;
  status: "start" | "done";
  readonly createdAt: Date;
  dueDate?: Date;
  priority?: "high" | "medium" | "low";
  updatedAt?: Date;
}

export type TodoListProps = TodoItemProps[];
