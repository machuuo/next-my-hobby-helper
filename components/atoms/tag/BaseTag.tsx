"use client";

import { ColorName, colors, ColorShade } from "@/styles/design-tokens";
import { TagProps } from "@/types/Props";
import classNames from "classnames";
import { HTMLAttributes } from "react";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  text: string;
  color?: ColorName; // 색상 계열
  shade?: ColorShade; // 밝기 단계
  onClick?: () => void;
}

export default function BaseTag({
  text,
  color = "gray",
  onClick,
  className,
  ...rest
}: TagProps) {
  const colorStyles = {
    gray: "bg-gray-200 text-gray-800",
    red: "bg-red-200 text-red-800",
    blue: "bg-blue-200 text-blue-800",
    green: "bg-green-200 text-green-800",
    yellow: "bg-yellow-200 text-yellow-800",
  }[color];

  return (
    <span className={classNames(className, colorStyles, "rounded-md p-0.5")}>
      {text}
    </span>
  );
}
