"use client";

export function CategoryTabs<T extends string>({
  items,
  active,
  onChange,
}: {
  items: readonly T[];
  active: T;
  onChange: (value: T) => void;
}) {
  return (
    <div
      role="tablist"
      className="flex flex-wrap items-center gap-2 rounded-full bg-cream-soft p-1.5"
    >
      {items.map((item) => {
        const isActive = item === active;
        return (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(item)}
            className={[
              "rounded-full px-4 py-2 font-body text-sm font-semibold uppercase",
              "tracking-wide transition-colors duration-[var(--duration-fast)] ease-standard",
              isActive
                ? "bg-paper text-ink"
                : "text-ink-muted hover:text-ink-soft",
            ].join(" ")}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
