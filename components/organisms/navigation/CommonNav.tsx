"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu } from "@/types/Menu";
import { usePathname } from "next/navigation";
import navJson from "@/data/nav.json";

function CommonNav() {
  const [menus] = useState<Menu[]>(navJson);

  const path = usePathname();

  return (
    <nav className="flex flex-row items-center justify-center w-full h-[50px] gap-8 border-b-[5px] border-indigo-900">
      <div className="flex flex-row items-center h-full gap-[15px] no-underline text-white-300 font-medium">
        {menus.map((menu: Menu) => (
          <Link
            href={menu.path}
            key={menu.id}
            className={`text-white hover:text-gray-500 ${
              path.startsWith(menu.path) ? "bg-blue-700 text-white" : ""
            }`}
          >
            <span>{menu.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default CommonNav;
