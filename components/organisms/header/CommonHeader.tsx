import Link from "next/link";
import ProfileBox from "@/components/molecules/profileBox/ProfileBox";
import LogoBox from "@/components/molecules/logo/LogoBox";

function CommonHeader() {
  return (
    <header className="flex items-center justify-between w-full h-[50px] py-0 px-4">
      <Link href={"/"}>
        <LogoBox />
      </Link>
      <ProfileBox />
    </header>
  );
}

export default CommonHeader;
