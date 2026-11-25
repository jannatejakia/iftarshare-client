"use client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import EventForm, { EventFormValues } from "@/components/EventForm";
import { apiFetch, ApiError } from "@/lib/api";

export default function CreateEventPage() {
  const router = useRouter();

  async function handleCreate(values: EventFormValues) {
    try {
      await apiFetch("/events", { method: "POST", body: JSON.stringify(values) }, true);
      toast.success("Your event has been created.");
      router.push("/events");
    } catch (e) {
      toast.error((e as ApiError).message);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-semibold">Create an Event</h1>
      <p className="mb-8 mt-2 opacity-75">Add your event details.</p>
      <div className="rounded-md border border-base-300 p-4 sm:p-6">
        <EventForm submitLabel="Create Event" onSubmit={handleCreate} />
      </div>
    </div>
  );
}
