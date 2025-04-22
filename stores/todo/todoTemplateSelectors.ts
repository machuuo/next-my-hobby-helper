import { TodoTemplateState, TodoTemplateAction } from "./todoTemplateStore";

export const selectTodoTemplates = (
  state: TodoTemplateState & TodoTemplateAction
) => state.todoTemplates;
export const selectSetTodoTemplates = (
  state: TodoTemplateState & TodoTemplateAction
) => state.setTodoTemplates;
export const selectLoadTodoTemplates = (
  state: TodoTemplateState & TodoTemplateAction
) => state.loadTodoTemplates;
export const selectHandleSubmitTemplateItems = (
  state: TodoTemplateState & TodoTemplateAction
) => state.handleSubmitTemplateItems;
export const selectDeleteTemplateItems = (
  state: TodoTemplateState & TodoTemplateAction
) => state.deleteTemplateItems;
export const selectUpdateTemplateItems = (
  state: TodoTemplateState & TodoTemplateAction
) => state.updateTemplateItems;
