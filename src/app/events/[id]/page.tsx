"use client";
import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useFetch } from "@/hooks/useFetch";
import { apiFetch, ApiError, EventItem, formatDate } from "@/lib/api";

export default function EventDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const { data: event, setData: setEvent, error } = useFetch<EventItem>(`/events/${id}`);
  const [joining, setJoining] = useState(false);
  const [joined, setJoined] = useState(false);

  async function handleJoin() {
    if (!user) {
      toast.info("Please log in to join as a volunteer.");
      router.push(`/login?redirect=/events/${id}`);
      return;
    }
    setJoining(true);
    try {
      const res = await apiFetch<{ message: string }>(`/events/${id}/join`, { method: "POST" }, true);
      toast.success(res.message + " You are signed up as a volunteer.");
      setJoined(true);
      setEvent((prev) => (prev ? { ...prev, joinedCount: (prev.joinedCount ?? 0) + 1 } : prev));
    } catch (e) {
      toast.error((e as ApiError).message);
    } finally {
      setJoining(false);
    }
  }

  if (error)
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <div role="alert" className="alert alert-error justify-center">{error}</div>
        <Link href="/events" className="btn btn-primary mt-6">Back to events</Link>
      </div>
    );

  if (!event)
    return (
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="skeleton h-72 w-full sm:h-96" />
        <div className="skeleton mt-6 h-8 w-2/3" />
        <div className="skeleton mt-4 h-24 w-full" />
      </div>
    );

  const joinedCount = event.joinedCount ?? 0;
  const full = joinedCount >= event.capacity;
  const past = new Date(event.eventDate) <= new Date();
  const isOwner = user?.email === event.creatorEmail;
  const percent = Math.min(100, Math.round((joinedCount / event.capacity) * 100));

  let button = (
    <button onClick={handleJoin} disabled={joining} className="btn btn-primary btn-lg w-full">
      {joining && <span className="loading loading-spinner" />} Join as a volunteer
    </button>
  );
  if (joined) button = <button disabled className="btn btn-success w-full">You are signed up to volunteer</button>;
  else if (past) button = <button disabled className="btn btn-lg w-full">This event has ended</button>;
  else if (full) button = <button disabled className="btn btn-lg w-full">Event is full</button>;
  else if (isOwner) button = <button disabled className="btn btn-lg w-full">You are the organiser</button>;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Link href="/events" className="link mb-5 inline-block text-sm opacity-75">← Back to upcoming events</Link>
      <div className="overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={event.thumbnail} alt={event.title} className="h-64 w-full object-cover sm:h-96" />
        <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <span className="badge badge-secondary">{event.eventType}</span>
            <h1 className="mt-3 text-3xl font-extrabold text-primary sm:text-4xl">{event.title}</h1>
            <p className="mt-1 text-sm opacity-70">Organised by {event.creatorName || event.creatorEmail}</p>
            <p className="mt-6 whitespace-pre-line leading-relaxed">{event.description}</p>
          </div>
          <aside className="space-y-5 rounded-box bg-base-200/70 p-6">
            <div>
              <p className="text-sm font-semibold opacity-70">When</p>
              <p>{formatDate(event.eventDate)}</p>
              <p className="mt-1 text-xs opacity-65">Bangladesh time (UTC+6)</p>
            </div>
            <div>
              <p className="text-sm font-semibold opacity-70">Where</p>
              <p>{event.location}</p>
            </div>
            <div>
              <p className="mb-1 flex justify-between text-sm font-semibold opacity-70">
                <span>Volunteers joined</span>
                <span>{joinedCount} / {event.capacity}</span>
              </p>
              <progress className="progress progress-primary w-full" value={percent} max={100} />
            </div>
            {button}
            <p className="text-sm leading-6 opacity-75">Joining signs you up to help the organiser. It does not reserve a meal or food pack. Check the description for your tasks and meeting point.</p>
            {!user && !past && <p className="text-center text-xs opacity-70">You need to log in before joining.</p>}
          </aside>
        </div>
      </div>
    </div>
  );
}
