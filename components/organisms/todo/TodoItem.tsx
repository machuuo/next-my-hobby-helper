import { BaseTodoProps, TodoSource, TodoStatus } from "@/types/Item";
import { useModalStore } from "@/stores/modal/modalStore";
import { selectOpenModal } from "@/stores/modal/modalSelectors";
import TodoModalItem from "./TodoModal";
import BaseCheckBox from "@/components/atoms/checkbox/BaseCheckBox";
import Dropdown from "@/components/organisms/dropdown/Dropdown";
import styles from "./TodoItem.module.css";

interface Props extends BaseTodoProps {
  context: "list" | "options";
  source: TodoSource;
  status: TodoStatus;
  onDelete: (id: string) => void;
  onUpdateStatus?: (id: string, mode: TodoStatus) => void;
}

export default function TodoItem({
  id,
  content,
  status,
  context,
  source,
  onDelete,
  onUpdateStatus,
}: Props) {
  const openModal = useModalStore(selectOpenModal);

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
        {context === "list" && source === "template" ? (
          // 모양 유지용..
          <></>
        ) : (
          <Dropdown buttonContent="⋮" items={dropdownItems} />
        )}
      </div>
    </div>
  );
}
