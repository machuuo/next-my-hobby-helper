export type TodoContext = "list" | "options";
export type TodoPriority = "high" | "medium" | "low";
export type TodoSource = "template" | "temporary";
export type TodoStatus = "start" | "done";

export interface BaseTodoProps {
  id: string;
  content: string;
  priority: TodoPriority;
  source: TodoSource;
}

export interface TodoTemplateProps extends BaseTodoProps {
  source: "template";
}

export type TodoTemplateListProps = TodoTemplateProps[];

export interface TodoItemProps extends BaseTodoProps {
  source: "temporary";
  status: TodoStatus;
  date: Date;
}

export type TodoListProps = TodoItemProps[];
