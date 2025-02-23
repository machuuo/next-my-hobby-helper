import { PrimaryButton } from "@/components/atoms/button";
import { PrimaryInput } from "@/components/atoms/input";

export default function InputBox() {
  return (
    <div className="flex flex-row gap-4">
      <PrimaryInput as="textarea" className="w-[500px] h-40"></PrimaryInput>
      <PrimaryButton size="xl" className="bg-slate-50 text-gray-600 w-[100px]">
        추가
      </PrimaryButton>
    </div>
  );
}
