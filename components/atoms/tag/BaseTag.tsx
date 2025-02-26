"use client";

import { TagProps } from "@/types/Props";
import classNames from "classnames";

export default function BaseTag({
  text,
  color = "gray",
  className = "rounded-md p-0.5",
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
    <span className={classNames(className, colorStyles)} {...rest}>
      {text}
    </span>
  );
}
