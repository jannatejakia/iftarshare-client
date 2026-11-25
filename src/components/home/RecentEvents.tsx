import { Suspense } from "react";
import Link from "next/link";
import { API_URL, EventItem } from "@/lib/api";
import { EventGrid } from "@/components/EventGrid";

// Keep an unavailable noticeboard distinct from one with no upcoming events.
async function getRecentEvents(): Promise<EventItem[] | null> {
  try {
    const res = await fetch(`${API_URL}/events?limit=6`, { cache: "no-store" });
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
}

async function EventList() {
  const events = await getRecentEvents();
  if (events === null) return <p role="alert" className="rounded-md bg-base-200 px-5 py-5 text-sm">The noticeboard could not load. <Link href="/events" className="link">Open events to try again.</Link></p>;
  if (events.length === 0) {
    return (
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-md bg-base-200 px-5 py-5">
        <p className="text-sm leading-6">No upcoming events yet.</p>
        <Link href="/create-event" className="link shrink-0 text-sm font-semibold">Post an event</Link>
      </div>
    );
  }
  return <EventGrid events={events} />;
}

export default function RecentEvents() {
  return (
    <section className="border-b border-base-300 py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-2xl font-semibold">Upcoming events</h2>
          <Link href="/events" className="link text-sm">All upcoming events</Link>
        </div>
        <Suspense fallback={<p role="status">Loading events...</p>}>
          <EventList />
        </Suspense>
      </div>
    </section>
  );
}
