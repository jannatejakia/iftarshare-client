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
  const { data: session, isPending } = authClient.useSession();
  const { data: event, error } = useFetch<EventItem>(`/events/${id}`);
  const [joining, setJoining] = useState(false);
  const [joined, setJoined] = useState(false);

  async function handleJoin() {
    if (!session?.user) {
      router.push(`/login?redirect=/events/${id}`);
      return;
    }
    setJoining(true);
    try {
      const response = await apiFetch<{ message: string }>(`/events/${id}/join`, { method: "POST" }, true);
      toast.success(response.message);
      setJoined(true);
    } catch (error) {
      toast.error((error as ApiError).message);
    } finally {
      setJoining(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link href="/events" className="link mb-6 inline-block text-sm">Back to upcoming events</Link>
      {error ? <div role="alert" className="alert alert-error">{error}</div> : !event ? <p role="status">Loading event...</p> : (
        <article className="overflow-hidden rounded-box border border-base-300">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={event.thumbnail} alt={event.title} className="h-64 w-full object-cover sm:h-96" />
          <div className="space-y-4 p-6 sm:p-8">
            <p className="text-sm opacity-70">{event.eventType}</p>
            <h1 className="text-3xl font-bold text-primary">{event.title}</h1>
            <p>{event.location}</p>
            <p>{formatDate(event.eventDate)}</p>
            <p className="whitespace-pre-line leading-7">{event.description}</p>
            <button onClick={handleJoin} disabled={isPending || joining || joined} className="btn btn-primary">
              {joining ? "Joining..." : joined ? "Joined" : "Join Event"}
            </button>
          </div>
        </article>
      )}
    </div>
  );
}
