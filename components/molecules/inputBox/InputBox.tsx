import { StyledButton } from "@/components/atoms/button";
import { StyledInput } from "@/components/atoms/input";

export default function InputBox() {
  return (
    <div className="flex flex-row gap-4">
      <StyledInput as="textarea" className="w-[500px] h-40"></StyledInput>
      <StyledButton size="xl" className="bg-slate-50 text-gray-600 w-[100px]">
        추가
      </StyledButton>
    </div>
  );
}
