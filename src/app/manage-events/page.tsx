"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import EventForm, { EventFormValues } from "@/components/EventForm";
import EmptyState from "@/components/EmptyState";
import { useFetch } from "@/hooks/useFetch";
import { apiFetch, ApiError, EventItem, formatDate } from "@/lib/api";

export default function ManageEventsPage() {
  const { data, setData, error } = useFetch<EventItem[]>("/my-events", true);
  const [editing, setEditing] = useState<EventItem | null>(null);
  const [deleting, setDeleting] = useState<EventItem | null>(null);
  const [busyDelete, setBusyDelete] = useState(false);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  // show the empty state if loading failed
  const events = data ?? (error ? [] : null);

  async function handleUpdate(values: EventFormValues) {
    if (!editing) return;
    try {
      await apiFetch(`/events/${editing._id}`, { method: "PATCH", body: JSON.stringify(values) }, true);
      setData((list) => list?.map((e) => (e._id === editing._id ? { ...e, ...values } : e)) ?? null);
      toast.success("Event updated successfully.");
      setEditing(null);
    } catch (e) {
      toast.error((e as ApiError).message);
    }
  }

  async function handleDelete() {
    if (!deleting) return;
    setBusyDelete(true);
    try {
      await apiFetch(`/events/${deleting._id}`, { method: "DELETE" }, true);
      setData((list) => list?.filter((e) => e._id !== deleting._id) ?? null);
      toast.success("Event deleted.");
      setDeleting(null);
    } catch (e) {
      toast.error((e as ApiError).message);
    } finally {
      setBusyDelete(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-primary sm:text-4xl">Manage Events</h1>
          <p className="mt-2 opacity-75">Update or remove the events you have created.</p>
        </div>
        <Link href="/create-event" className="btn btn-primary">+ New event</Link>
      </div>

      {events === null ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => <div key={i} className="skeleton h-20 w-full" />)}
        </div>
      ) : events.length === 0 ? (
        <EmptyState
          title="You have not created any events yet."
          action={{ href: "/create-event", label: "Create your first event" }}
        />
      ) : (
        <div className="overflow-x-auto rounded-box border border-base-300 bg-base-100">
          <table className="table">
            <thead>
              <tr><th>Event</th><th>Type</th><th>Date</th><th>Capacity</th><th className="text-right">Actions</th></tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr key={e._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={e.thumbnail} alt="" className="h-12 w-16 rounded-lg object-cover" />
                      <div>
                        <Link href={`/events/${e._id}`} className="font-semibold hover:underline">{e.title}</Link>
                        <p className="text-xs opacity-70">{e.location}</p>
                      </div>
                    </div>
                  </td>
                  <td><span className="badge badge-secondary badge-outline whitespace-nowrap">{e.eventType}</span></td>
                  <td className="whitespace-nowrap text-sm">{formatDate(e.eventDate)}</td>
                  <td>{e.capacity}</td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setEditing(e)} className="btn btn-sm btn-outline btn-primary">Update</button>
                      <button onClick={() => setDeleting(e)} className="btn btn-sm btn-outline btn-error">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* update popup */}
      {editing && (
        <dialog className="modal modal-open" aria-label="Update event">
          <div className="modal-box max-w-2xl">
            <h3 className="mb-4 text-xl font-bold">Update event</h3>
            <EventForm initial={editing} submitLabel="Save changes" onSubmit={handleUpdate} />
            <button onClick={() => setEditing(null)} className="btn btn-ghost btn-sm mt-3">Cancel</button>
          </div>
          <div className="modal-backdrop" onClick={() => setEditing(null)} />
        </dialog>
      )}

      {/* delete popup */}
      {deleting && (
        <dialog className="modal modal-open" aria-label="Confirm delete">
          <div className="modal-box">
            <h3 className="text-xl font-bold">Delete this event?</h3>
            <p className="py-4">
              <span className="font-semibold">{deleting.title}</span> and everyone who joined it will be removed. This cannot be undone.
            </p>
            <div className="modal-action">
              <button onClick={() => setDeleting(null)} disabled={busyDelete} className="btn">Keep event</button>
              <button onClick={handleDelete} disabled={busyDelete} className="btn btn-error">
                {busyDelete && <span className="loading loading-spinner loading-sm" />} Yes, delete
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => !busyDelete && setDeleting(null)} />
        </dialog>
      )}
    </div>
  );
}
