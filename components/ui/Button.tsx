import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-55";

const variants: Record<Variant, string> = {
  primary: "bg-text text-void hover:bg-white",
  secondary:
    "border border-line-strong bg-surface text-text hover:border-dim hover:bg-surface-2",
  ghost: "text-muted hover:text-text",
};

const sizes: Record<Size, string> = {
  md: "px-4 py-2.5 text-sm",
  lg: "px-5 py-3 text-sm md:text-[0.9375rem]",
};

export function buttonClass(
  variant: Variant = "primary",
  size: Size = "md",
  className?: string
) {
  return cn(base, variants[variant], sizes[size], className);
}

/**
 * Renders a next/link for internal hrefs, a plain anchor for external ones
 * (with the right rel), and a button when no href is given.
 */
export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  disabled,
  onClick,
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}) {
  const cls = buttonClass(variant, size, className);

  if (href) {
    const external = /^https?:\/\//.test(href);
    if (external || href.startsWith("mailto:") || href.includes("#")) {
      return (
        <a
          href={href}
          className={cls}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
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

  return (
    <button type={type} className={cls} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
