"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { Menu } from "@/types/Menu";
import styles from "./CommonNav.module.css";
import Link from "next/link";
import navJson from "@/data/nav.json";

function CommonNav() {
  const [menus] = useState<Menu[]>(navJson);

  const path = usePathname();

  return (
    <nav className={styles.navigation}>
      <div className={styles.menu}>
        {menus.map((menu: Menu) => (
          <Link
            href={menu.path}
            key={menu.id}
            className={`text-white hover:text-gray-500 ${
              path.startsWith(menu.path) ? "bg-blue-700 text-white" : ""
            }`}
          >
            <span className={styles.label}>{menu.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default CommonNav;
