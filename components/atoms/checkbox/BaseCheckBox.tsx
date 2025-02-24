"use client";

import { useState } from "react";
import { CheckBoxProps } from "@/types/Props";

export default function BaseCheckBox({
  checked,
  label,
  onChange,
  className,
  ...rest
}: CheckBoxProps) {
  const [isChecked, setIsChecked] = useState<boolean>(checked || false);

  const handleChange = () => {
    setIsChecked((prevState) => !prevState);
  };

  const checkboxId =
    rest.id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div>
      <input
        type="checkbox"
        id={checkboxId}
        checked={isChecked}
        onChange={handleChange}
        className="w-[25px] h-[25px]"
        {...rest}
      />
      {label && <label htmlFor={checkboxId}>{label}</label>}
    </div>
  );
}
