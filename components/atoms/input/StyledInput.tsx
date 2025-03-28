"use client";

import { StyledInputProps, StyledTextAreaProps } from "@/types/Props";
import classNames from "classnames";
import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type Props = StyledInputProps | StyledTextAreaProps;

/**
 * 스타일이 지정된 입력 컴포넌트
 *
 * @param {"input" | "textarea"} [as="input"] - 렌더링할 HTML 요소
 * @param {string} props.className - 추가 적용할 tailwind css
 * @param {React.InputHTMLAttributes<HTMLInputElement> | React.TextareaHTMLAttributes<HTMLTextAreaElement>} props.rest - 기타 속성
 * @returns {JSX.Element} input 또는 textarea 요소
 */
export function StyledInput({ as = "input", className, ...rest }: Props) {
  const primaryStyle =
    "border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400 bg-gray-600";
  const sharedClass = classNames(className, primaryStyle);

  if (as === "input") {
    return (
      <input
        className={sharedClass}
        {...(rest as InputHTMLAttributes<HTMLInputElement>)}
      ></input>
    );
  }

  return (
    <textarea
      className={sharedClass}
      {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
    ></textarea>
  );
}
