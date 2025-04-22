import { ChangeEvent, FormEvent, useState } from "react";
import { useTodoStore } from "@/stores/todo/todoStore";
import {
  selectHandleSubmit,
  selectUpdateTodoItems,
} from "@/stores/todo/todoSelectors";
import { useTodoTemplateStore } from "@/stores/todo/todoTemplateStore";
import { selectUpdateTemplateItems } from "@/stores/todo/todoTemplateSelectors";
import { useModalStore } from "@/stores/modal/modalStore";
import { selectCloseModal } from "@/stores/modal/modalSelectors";
import { StyledButton } from "@/components/atoms/button";
import { StyledInput } from "@/components/atoms/input";
import styles from "./TodoModal.module.css";

interface Props {
  buttonLabel: string;
  context?: "list" | "options";
  todoId?: string;
}

export default function TodoModal({ buttonLabel, context, todoId }: Props) {
  const handleSubmit = useTodoStore(selectHandleSubmit);
  const updateTodoItems = useTodoStore(selectUpdateTodoItems);
  const updateTemplateItems = useTodoTemplateStore(selectUpdateTemplateItems);
  const closeModal = useModalStore(selectCloseModal);
  const [content, setContent] = useState<string>("");

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (todoId && content.length > 0) {
      if (context === "list") {
        updateTodoItems(todoId, content); // today
      } else {
        updateTemplateItems(todoId, content); // templates
      }
    } else {
      const formData = new FormData();
      formData.append("todo", content);

      const customEvent = {
        ...e,
        currentTarget: {
          ...e.currentTarget,
          reset: () => setContent(""),
        },
      } as FormEvent<HTMLFormElement>;

      handleSubmit(customEvent);
    }

    closeModal();
  };

  return (
    <div className={styles.modal}>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <StyledInput
          name="todo"
          as="textarea"
          required
          className={styles.todoInput}
          placeholder="할 일 입력"
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
        />
        <StyledButton type="submit" size="xl" className={styles.button}>
          {buttonLabel}
        </StyledButton>
      </form>
    </div>
  );
}
