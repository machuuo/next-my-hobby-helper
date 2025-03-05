import { TodoItemProps } from "@/types/Item";
import { useTodoStore } from "@/stores/todoStore";
import BaseCheckBox from "@/components/atoms/checkbox/BaseCheckBox";
import styles from "./Todo.module.css";

export default function TodoItem(props: TodoItemProps) {
  const { id, content, status } = props;
  const { updateTodoStatus } = useTodoStore();

  const isCompleted = status === "start" ? false : true;

  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const mode = e.target.checked ? "done" : "start";
    updateTodoStatus(id, mode);
  };

  return (
    <div className="flex flex-row self-start gap-3">
      <BaseCheckBox
        className={styles.todoCheckbox}
        checked={isCompleted}
        onChange={handleCheckBox}
      />
      <p className="text-black">{content}</p>
    </div>
  );
}
