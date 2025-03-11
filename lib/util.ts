import dynamic from "next/dynamic";
import { MenuSignatures, SubMenuSignatures } from "@/types/IndexSignatures";
import menuJson from "@/data/menu.json";

export function formatDate(date: Date): string {
  const dateFormat = new Date(date);

  const year = dateFormat.getFullYear();
  // 월은 0부터 시작하므로 1을 더하고, 두 자리 숫자로 맞춤
  const month = (dateFormat.getMonth() + 1).toString().padStart(2, "0");
  const day = dateFormat.getDate().toString().padStart(2, "0");
  const hours = dateFormat.getHours().toString().padStart(2, "0");
  const minutes = dateFormat.getMinutes().toString().padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  const hours = today.getHours().toString().padStart(2, "0");
  const minutes = today.getMinutes().toString().padStart(2, "0");
  const seconds = today.getSeconds().toString().padStart(2, "0");

  return {
    full: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
    date: `${year}년 ${month}월 ${day}일`,
    time: `${hours}:${minutes}:${seconds}`,
    timestamp: today.getTime().toString(),
    parts: { year, month, day, hours, minutes, seconds },
  };
}

export function getMenus(): MenuSignatures {
  return menuJson.reduce((acc, menu) => {
    acc[menu.id] = dynamic(() =>
      import(`@/components/pages/${menu.id}`).then((mod) => mod.default)
    );

    return acc;
  }, {} as MenuSignatures);
}

export function getSubMenus(): SubMenuSignatures {
  return menuJson.reduce((acc, menu) => {
    if (menu.subMenus && menu.subMenus.length > 0) {
      acc[menu.id] = menu.subMenus.reduce((subAcc, subMenu) => {
        const componentName = subMenu.id;
        try {
          subAcc[subMenu.id] = dynamic(() =>
            import(`@/components/pages/${menu.id}/${componentName}`).then(
              (mod) => mod.default
            )
          );
        } catch (e) {
          console.error(`Component for ${subMenu.id} not found \n${e}`);
        }
        return subAcc;
      }, {} as { [key: string]: React.ComponentType });
    }
    return acc;
  }, {} as SubMenuSignatures);
}
