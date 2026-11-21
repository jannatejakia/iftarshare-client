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
      <h1 className="text-3xl font-extrabold text-primary sm:text-4xl">Create an Event</h1>
      <p className="mb-8 mt-2 opacity-75">Tell the community what you are distributing, where and when.</p>
      <div className="card border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
        <EventForm submitLabel="Create Event" onSubmit={handleCreate} />
      </div>
    </div>
  );
}
