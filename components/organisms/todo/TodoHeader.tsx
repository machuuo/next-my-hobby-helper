import { useTodoStore } from "@/stores/todoStore";
import { StyledButton } from "@/components/atoms/button";
import { StyledInput } from "@/components/atoms/input";
import styles from "./Todo.module.css";
import { getTodayDate } from "@/lib/util";

const TodoHeader = () => {
  const { handleSubmit } = useTodoStore();

  const date = getTodayDate();

  return (
    <header className="flex flex-col gap-4 items-center justify-center w-full min-h-[150px] max-h-[250px] bg-blue-500 text-white">
      <h2>{date.date}</h2>
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
    </header>
  );
};

export default TodoHeader;
