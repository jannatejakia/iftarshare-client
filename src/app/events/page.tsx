"use client";
import { EventItem } from "@/lib/api";
import { useFetch } from "@/hooks/useFetch";
import { EventGrid } from "@/components/EventGrid";
import EmptyState from "@/components/EmptyState";

export default function EventsPage() {
  const { data: events, error } = useFetch<EventItem[]>("/events");
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-6 text-2xl font-semibold">Upcoming Events</h1>
      {error ? <div role="alert" className="alert alert-error">{error}</div>
        : events === null ? <p role="status">Loading events...</p>
        : events.length === 0 ? <EmptyState title="No upcoming events yet." />
        : <EventGrid events={events} />}
    </div>
  );
}
