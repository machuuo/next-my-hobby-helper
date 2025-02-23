import {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { Variant, Size } from "./DesignTokens";

// button props
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export interface PrimaryButtonProps extends ButtonProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

// input props
export interface BaseInputProps {
  as?: "input" | "textarea";
  className?: string;
}

export interface InputProps
  extends BaseInputProps,
    InputHTMLAttributes<HTMLInputElement> {}

export interface TextAreaProps
  extends BaseInputProps,
    TextareaHTMLAttributes<HTMLTextAreaElement> {}

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
