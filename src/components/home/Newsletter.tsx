"use client";
import { FormEvent, useState } from "react";

// Frontend-only form interaction; the assignment does not require email delivery.
export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-10">
      <div className="border-t border-base-300 pt-8 sm:flex sm:items-center sm:justify-between sm:gap-8">
        <h2 className="text-xl font-semibold">Newsletter</h2>
        <div className="mt-4 sm:mt-0">
          <form aria-label="Newsletter signup" onSubmit={handleSubmit} className="flex flex-wrap gap-2">
            <input name="email" type="email" required maxLength={254} autoComplete="email" onChange={() => setSubmitted(false)} placeholder="Your email address" aria-label="Email address" className="input w-full sm:w-64" />
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </form>
          {submitted && <p role="status" className="mt-2 text-sm text-success">Email submitted successfully.</p>}
        </div>
      </div>
    </section>
  );
}
