import { InputProps, TextAreaProps } from "@/types/Props";
import classNames from "classnames";
import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type Props = InputProps | TextAreaProps;

/**
 * 기본 입력 컴포넌트
 *
 * @param {"input" | "textarea"} [as="input"] - 렌더링할 HTML 요소
 * @param {string} className - 적용할 tailwind css
 * @param {React.InputHTMLAttributes<HTMLInputElement> | React.TextareaHTMLAttributes<HTMLTextAreaElement>} rest - 기타 속성
 * @returns {JSX.Element} input 또는 textarea 요소
 */
export default function BaseInput({ as = "input", className, ...rest }: Props) {
  const sharedClass = classNames(className);

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
