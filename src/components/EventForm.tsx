"use client";
import { FormEvent, useState } from "react";
import { EVENT_TYPES, EventItem } from "@/lib/api";
import FormField from "./FormField";

export type EventFormValues = {
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
};

// Convert stored dates to the browser's local datetime input format.
const toLocalInput = (iso: string) => {
  const date = new Date(iso);
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 16);
};

export function validateEventForm(v: Record<string, string>) {
  const e: Record<string, string> = {};
  if (!v.title.trim()) e.title = "Title is required.";
  if (!(EVENT_TYPES as readonly string[]).includes(v.eventType)) e.eventType = "Please choose an event type.";
  if (!/^https?:\/\/.+/i.test(v.thumbnail.trim())) e.thumbnail = "Enter a valid image URL starting with http:// or https://.";
  if (!v.location.trim()) e.location = "Location is required.";
  if (!v.eventDate) e.eventDate = "Please pick a date and time.";
  else if (!Number.isFinite(new Date(v.eventDate).getTime()) || new Date(v.eventDate) <= new Date()) e.eventDate = "Choose a future date and time.";
  if (!v.description.trim()) e.description = "Description is required.";
  return e;
}

export default function EventForm({
  initial,
  submitLabel,
  onSubmit,
}: {
  initial?: EventItem;
  submitLabel: string;
  onSubmit: (v: EventFormValues) => Promise<void>;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const minDate = toLocalInput(new Date().toISOString());

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    const found = validateEventForm(raw);
    setErrors(found);
    if (Object.keys(found).length) return;
    setBusy(true);
    try {
      await onSubmit({
        title: raw.title.trim(),
        description: raw.description.trim(),
        eventType: raw.eventType,
        thumbnail: raw.thumbnail.trim(),
        location: raw.location.trim(),
        eventDate: new Date(raw.eventDate).toISOString(),
      });
    } finally {
      setBusy(false);
    }
  }

  // red border when a field has an error
  const cls = (name: string) => `w-full ${errors[name] ? "input-error select-error textarea-error" : ""}`;

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
      <FormField label="Event title" error={errors.title} className="sm:col-span-2">
        <input name="title" defaultValue={initial?.title} placeholder="e.g. Community Iftar at Mirpur 10" className={`input ${cls("title")}`} />
      </FormField>
      <FormField label="Event type" error={errors.eventType}>
        <select name="eventType" defaultValue={initial?.eventType ?? ""} className={`select ${cls("eventType")}`}>
          <option value="" disabled>Choose a type</option>
          {EVENT_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </FormField>
      <FormField label="Date and time" error={errors.eventDate}>
        <input name="eventDate" type="datetime-local" min={minDate} defaultValue={initial ? toLocalInput(initial.eventDate) : ""} className={`input ${cls("eventDate")}`} />
      </FormField>
      <FormField label="Location" error={errors.location}>
        <input name="location" defaultValue={initial?.location} placeholder="Area, meeting point and district, e.g. Mirpur 10, Dhaka" className={`input ${cls("location")}`} />
      </FormField>
      <FormField label="Thumbnail image URL" error={errors.thumbnail} className="sm:col-span-2">
        <input name="thumbnail" type="url" defaultValue={initial?.thumbnail} placeholder="https://..." className={`input ${cls("thumbnail")}`} />
      </FormField>
      <FormField label="Description" error={errors.description} className="sm:col-span-2">
        <textarea name="description" rows={5} defaultValue={initial?.description} placeholder="Event details" className={`textarea ${cls("description")}`} />
      </FormField>
      <div className="sm:col-span-2">
        <button type="submit" disabled={busy} className="btn btn-primary w-full sm:w-auto">
          {busy && <span className="loading loading-spinner loading-sm" />}
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
