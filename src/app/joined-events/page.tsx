"use client";
import { useEffect } from "react";
import { toast } from "sonner";
import { JoinedItem } from "@/lib/api";
import { useFetch } from "@/hooks/useFetch";
import { EventGrid } from "@/components/EventGrid";
import EmptyState from "@/components/EmptyState";

export default function JoinedEventsPage() {
  const { data, error } = useFetch<JoinedItem[]>("/my-joined", true);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  // show the empty state if loading failed
  const joined = data ?? (error ? [] : null);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-extrabold text-primary sm:text-4xl">Joined Events</h1>
      <p className="mb-8 mt-2 opacity-75">Events you have joined, sorted by event date.</p>

      {joined === null ? (
        <p role="status">Loading events...</p>
      ) : joined.length === 0 ? (
        <EmptyState
          title="You have not joined any events yet."
          action={{ href: "/events", label: "Browse upcoming events" }}
        />
      ) : (
        <EventGrid events={joined.map((item) => item.event)} />
      )}
    </div>
  );
}
