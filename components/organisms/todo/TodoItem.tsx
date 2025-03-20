import { TodoItemProps } from "@/types/Item";
import { useModalStore } from "@/stores/modalStore";
import TodoModalItem from "./TodoModal";
import BaseCheckBox from "@/components/atoms/checkbox/BaseCheckBox";
import Dropdown from "@/components/organisms/dropdown/Dropdown";
import styles from "./TodoItem.module.css";

interface Props extends TodoItemProps {
  context: "list" | "options";
  onDelete: (id: string) => void;
  onUpdateStatus?: (id: string, mode: TodoItemProps["status"]) => void;
}

export default function TodoItem({
  id,
  content,
  status,
  context,
  isRepeat,
  onDelete,
  onUpdateStatus,
}: Props) {
  const { openModal } = useModalStore();

  const dropdownItems = [
    {
      label: "수정",
      onClick: () =>
        openModal(
          "Todo 수정",
          <TodoModalItem buttonLabel="수정" todoId={id} context={context} />
        ),
    },
    {
      label: "삭제",
      onClick: () => onDelete?.(id),
    },
  ];

  const isCompleted = status === "start" ? false : true;

  const handleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const mode = e.target.checked ? "done" : "start";
    onUpdateStatus?.(id, mode);
  };

  return (
    <div className={styles.item}>
      <BaseCheckBox
        className={styles.checkbox}
        checked={isCompleted}
        onChange={handleCheckBox}
      />
      <p className="text-black">{content}</p>
      <div className={styles.dropdownPos}>
        {context === "list" && isRepeat === true ? (
          // 모양 유지용..
          <></>
        ) : (
          <Dropdown buttonContent="⋮" items={dropdownItems} />
        )}
      </div>
    </div>
  );
}
