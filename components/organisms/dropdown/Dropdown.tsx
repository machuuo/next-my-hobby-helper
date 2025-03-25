"use client";

import { DropdownProps } from "@/types/Props";
import { BaseButton } from "@/components/atoms/button";
import styles from "./Dropdown.module.css";
import { useDropdown } from "@/hooks/useDropdown";

export default function Dropdown({
  buttonContent,
  items,
  className,
}: DropdownProps) {
  const { ref, isOpen, toggle, close } = useDropdown<HTMLDivElement>({});

  const toggleDropdown = () => toggle();

  return (
    <div className={`${styles.dropdown} ${className || ""}`} ref={ref}>
      <BaseButton className={styles.button} onClick={toggleDropdown}>
        {buttonContent}
      </BaseButton>
      {isOpen && (
        <ul className={styles.menu}>
          {items.map((item, index) => (
            <li key={index} className={styles.menuItem}>
              <BaseButton
                onClick={() => {
                  item.onClick();
                  close();
                }}
                className={styles.menuButton}
              >
                {item.label}
              </BaseButton>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
