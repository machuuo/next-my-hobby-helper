"use client";

import { useEffect, useRef, useState } from "react";
import { DropdownProps } from "@/types/Props";
import { BaseButton } from "@/components/atoms/button";
import styles from "./Dropdown.module.css";

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
    // const handleClickOutside = (e: MouseEvent) => {
    //   if (
    //     dropdownRef.current &&
    //     !dropdownRef.current.contains(e.target as Node)
    //   ) {
    //     setIsOpen(false);
    //   }
    // };
    // document.addEventListener("mouseup", handleClickOutside);
    // return () => {
    //   document.removeEventListener("mouseup", handleClickOutside);
    // };
  }, []);

  return (
    <div className={`${styles.dropdown} ${className || ""}`} ref={dropdownRef}>
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
                  setIsOpen(false);
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
