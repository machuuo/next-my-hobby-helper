import {
  TodoItemProps,
  TodoListProps,
  TodoStatus,
  TodoTemplateProps,
} from "@/types/Item";
import { create } from "zustand";

interface State {
  todos: TodoListProps;
}

interface Action {
  setTodos: (todos: TodoListProps) => void;
  loadTodos: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  updateTodoItems: (id: string, content: string) => void;
  deleteTodoItems: (id: string) => void;
  toggleStatus: (id: string, mode: TodoStatus) => void;
}

export const useTodoStore = create<State & Action>((set) => ({
  todos: [],
  setTodos: (todos) => {
    set({ todos });
  },
  loadTodos: () => {
    try {
      const templates = JSON.parse(localStorage.getItem("templates") || "[]");
      const todayTodos = JSON.parse(localStorage.getItem("today") || "[]");

      // templates 목록이 갱신됐을 경우 동기화를 위한 작업
      const filteredTodayTodos = todayTodos.filter(
        (todo: TodoItemProps | TodoTemplateProps) => {
          if (todo.source === "template") {
            return templates.some(
              (template: TodoTemplateProps) => template.id === todo.id
            );
          }
          return true;
        }
      );

      const uniqueTodos = [...templates, ...filteredTodayTodos].reduce(
        (acc: Record<string, TodoItemProps>, todo) => {
          const templateItem = templates.find(
            (template: TodoTemplateProps) => template.id === todo.id
          );

          acc[todo.id] = {
            ...todo,
            status: todo.status ? todo.status : "start",
            content: templateItem ? templateItem.content : todo.content,
          };
          return acc;
        },
        {} as Record<string, TodoItemProps>
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
      priority: "low" as const,
      source: "temporary" as const,
      status: "start" as const,
      date: new Date(),
    };

    set((state) => {
      const returnData = [...state.todos, newTodo];

      localStorage.setItem("today", JSON.stringify(returnData));
      return { todos: returnData };
    });
    e.currentTarget.reset();
  },
  updateTodoItems: (id, content) => {
    set((state) => {
      const updatedTodos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, content } : todo
      );

      // today의 데이터만 업데이트하기 위해 필터링
      const todayTodos = updatedTodos.filter((todo) => todo.date);
      localStorage.setItem("today", JSON.stringify(todayTodos));

      return { todos: updatedTodos };
    });
  },

  deleteTodoItems: (id) => {
    set((state) => {
      const filteredTodos = state.todos.filter((todo) => todo.id !== id);

      // today의 데이터만 저장하기 위해 필터링
      const todayTodos = filteredTodos.filter((todo) => todo.date);
      localStorage.setItem("today", JSON.stringify(todayTodos));

      return { todos: filteredTodos };
    });
  },
  toggleStatus: (id, mode) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, status: mode } : todo
      ),
    })),
}));
