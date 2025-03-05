"use client";

import { useState } from "react";
import { CheckBoxProps } from "@/types/Props";
import classNames from "classnames";

export default function BaseCheckBox({
  checked,
  label,
  onChange,
  className,
  ...rest
}: CheckBoxProps) {
  const [isChecked, setIsChecked] = useState<boolean>(checked || false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
    setIsChecked((prevState) => !prevState);
  };

  const checkboxId =
    rest.id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div>
      <input
        type="checkbox"
        className={classNames(className)}
        id={checkboxId}
        checked={isChecked}
        onChange={handleChange}
        {...rest}
      />
      {label && <label htmlFor={checkboxId}>{label}</label>}
    </div>
  );
}
