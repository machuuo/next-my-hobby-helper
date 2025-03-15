import { StyledButton } from "@/components/atoms/button";
import { StyledInput } from "@/components/atoms/input";
import styles from "./TodoHeader.module.css";
import { getTodayDate } from "@/lib/util";

interface Props {
  showDate?: boolean;
  inputLabel: string;
  buttonLabel?: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  children?: React.ReactNode;
}

const TodoHeader = ({
  showDate = true,
  inputLabel,
  buttonLabel = "추가",
  onSubmit,
  children,
}: Props) => {
  const date = getTodayDate();

  return (
    <header className={styles.header}>
      <h2>{showDate && date.date}</h2>
      <div className={styles.contents}>
        <form className={styles.form} onSubmit={onSubmit}>
          <StyledInput
            name="todo"
            as="textarea"
            required
            className={styles.input}
            placeholder={inputLabel}
          />
          <StyledButton type="submit" size="xl" className={styles.button}>
            {buttonLabel}
          </StyledButton>
        </form>
      </div>
      <div>{children}</div>
    </header>
  );
};

export default TodoHeader;
