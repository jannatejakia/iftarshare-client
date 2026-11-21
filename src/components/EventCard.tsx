import Link from "next/link";
import { EventItem, formatDate } from "@/lib/api";

export default function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="card h-full overflow-hidden border border-base-300 bg-base-100 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <figure className="relative h-48 w-full shrink-0 bg-base-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={event.thumbnail} alt={event.title} className="h-full w-full object-cover" loading="lazy" />
        <span className="badge badge-secondary absolute left-3 top-3 font-medium">{event.eventType}</span>
      </figure>
      <div className="card-body flex-1 gap-2 p-5">
        <h3 className="card-title line-clamp-1 text-lg">{event.title}</h3>
        <p className="line-clamp-2 text-sm opacity-75">{event.description}</p>
        <ul className="mt-1 space-y-1 text-sm">
          <li className="flex items-start gap-2"><span aria-hidden>📍</span><span className="line-clamp-1">{event.location}</span></li>
          <li className="flex items-start gap-2"><span aria-hidden>🗓️</span><span>{formatDate(event.eventDate)}</span></li>
        </ul>
        <div className="card-actions mt-auto pt-3">
          <Link href={`/events/${event._id}`} className="btn btn-primary btn-sm w-full">View Event</Link>
        </div>
      </div>
    </article>
  );
}

export function EventCardSkeleton() {
  return (
    <div className="card h-full overflow-hidden border border-base-300 bg-base-100">
      <div className="skeleton h-48 w-full rounded-none" />
      <div className="card-body gap-3 p-5">
        <div className="skeleton h-5 w-3/4" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-2/3" />
        <div className="skeleton mt-3 h-8 w-full" />
      </div>
    </div>
  );
}
