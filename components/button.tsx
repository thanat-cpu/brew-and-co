import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "dark" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-body font-semibold " +
  "tracking-wide transition-colors duration-[var(--duration-fast)] ease-standard " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold " +
  "disabled:opacity-40 disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-paper text-ink hover:bg-cream-soft",
  dark: "bg-ink text-cream hover:bg-ink-soft",
  outline: "border border-line-strong text-ink hover:bg-cream-soft",
  ghost: "text-ink-soft hover:underline",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-6 text-base",
  lg: "h-14 px-8 text-lg",
};

function classes(variant: ButtonVariant, size: ButtonSize, className?: string) {
  return [base, variants[variant], sizes[size], className]
    .filter(Boolean)
    .join(" ");
}

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return (
      <Link
        href={href}
        className={classes(variant, size, className)}
        {...rest}
      />
    );
  }

  return (
    <button
      className={classes(variant, size, className)}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    />
  );
}
