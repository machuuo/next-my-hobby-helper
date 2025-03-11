interface Props {
  children: React.ReactNode;
  className?: string;
}

export const Heading = ({ children, className }: Props) => (
  <h2 className={className}>{children}</h2>
);
