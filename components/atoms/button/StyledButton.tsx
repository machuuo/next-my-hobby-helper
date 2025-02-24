"use client";

import { StyledButtonProps } from "@/types/Props";
import styles from "../atoms.module.css";
import BaseButton from "./BaseButton";
import classNames from "classnames";

/**
 * 스타일이 지정된 버튼 컴포넌트
 *
 * @param {StyledButtonProps} props - 버튼 속성을 지정하는 객체
 * @param {string} props.variant - 버튼의 스타일 유형 (default, primary, success 등)
 * @param {string} props.size - 버튼의 크기 (sm, md, lg, xl)
 * @param {boolean} props.fullWidth - 버튼이 부모 너비를 가득 채울지 여부
 * @param {string} props.className - 추가적인 CSS 클래스를 지정할 수 있음
 * @param {React.ReactNode} props.children - 버튼 내부에 표시될 요소
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} props.rest - 기타 버튼 속성 (onClick, disabled 등)
 * @returns {JSX.Element} 스타일이 적용된 버튼 요소를 반환
 */
export function StyledButton({
  variant = "default",
  size = "md",
  fullWidth = false,
  className,
  children,
  ...rest
}: StyledButtonProps) {
  const buttonClass = `
    ${styles[variant]}
    ${styles[size]}
    ${classNames(className)}
    ${fullWidth ? styles.fullWidth : ""}
  `;

  return (
    <BaseButton className={classNames(buttonClass.trim())} {...rest}>
      {children}
    </BaseButton>
  );
}
