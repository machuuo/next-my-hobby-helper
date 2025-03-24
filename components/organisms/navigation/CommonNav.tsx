"use client";

import { useState } from "react";
import menus from "@/data/menu.json";
import { useDropdown } from "@/hooks/useDropdown";
import { BaseButton } from "@/components/atoms/button";
import NavLink from "@/components/atoms/navLink/NavLink";
import styles from "./CommonNav.module.css";

function CommonNav() {
  const [activeMenu, setActiveMenu] = useState<string>();
  const { ref, isOpen, toggle, close } = useDropdown<HTMLUListElement>({});

  const handleMenu = (id: string) => {
    if (activeMenu === id && isOpen) {
      close();
      setActiveMenu("");
    } else {
      toggle();
      setActiveMenu(id);
    }
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.menu} ref={ref}>
        {menus.map((menu) => {
          const subMenus = menu.subMenus || [];
          const hasSubMenus = subMenus.length > 0;

          return (
            <li key={menu.id} className={styles.menuItem}>
              {!hasSubMenus ? (
                <NavLink href={menu.path} className={styles.menuButton}>
                  {menu.label}
                </NavLink>
              ) : (
                <BaseButton
                  className={styles.menuButton}
                  onClick={() => handleMenu(menu.id)}
                >
                  {menu.label}
                </BaseButton>
              )}
              {hasSubMenus && activeMenu === menu.id && isOpen && (
                <ul className={styles.subMenu}>
                  {subMenus.map((item) => (
                    <li key={item.id} className={styles.subMenuItem}>
                      <NavLink
                        href={item.path}
                        className={styles.subMenuNavLink}
                        onClick={close}
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default CommonNav;
