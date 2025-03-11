import { TodoItemProps } from "@/types/Item";
import { useTodoStore } from "@/stores/todoStore";
import BaseCheckBox from "@/components/atoms/checkbox/BaseCheckBox";
import styles from "./TodoItem.module.css";

export default function TodoItem(props: TodoItemProps) {
  const { id, content, status } = props;
  const { updateTodoStatus } = useTodoStore();

  const isCompleted = status === "start" ? false : true;

  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const mode = e.target.checked ? "done" : "start";
    updateTodoStatus(id, mode);
  };

  return (
    <div className={styles.item}>
      <BaseCheckBox
        className={styles.checkbox}
        checked={isCompleted}
        onChange={handleCheckBox}
      />
      <p className="text-black">{content}</p>
    </div>
  );
}
