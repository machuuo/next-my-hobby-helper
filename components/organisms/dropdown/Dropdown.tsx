"use client";

import { DropdownProps } from "@/types/Props";

import styles from "./Dropdown.module.css";
import { useEffect, useRef, useState } from "react";

export default function Dropdown({
  buttonContent,
  items,
  className,
}: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mouseup", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, []);

  return (
    <div className={`${styles.dropdown} ${className || ""}`} ref={dropdownRef}>
      <button className={styles.button} onClick={toggleDropdown}>
        {buttonContent}
      </button>
      {isOpen && (
        <ul className={styles.menu}>
          {items.map((item, index) => (
            <li key={index} className={styles.menuItem}>
              <button
                onClick={() => {
                  item.onClick();
                  setIsOpen(false); // 항목 클릭 시 닫기
                }}
                className={styles.menuButton}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
