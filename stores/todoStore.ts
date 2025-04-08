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

      const start = new Date();
      start.setHours(0, 0, 0, 0);
      const end = new Date();
      end.setHours(23, 59, 59, 999);

      // 과거 (어제, 혹은 먼 과거)의 임시 할 일 제거한 목록
      const realTodayTodos = todayTodos.filter((todo: TodoItemProps) => {
        if (todo.source === "temporary") {
          const todoDate = new Date(todo.date);
          return (
            todoDate.getTime() >= start.getTime() &&
            todoDate.getTime() <= end.getTime()
          );
        } else if (todo.source === "template") {
          return true;
        }
        return false;
      });

      // templates 목록이 갱신됐을 경우 동기화한 목록
      const filteredTodayTodos = realTodayTodos.filter(
        (todo: TodoItemProps | TodoTemplateProps) => {
          if (todo.source === "template") {
            return templates.some(
              (template: TodoTemplateProps) => template.id === todo.id
            );
          }
          return true;
        }
      );

      // 템플릿, 오늘의 할 일 목록을 합쳐서 중복 제거한 목록
      const uniqueTodos = [...templates, ...filteredTodayTodos].reduce(
        (acc: Record<string, TodoItemProps>, todo) => {
          const templateItem = templates.find(
            (template: TodoTemplateProps) => template.id === todo.id
          );

          let todoDate = new Date(todo.date);
          const isPreviousTodo = todoDate.getTime() < start.getTime();

          const todoContent = templateItem
            ? templateItem.content
            : todo.content;
          const todoStatus =
            todoDate && isPreviousTodo ? "start" : todo.status || "start";
          todoDate = isPreviousTodo || !todoDate ? new Date() : todoDate;

          acc[todo.id] = {
            ...todo,
            content: todoContent,
            status: todoStatus,
            date: todoDate,
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
