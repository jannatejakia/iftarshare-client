import Link from "next/link";
import { EventItem, formatDate } from "@/lib/api";

export default function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="card h-full overflow-hidden border border-base-300 bg-base-100">
      <figure className="h-48 w-full shrink-0 bg-base-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={event.thumbnail} alt={event.title} className="h-full w-full object-cover" loading="lazy" />
      </figure>
      <div className="card-body gap-2 p-5">
        <span className="text-sm opacity-70">{event.eventType}</span>
        <h2 className="card-title line-clamp-1 text-lg">{event.title}</h2>
        <p className="line-clamp-1 text-sm">{event.location}</p>
        <p className="text-sm">{formatDate(event.eventDate)}</p>
        <Link href={`/events/${event._id}`} className="btn btn-primary btn-sm mt-auto">View Event</Link>
      </div>
    </article>
  );
}
