import { Suspense } from "react";
import Link from "next/link";
import { API_URL, EventItem } from "@/lib/api";
import { EventGrid, EventGridSkeleton } from "@/components/EventGrid";
import EmptyState from "@/components/EmptyState";
import SectionHeading from "./SectionHeading";

// The home page should still load if the API is down, so errors become an empty list
async function getRecentEvents(): Promise<EventItem[]> {
  try {
    const res = await fetch(`${API_URL}/events?limit=6`, { cache: "no-store" });
    return res.ok ? await res.json() : [];
  } catch {
    return [];
  }
}

async function EventList() {
  const events = await getRecentEvents();
  if (events.length === 0) {
    return (
      <EmptyState
        title="No upcoming events yet."
        text="Be the first to host a distribution drive in your area."
        action={{ href: "/create-event", label: "Create an event" }}
        className="bg-base-100"
      />
    );
  }
  return <EventGrid events={events} />;
}

export default function RecentEvents() {
  return (
    <section className="bg-base-200/60 py-20">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading title="Upcoming Distribution Drives" text="The next events happening around the community. Pick one and join in." />
        <Suspense fallback={<EventGridSkeleton />}>
          <EventList />
        </Suspense>
        <div className="mt-10 text-center">
          <Link href="/events" className="btn btn-outline btn-primary">See all upcoming events</Link>
        </div>
      </div>
    </section>
  );
}
