import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { Variant, Size, TagColor } from "./DesignTokens";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  text: string;
  color?: TagColor; // 색상 계열
  className?: string;
}

// button props
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export interface StyledButtonProps extends ButtonProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

// input props
export interface InputProps {
  as: "input" | "textarea";
  className?: string;
}

export interface StyledInputProps
  extends InputProps,
    InputHTMLAttributes<HTMLInputElement> {}

export interface StyledTextAreaProps
  extends InputProps,
    TextareaHTMLAttributes<HTMLTextAreaElement> {}

// checkbox props
export interface CheckBoxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  checked?: boolean;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

// card props
export interface CardProps {
  title: string;
  description?: string;
  image?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

// Next ^15 page params
export interface PageProps {
  params: Promise<{ page: string }>;
}
