import type { ReactNode } from "react";

export function SectionHeading({
  children,
  marker,
  eyebrow,
  align = "start",
}: {
  children: ReactNode;
  marker?: string;
  eyebrow?: string;
  align?: "start" | "center";
}) {
  return (
    <div
      className={
        align === "center"
          ? "flex flex-col items-center gap-2 text-center"
          : "flex items-end justify-between gap-6"
      }
    >
      <div className="flex flex-col gap-2">
        {eyebrow && (
          <span className="font-body text-micro font-medium uppercase tracking-wider text-ink-soft">
            {eyebrow}
          </span>
        )}
        <h2 className="font-display text-display text-ink">{children}</h2>
      </div>
      {marker && align !== "center" && (
        <span className="font-mono-data text-title text-ink-muted">
          {marker}
        </span>
      )}
    </div>
  );
}
