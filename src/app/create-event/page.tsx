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
      <p className="mb-3 mt-2 leading-7 opacity-75">Tell volunteers what help you need, where to meet and when to arrive. Use Bangladesh time for the event date.</p>
      <p lang="bn" className="mb-8 text-sm leading-7 opacity-70">খাবারের প্যাকেটের সংখ্যা নয়, কতজন স্বেচ্ছাসেবক দরকার তা লিখুন। ঠিকানার সঙ্গে পরিচিত কোনো জায়গার নাম দিলে খুঁজে পাওয়া সহজ হয়।</p>
      <div className="card border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
        <EventForm submitLabel="Create Event" onSubmit={handleCreate} />
      </div>
    </div>
  );
}
