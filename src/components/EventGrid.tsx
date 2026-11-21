import { EventItem } from "@/lib/api";
import EventCard, { EventCardSkeleton } from "./EventCard";

const gridClass = "grid gap-6 sm:grid-cols-2 lg:grid-cols-3";

export function EventGrid({ events }: { events: EventItem[] }) {
  return (
    <div className={gridClass}>
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  );
}

export function EventGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className={gridClass}>
      {Array.from({ length: count }).map((_, i) => (
        <EventCardSkeleton key={i} />
      ))}
    </div>
  );
}
