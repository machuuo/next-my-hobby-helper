import { useTodoStore } from "@/stores/todoStore";
import { StyledButton } from "@/components/atoms/button";
import { StyledInput } from "@/components/atoms/input";
import styles from "./TodoHeader.module.css";
import { getTodayDate } from "@/lib/util";

export const TodoHeader = () => {
  const { handleSubmit } = useTodoStore();

  const date = getTodayDate();

  return (
    <header className={styles.header}>
      <h2>{date.date}</h2>
      <div className={styles.contents}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <StyledInput
            name="todo"
            as="textarea"
            required
            className={styles.input}
            placeholder="할 일 입력"
          />
          <StyledButton type="submit" size="xl" className={styles.button}>
            추가
          </StyledButton>
        </form>
      </div>
    </header>
  );
};
