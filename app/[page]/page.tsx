import { notFound } from "next/navigation";
import { PageProps } from "@/types/Props";
import { PageComponentsProps } from "@/types/IndexSignatures";
import navJson from "@/data/nav.json";
import NoticePage from "./page/notice";
import AuctionPage from "./page/auction";
import TradePage from "./page/trade";

const pageComponents: PageComponentsProps = {
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
