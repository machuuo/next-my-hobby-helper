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

export interface FixedButtonProps extends ButtonProps {
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

// card props (need to modify)
export interface CardProps {
  alt_description: string;
  blur_hash: string;
  breadcrumbs: [];
  color: string;
  created_at: string;
  current_user_collections: [];
  description: string;
  height: number;
  id: string;
  liked_by_user: boolean;
  likes: number;
  promoted_at?: string;
  slug: string;
  sponsorship?: string;
  updated_at: string;
  width: number;
}

export interface PageProps {
  params: Promise<{ page: string }>;
}
