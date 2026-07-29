import Link from "next/link";
import type { ReactNode } from "react";

const styles = {
  primary:
    "bg-accent-600 text-paper-0 hover:bg-accent-700",
  secondary:
    "border-[1.5px] border-primary-600 text-primary-600 hover:bg-primary-100",
  onDark:
    "border-[1.5px] border-paper-0 text-paper-0 hover:bg-paper-0/10",
} as const;

export function Button({
  href,
  variant = "primary",
  external = false,
  children,
  className = "",
}: {
  href: string;
  variant?: keyof typeof styles;
  external?: boolean;
  children: ReactNode;
  className?: string;
}) {
  const cls = `inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-6 font-semibold transition-colors duration-150 ${styles[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
