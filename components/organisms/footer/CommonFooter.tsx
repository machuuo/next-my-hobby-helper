import Image from "next/image";
import { BaseButton } from "@/components/atoms/button";
import arrowLeft from "@/assets/icons/icon-arrowLeft.svg";
import arrowRight from "@/assets/icons/icon-arrowRight.svg";

function CommonFooter() {
  return (
    <footer className="flex flex-row items-center justify-center w-full h-[50px] px-4 border border-gray-600 bg-gray-100">
      <div className="flex flex-row items-center justify-center w-full gap-[5px]">
        <BaseButton className="flex flex-row items-center justify-center p-[4px_7px] text-gray-300 font-['Public_Sans'] text-base font-bold leading-4 bg-transparent border-none outline-none cursor-pointer hover:bg-gray-500 hover:text-black">
          <Image src={arrowLeft} alt="" />
        </BaseButton>
        {/* 페이지 개수 UI */}
        <span className="text-gray-500">1</span>
        <BaseButton className="flex flex-row items-center justify-center p-[4px_7px] text-gray-300 font-['Public_Sans'] text-base font-bold leading-4 bg-transparent border-none outline-none cursor-pointer hover:bg-gray-500 hover:text-black">
          <Image src={arrowRight} alt="" />
        </BaseButton>
      </div>
    </footer>
  );
}

export default CommonFooter;
