import {
  TodoItemProps,
  TodoListProps,
  TodoTemplateListProps,
} from "@/types/Item";
import { create } from "zustand";

interface State {
  todoTemplates: TodoTemplateListProps;
  todos: TodoListProps;
}

interface Action {
  setTodoTemplates: (templates: TodoTemplateListProps) => void;
  loadTodoTemplates: () => void;
  handleSubmitTemplateItems: (e: React.FormEvent<HTMLFormElement>) => void;
  deleteTemplateItems: (id: string) => void;
  updateTemplateItems: (id: string, content: string) => void;
  deleteTemplates: (templateId: string) => void;
  setTodos: (todos: TodoListProps) => void;
  loadTodos: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  updateTodoStatus: (id: string, mode: TodoItemProps["status"]) => void;
}

export const useTodoStore = create<State & Action>((set) => ({
  // Templates
  todoTemplates: [],
  setTodoTemplates: (templates) => {
    set({ todoTemplates: templates });
  },
  loadTodoTemplates: () => {
    const storedData = localStorage.getItem("templates");
    if (storedData) {
      try {
        set({ todoTemplates: JSON.parse(storedData) });
      } catch (error) {
        console.error("Failed to parse localStorage data:", error);
        set({ todos: [] });
      }
    }
  },
  handleSubmitTemplateItems: (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const todo = formData.get("todo")?.toString();

    if (!todo?.trim()) return;

    const newTemplate = {
      id: new Date().getTime().toString(),
      content: todo,
      status: "start" as const,
      priority: "low" as const,
      // isSelected: false,
    };

    set((state) => {
      const returnData = [...state.todoTemplates, newTemplate];

      localStorage.setItem("templates", JSON.stringify(returnData));
      return { todoTemplates: returnData };
    });
    e.currentTarget.reset();
  },
  deleteTemplateItems: (id) => {
    set((state) => ({
      todoTemplates: state.todoTemplates.filter((item) => item.id !== id),
    }));
  },
  updateTemplateItems: (id, content) => {},
  deleteTemplates(templateId) {},
  // Today todos
  todos: [],
  setTodos: (todos) => {
    set({ todos });
  },
  loadTodos: () => {
    try {
      const templates = JSON.parse(localStorage.getItem("templates") || "[]");
      const todayTodos = JSON.parse(localStorage.getItem("today") || "[]");

      const uniqueTodos = [...templates, ...todayTodos].reduce(
        (acc: Record<string, TodoItemProps>, cur) => {
          acc[cur.id] = cur;
          return acc;
        },
        {}
      );

      set({ todos: Object.values(uniqueTodos) });
    } catch (error) {
      console.error("Failed to parse localStorage data:", error);
      set({ todos: [] });
    }
  },
  handleSubmit: (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const todo = formData.get("todo")?.toString();

    if (!todo?.trim()) return;

    const newTodo = {
      id: new Date().getTime().toString(),
      content: todo,
      status: "start" as const,
      priority: "low" as const,
      date: new Date(),
    };

    set((state) => {
      const returnData = [...state.todos, newTodo];

      localStorage.setItem("today", JSON.stringify(returnData));
      return { todos: returnData };
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
