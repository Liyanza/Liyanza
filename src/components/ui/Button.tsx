import { ReactNode } from "react";
import { Link } from "@/i18n/navigation";

type Variant = "solid" | "outline" | "cta";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  solid:
    "bg-green-accent-dark text-white hover:bg-green-600 shadow-sm shadow-green-accent-dark/20",
  outline:
    "border-2 border-green-accent-dark text-green-accent-dark bg-transparent hover:bg-green-accent-dark/5",
  cta: "bg-gradient-to-r from-green-accent to-green-accent-dark text-white shadow-xl shadow-green-accent/40 hover:brightness-105",
};

const sizes: Record<Size, string> = {
  sm: "px-5 py-2 text-sm",
  md: "px-7 py-3.5 text-sm",
  lg: "px-8 py-4 text-sm",
};

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  "aria-label"?: string;
}

export function Button({
  children,
  variant = "solid",
  size = "sm",
  icon,
  iconPosition = "right",
  href,
  className = "",
  onClick,
  type = "button",
  ...rest
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const content = (
    <>
      {icon && iconPosition === "left" ? icon : null}
      {children}
      {icon && iconPosition === "right" ? icon : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...rest}>
      {content}
    </button>
  );
}
