import { notFound } from "next/navigation";
import { SubMenuSignatures } from "@/types/IndexSignatures";
import menuJson from "@/data/menu.json";
import { getSubMenus } from "@/lib/util";

interface Props {
  category: string;
  subCategory: string;
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<Props>;
}) {
  const { category, subCategory } = await params;

  const currentPath = `/${category}/${subCategory}`;

  const currentMenu = menuJson.find((menu) => menu.id === category);
  if (!currentMenu || !currentMenu.subMenus) return notFound();

  const matchedSubItem = currentMenu.subMenus.find(
    (subItem) => subItem.path === currentPath
  );
  if (!matchedSubItem) return notFound();
  const subMenuId = matchedSubItem.id;

  const route: SubMenuSignatures = getSubMenus();

  const categoryRoutes = route[category];
  if (!categoryRoutes) return notFound();

  const TargetComponent = categoryRoutes[subMenuId];
  if (!TargetComponent) return notFound();

  return <TargetComponent />;
}
