import { SpecimenFrame } from "@/components/specimen-frame";
import type { MenuItem } from "@/lib/menu";

export function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <article className="flex flex-col gap-4">
      <div className="relative">
        <SpecimenFrame src={item.image} alt={item.name} size="md" />
        {item.badge && (
          <span className="absolute left-2 top-2 rounded-full bg-gold px-3 py-1 font-body text-micro font-semibold uppercase tracking-wider text-ink">
            {item.badge}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-body text-micro font-medium uppercase tracking-wider text-ink-muted">
          {item.category}
        </span>
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display-sm text-title font-bold text-ink">
            {item.name}
          </h3>
          <span className="font-mono-data text-body-lg text-ink-soft">
            £{item.price.toFixed(2)}
          </span>
        </div>
        <p className="font-body text-caption text-ink-muted">
          {item.description}
        </p>
      </div>
    </article>
  );
}
