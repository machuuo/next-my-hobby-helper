import { createContext, useContext } from "react";
import { TodoListProps, TodoStatus } from "@/types/Item";

// Context API -> zustand
interface TodoContextProps {
  todos: TodoListProps;
  handleTodos: (id: string, mode: TodoStatus) => void;
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
