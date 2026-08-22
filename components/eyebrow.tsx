import type { ReactNode } from "react";

export function Eyebrow({
  children,
  chip = false,
  className = "",
}: {
  children: ReactNode;
  chip?: boolean;
  className?: string;
}) {
  return (
    <span
      className={[
        "font-body text-micro font-medium uppercase tracking-wider text-ink-soft",
        chip ? "rounded-full bg-cream-soft px-3 py-1" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}
