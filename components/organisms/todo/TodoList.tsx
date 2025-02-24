"use client";

import { TodoListProps } from "@/types/Item";
import TodoCard from "@/components/organisms/todo/TodoCard";
import styles from "./TodoList.module.css";
import classNames from "classnames";

interface Props {
  todos?: TodoListProps;
  className?: string;
}

export default function TodoList(props: Props) {
  const { todos = [], className } = props;

  return (
    <div className={classNames(styles.todoListWrapper, className)}>
      {["start", "done"].map((mode) => {
        let HeadingStr;

        if (mode === "start") {
          HeadingStr = "시작";
        } else {
          HeadingStr = "완료";
        }

        const Heading = <h2 className="self-center">{HeadingStr}</h2>;

        return (
          <div key={mode} className={styles.todoList}>
            {Heading}
            {todos.length > 0 &&
              todos
                .filter((todo) => todo.status === mode)
                .map((todo) => <TodoCard key={todo.id} {...todo} />)}
          </div>
        );
      })}
    </div>
  );
}
