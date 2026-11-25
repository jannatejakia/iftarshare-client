"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";

export default function Newsletter() {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [failed, setFailed] = useState(false);

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setBusy(true);
    setMessage("");
    setFailed(false);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.get("email"), consent: data.get("consent") === "on", website: data.get("website") }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Could not save your email. Please try again.");
      setMessage(result.message);
      form.reset();
    } catch (error) {
      setFailed(true);
      setMessage(error instanceof Error ? error.message : "Could not reach the server. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section id="updates" className="mx-auto max-w-7xl px-4 pb-8">
      <div className="grid gap-6 rounded-lg bg-base-200 px-6 py-8 md:grid-cols-2 md:gap-12 sm:px-8">
        <div>
          <h2 className="text-2xl font-semibold">Keep up with new events</h2>
          <p className="mt-3 max-w-md leading-7 opacity-75">Leave your email for event announcements. You can check what is coming up on the noticeboard anytime.</p>
          <Link href="/events" className="link mt-3 inline-block text-sm">Open the noticeboard</Link>
        </div>
        <form aria-label="Event email signup" onSubmit={subscribe} className="self-center">
          <label htmlFor="newsletter-email" className="mb-2 block text-sm font-medium">Your email address</label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input id="newsletter-email" name="email" type="email" required maxLength={254} autoComplete="email" placeholder="you@example.com" className="input w-full bg-base-100" />
            <button type="submit" disabled={busy} className="btn btn-primary">{busy ? "Saving..." : "Subscribe"}</button>
          </div>
          <label className="mt-3 flex items-start gap-2 text-xs leading-5">
            <input name="consent" type="checkbox" required className="checkbox checkbox-sm mt-0.5 shrink-0 border-base-content/50" />
            <span>I agree to have my email stored for the IftarShare event updates list.</span>
          </label>
          <div hidden aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
          {message && <p role={failed ? "alert" : "status"} className={`mt-3 text-sm leading-6 ${failed ? "text-error" : "text-success"}`}>{message}</p>}
        </form>
      </div>
    </section>
  );
}
