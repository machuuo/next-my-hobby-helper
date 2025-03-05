import { StyledButton } from "@/components/atoms/button";
import { StyledInput } from "@/components/atoms/input";
import { useTodoStore } from "@/stores/todoStore";
import styles from "./Todo.module.css";

export default function TodoModalItem() {
  const { handleSubmit } = useTodoStore();

  return (
    <div className="flex flex-row justify-center w-full">
      <form className="flex gap-4" onSubmit={handleSubmit}>
        <StyledInput
          name="todo"
          as="textarea"
          required
          className={styles.todoInput}
          placeholder="할 일 입력"
        />
        <StyledButton type="submit" size="xl" className={styles.todoButton}>
          추가
        </StyledButton>
      </form>
    </div>
  );
}
