"use client";

import Link from "next/link";
import { BaseButton } from "@/components/atoms/button";
import { useNavStore } from "@/stores/navStore";
import styles from "./CommonNav.module.css";

function CommonNav() {
  const { menus, openMenu, toggleMenu } = useNavStore();

  return (
    <nav className={styles.nav}>
      <ul className={styles.menu}>
        {menus.map((menu) => {
          const subMenus = menu.subMenus || [];
          return (
            <li key={menu.id} className={styles.menuItem}>
              <BaseButton
                className={styles.menuButton}
                onClick={() => subMenus.length && toggleMenu(menu.id)}
              >
                {!subMenus.length ? (
                  <Link href={menu.path} className={styles.subMenuLink}>
                    {menu.label}
                  </Link>
                ) : (
                  <>{menu.label}</>
                )}
              </BaseButton>
              {subMenus.length > 0 && openMenu === menu.id && (
                <ul className={styles.subMenu}>
                  {subMenus.map((item) => (
                    <li key={item.id} className={styles.subMenuItem}>
                      <Link href={item.path} className={styles.subMenuLink}>
                        {item.label}
                      </Link>
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
