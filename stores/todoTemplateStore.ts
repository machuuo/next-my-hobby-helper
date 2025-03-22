import { TodoTemplateListProps } from "@/types/Item";
import { create } from "zustand";

interface State {
  todoTemplates: TodoTemplateListProps;
}

interface Action {
  setTodoTemplates: (templates: TodoTemplateListProps) => void;
  loadTodoTemplates: () => void;
  handleSubmitTemplateItems: (e: React.FormEvent<HTMLFormElement>) => void;
  deleteTemplateItems: (id: string) => void;
  updateTemplateItems: (id: string, content: string) => void;
  // deleteTemplates: (templateId: string) => void;
}

export const useTodoTemplateStore = create<State & Action>((set) => ({
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
        set({ todoTemplates: [] });
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
      priority: "low" as const,
      source: "template" as const,
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
  updateTemplateItems: (id, content) => {
    set((state) => {
      const updatedTemplateItem = state.todoTemplates.map((item) =>
        item.id === id ? { ...item, content } : item
      );

      localStorage.setItem("templates", JSON.stringify(updatedTemplateItem));

      return { todoTemplates: updatedTemplateItem };
    });
  },
}));
