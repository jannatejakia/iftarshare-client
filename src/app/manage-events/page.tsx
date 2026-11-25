"use client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import EventForm, { EventFormValues } from "@/components/EventForm";
import EmptyState from "@/components/EmptyState";
import { useFetch } from "@/hooks/useFetch";
import { apiFetch, ApiError, EventItem, formatDate } from "@/lib/api";

export default function ManageEventsPage() {
  const { data: events, setData, error } = useFetch<EventItem[]>("/my-events", true);
  const [editing, setEditing] = useState<EventItem | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleUpdate(values: EventFormValues) {
    if (!editing) return;
    try {
      await apiFetch(`/events/${editing._id}`, { method: "PATCH", body: JSON.stringify(values) }, true);
      setData(list => list?.map(event => event._id === editing._id ? { ...event, ...values } : event) ?? null);
      setEditing(null);
      toast.success("Event updated.");
    } catch (error) { toast.error((error as ApiError).message); }
  }

  async function handleDelete(id: string) {
    setDeleting(id);
    try {
      await apiFetch(`/events/${id}`, { method: "DELETE" }, true);
      setData(list => list?.filter(event => event._id !== id) ?? null);
      toast.success("Event deleted.");
    } catch (error) { toast.error((error as ApiError).message); }
    finally { setDeleting(null); }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-extrabold text-primary sm:text-4xl">Manage Events</h1>
      {editing ? (
        <section className="max-w-3xl">
          <h2 className="mb-4 text-xl font-semibold">Update event</h2>
          <EventForm initial={editing} submitLabel="Save changes" onSubmit={handleUpdate} />
          <button onClick={() => setEditing(null)} className="btn btn-ghost mt-4">Cancel</button>
        </section>
      ) : error ? <div role="alert" className="alert alert-error">{error}</div>
        : events === null ? <p role="status">Loading events...</p>
        : events.length === 0 ? <EmptyState title="You have not created any events yet." action={{ href: "/create-event", label: "Create Event" }} />
        : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead><tr><th>Event</th><th>Type</th><th>Date</th><th>Actions</th></tr></thead>
              <tbody>{events.map(event => (
                <tr key={event._id}>
                  <td><Link href={`/events/${event._id}`} className="link">{event.title}</Link></td>
                  <td>{event.eventType}</td>
                  <td>{formatDate(event.eventDate)}</td>
                  <td><div className="flex gap-2">
                    <button onClick={() => setEditing(event)} disabled={deleting !== null} className="btn btn-primary btn-sm">Update</button>
                    <button onClick={() => handleDelete(event._id)} disabled={deleting !== null} className="btn btn-error btn-sm">{deleting === event._id ? "Deleting..." : "Delete"}</button>
                  </div></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
    </div>
  );
}
