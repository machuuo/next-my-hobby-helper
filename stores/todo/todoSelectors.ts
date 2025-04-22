import { TodoState, TodoAction } from "./todoStore";

export const selectTodos = (state: TodoState & TodoAction) => state.todos;
export const selectLoadTodos = (state: TodoState & TodoAction) =>
  state.loadTodos;
export const selectHandleSubmit = (state: TodoState & TodoAction) =>
  state.handleSubmit;
export const selectUpdateTodoItems = (state: TodoState & TodoAction) =>
  state.updateTodoItems;
export const selectDeleteTodoItems = (state: TodoState & TodoAction) =>
  state.deleteTodoItems;
export const selectToggleStatus = (state: TodoState & TodoAction) =>
  state.toggleStatus;
