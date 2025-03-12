import { ReactNode } from "react";
import styles from "./TodoTemplate.module.css";
import classNames from "classnames";

interface Props {
  children: ReactNode;
  className?: string;
}

export const TodoTemplate = ({ children, className }: Props) => (
  <div className={classNames(styles.container, className)}>{children}</div>
);
