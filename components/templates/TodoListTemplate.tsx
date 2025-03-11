import { ReactNode } from "react";
import styles from "./TodoListTemplate.module.css";

interface Props {
  todoHeader: ReactNode;
  todoColumn: ReactNode[];
}

export const TodoListTemplate = ({ todoHeader, todoColumn }: Props) => (
  <div className={styles.container}>
    {todoHeader}
    <div className={styles.columns}>{todoColumn}</div>
  </div>
);
