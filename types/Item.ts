export interface TodoTemplateProps {
  id: string;
  content: string;
  priority: "high" | "medium" | "low";
  isRepeat?: boolean;
  isSelected?: boolean;
}

export type TodoTemplateListProps = TodoTemplateProps[];

export interface TodoItemProps extends TodoTemplateProps {
  status: "start" | "done";
  date?: Date;
}

export type TodoListProps = TodoItemProps[];
