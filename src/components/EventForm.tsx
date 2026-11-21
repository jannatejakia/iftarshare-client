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
  capacity: number;
};

// datetime-local inputs want "YYYY-MM-DDTHH:mm" in local time
const toLocalInput = (iso: string) => {
  const d = new Date(iso);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
};

export function validateEventForm(v: Record<string, string>) {
  const e: Record<string, string> = {};
  if (v.title.trim().length < 5) e.title = "Title must be at least 5 characters.";
  if (!(EVENT_TYPES as readonly string[]).includes(v.eventType)) e.eventType = "Please choose an event type.";
  if (!/^https?:\/\/.+/i.test(v.thumbnail.trim())) e.thumbnail = "Enter a valid image URL starting with http:// or https://.";
  if (!v.location.trim()) e.location = "Location is required.";
  if (!v.eventDate) e.eventDate = "Please pick a date and time.";
  else if (new Date(v.eventDate) <= new Date()) e.eventDate = "Event date must be in the future.";
  if (!Number.isInteger(Number(v.capacity)) || Number(v.capacity) < 1) e.capacity = "Capacity must be a whole number of at least 1.";
  if (v.description.trim().length < 20) e.description = "Description must be at least 20 characters.";
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
        capacity: Number(raw.capacity),
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
      <FormField label="Capacity (people or packets)" error={errors.capacity}>
        <input name="capacity" type="number" min={1} defaultValue={initial?.capacity ?? 50} className={`input ${cls("capacity")}`} />
      </FormField>
      <FormField label="Date and time" error={errors.eventDate}>
        <input name="eventDate" type="datetime-local" min={minDate} defaultValue={initial ? toLocalInput(initial.eventDate) : ""} className={`input ${cls("eventDate")}`} />
      </FormField>
      <FormField label="Location" error={errors.location}>
        <input name="location" defaultValue={initial?.location} placeholder="e.g. Mirpur 10 Central Field, Dhaka" className={`input ${cls("location")}`} />
      </FormField>
      <FormField label="Thumbnail image URL" error={errors.thumbnail} className="sm:col-span-2">
        <input name="thumbnail" type="url" defaultValue={initial?.thumbnail} placeholder="https://..." className={`input ${cls("thumbnail")}`} />
      </FormField>
      <FormField label="Description" error={errors.description} className="sm:col-span-2">
        <textarea name="description" rows={5} defaultValue={initial?.description} placeholder="Who is it for, what will be served, how can volunteers help?" className={`textarea ${cls("description")}`} />
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
