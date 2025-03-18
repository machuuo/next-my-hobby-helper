export interface TodoTemplateProps {
  id: string;
  content: string;
  priority: "high" | "medium" | "low";
  status: "start" | "done";
  isRepeat?: boolean;
  isSelected?: boolean;
}

export type TodoTemplateListProps = TodoTemplateProps[];

export interface TodoItemProps extends TodoTemplateProps {
  date?: Date;
}

export type TodoListProps = TodoItemProps[];
