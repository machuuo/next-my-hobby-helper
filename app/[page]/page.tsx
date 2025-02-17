import { notFound } from "next/navigation";
import { PageProps } from "@/types/Props";
import { PageComponentsProps } from "@/types/IndexSignatures";
import navJson from "@/data/nav.json";
import TodoPage from "@/components/pages/todo";
import NoticePage from "@/components/pages/notice";
import AuctionPage from "@/components/pages/auction";
import TradePage from "@/components/pages/trade";

const pageComponents: PageComponentsProps = {
  todo: TodoPage,
  notice: NoticePage,
  auction: AuctionPage,
  trade: TradePage,
};

async function NaviTransferCenter({ params }: PageProps) {
  const page = (await params).page;
  const navItem = navJson.find((item) => item.id === page);

  if (!navItem) {
    return notFound();
  }

  const PageComponent = pageComponents[page];

  return <PageComponent />;
}

export default NaviTransferCenter;
