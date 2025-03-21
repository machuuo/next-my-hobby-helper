import { TodoItemProps, TodoListProps, TodoTemplateProps } from "@/types/Item";
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
  toggleStatus: (id: string, mode: TodoItemProps["status"]) => void;
}

export const useTodoStore = create<State & Action>((set) => ({
  // Today todos
  todos: [],
  setTodos: (todos) => {
    set({ todos });
  },
  loadTodos: () => {
    try {
      const templates = JSON.parse(localStorage.getItem("templates") || "[]");
      const todayTodos = JSON.parse(localStorage.getItem("today") || "[]");

      // TODO: template과 todos의 status 차이를 확인하고 today todos의 status를 유지하되, content는 계속 갱신할 수 있도록 변경
      const templatesMap = templates.reduce(
        (
          acc: Record<string, TodoTemplateProps>,
          template: TodoTemplateProps
        ) => {
          acc[template.id] = template;
          return acc;
        },
        {} as Record<string, TodoTemplateProps>
      );

      const uniqueTodos = [...templates, ...todayTodos].reduce(
        (acc: Record<string, TodoItemProps>, todo) => {
          const templateItem = templatesMap[todo.id];

          acc[todo.id] = {
            ...todo,
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
