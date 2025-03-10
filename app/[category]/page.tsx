import { notFound } from "next/navigation";
import { MenuSignatures } from "@/types/IndexSignatures";
import menuJson from "@/data/menu.json";
import { getMenus } from "@/lib/util";

interface Props {
  category: string;
}

export default async function DynamicCategoryPage({
  params,
}: {
  params: Promise<Props>;
}) {
  const { category } = await params;

  const currentMenu = menuJson.find((menu) => menu.id === category);
  if (!currentMenu) return notFound();

  const route: MenuSignatures = getMenus();

  const TargetComponent = route[category];
  if (!TargetComponent) return notFound();

  return <TargetComponent />;
}
