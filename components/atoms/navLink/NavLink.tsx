import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  href: string;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function NavLink({ href, children, className, onClick }: Props) {
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
