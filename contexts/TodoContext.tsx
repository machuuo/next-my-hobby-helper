import { createContext, useContext } from "react";
import { TodoItemProps, TodoListProps } from "@/types/Item";

// Context API -> zustand
interface TodoContextProps {
  todos: TodoListProps;
  handleTodos: (id: string, mode: TodoItemProps["status"]) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

interface Props extends TodoContextProps {
  children: React.ReactNode;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export default function TodoProvider({ children, ...rest }: Props) {
  return (
    <TodoContext.Provider value={{ ...rest }}>{children}</TodoContext.Provider>
  );
}

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
};
