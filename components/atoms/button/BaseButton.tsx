import { ButtonProps } from "@/types/Props";
import styles from "../atoms.module.css";
import classNames from "classnames";

/**
 * 기본 버튼 컴포넌트
 *
 * @param {ButtonProps} props - 버튼 속성을 지정하는 객체
 * @param {string} props.className - 추가적인 css 클래스 지정
 * @param {React.ReactNode} props.children - 버튼 내부에 표시될 요소 (innerText)
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} rest - 기타 버튼 속성 (onClick, disabled, ...)
 * @returns {JSX.Element} 버튼 반환
 */
export default function BaseButton({
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button className={classNames(styles.button, className)} {...rest}>
      {children}
    </button>
  );
}
