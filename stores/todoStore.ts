import { TodoItemProps, TodoListProps } from "@/types/Item";
import { create } from "zustand";

interface State {
  todos: TodoListProps;
}

interface Action {
  setTodos: (todos: TodoListProps) => void;
  loadTodos: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  updateTodoStatus: (id: string, mode: TodoItemProps["status"]) => void;
}

export const useTodoStore = create<State & Action>((set) => ({
  todos: [],
  setTodos: (todos) => {
    set({ todos });
  },
  loadTodos: () => {
    const savedData = localStorage.getItem("data");
    if (savedData) {
      try {
        set({ todos: JSON.parse(savedData) });
      } catch (error) {
        console.error("Failed to parse localStorage data:", error);
        set({ todos: [] });
      }
    }
  },
  handleSubmit: (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const todo = formData.get("todo")?.toString();

    if (!todo?.trim()) return;

    const newTodo = {
      id: new Date().getTime().toString(),
      tags: ["study", "game", "sports"],
      content: todo,
      status: "start" as const,
      createdAt: new Date(),
      priority: "low" as const,
    };

    set((state) => {
      localStorage.setItem("data", JSON.stringify([...state.todos, newTodo]));
      return { todos: [...state.todos, newTodo] };
    });
    e.currentTarget.reset();
  },
  updateTodoStatus: (id, mode) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, status: mode } : todo
      ),
    })),
}));
