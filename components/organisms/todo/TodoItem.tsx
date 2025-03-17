import { TodoItemProps } from "@/types/Item";
import { useTodoStore } from "@/stores/todoStore";
import BaseCheckBox from "@/components/atoms/checkbox/BaseCheckBox";
import Dropdown from "../dropdown/Dropdown";
import styles from "./TodoItem.module.css";

export default function TodoItem({ id, content, status }: TodoItemProps) {
  const { updateTodoStatus, deleteTemplateItems, deleteTemplates } =
    useTodoStore();

  const dropdownItems = [
    // {
    //   label: "수정",
    //   onClick: () => deleteTemplateItems && deleteTemplateItems(id),
    // },
    {
      label: "삭제",
      onClick: () => deleteTemplateItems && deleteTemplateItems(id),
    },
  ];

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
      <Dropdown
        buttonContent="⋮"
        items={dropdownItems}
        className={styles.dropdownPos}
      />
    </div>
  );
}
