import { SpecimenFrame } from "@/components/specimen-frame";
import { ReserveTableButton } from "@/components/reserve-table";
import type { EventItem } from "@/lib/events";

export function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="flex flex-col gap-5 rounded-2xl bg-cream-soft p-6 sm:flex-row sm:items-center">
      <SpecimenFrame
        src={event.image}
        alt={event.name}
        size="md"
        aspect="aspect-[4/3]"
        className="w-full sm:w-56 sm:shrink-0"
      />
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex flex-col gap-1">
          <span className="font-body text-micro font-medium uppercase tracking-wider text-ink-muted">
            {event.cadence} · {event.time}
          </span>
          <h3 className="font-display-sm text-title font-bold text-ink">
            {event.name}
          </h3>
        </div>
        <p className="font-body text-caption text-ink-soft">
          {event.description}
        </p>
        <ReserveTableButton variant="outline" size="sm" className="self-start">
          Reserve a spot
        </ReserveTableButton>
      </div>
    </article>
  );
}
