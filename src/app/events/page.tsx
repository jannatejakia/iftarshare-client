"use client";
import { useEffect, useState } from "react";
import { EVENT_TYPES, EventItem } from "@/lib/api";
import { useFetch } from "@/hooks/useFetch";
import { EventGrid, EventGridSkeleton } from "@/components/EventGrid";
import EmptyState from "@/components/EmptyState";

export default function EventsPage() {
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  // wait a bit after typing before searching
  useEffect(() => {
    const timer = setTimeout(() => setQuery(search.trim()), 350);
    return () => clearTimeout(timer);
  }, [search]);

  const params = new URLSearchParams();
  if (type) params.set("type", type);
  if (query) params.set("search", query);
  const { data: events, error } = useFetch<EventItem[]>(`/events?${params}`);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-primary sm:text-4xl">Upcoming Events</h1>
        <p className="mt-2 leading-7 opacity-75">Search your area and find an upcoming event to volunteer at. Read the meeting point and tasks before joining.</p>
        <p className="mt-2 text-sm opacity-70">Try Mirpur, Mohammadpur or your district name.</p>
      </div>

      <div className="mb-8 flex flex-col gap-3 sm:flex-row">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title or location" aria-label="Search events" className="input w-full sm:max-w-sm" />
        <select value={type} onChange={(e) => setType(e.target.value)} aria-label="Filter by event type" className="select w-full sm:max-w-xs">
          <option value="">All event types</option>
          {EVENT_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>

      {error ? (
        <div role="alert" className="alert alert-error">{error}</div>
      ) : events === null ? (
        <EventGridSkeleton />
      ) : events.length === 0 ? (
        <EmptyState title="No upcoming events match your search." text="Try a different keyword or event type." />
      ) : (
        <EventGrid events={events} />
      )}
    </div>
  );
}
