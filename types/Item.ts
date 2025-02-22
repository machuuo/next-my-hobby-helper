export interface TodoItemProps {
  id: string;
  tag: string[];
  content: string;
  isCompleted: boolean;
  readonly createdAt: Date;
  dueDate?: Date;
  priority?: "high" | "medium" | "low";
  updatedAt?: Date;
}

export type TodoListProps = TodoItemProps[];
