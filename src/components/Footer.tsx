import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-base-300">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-6 text-sm">
        <p>© IftarShare</p>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-5">
          <Link href="/events" className="hover:underline">Upcoming Events</Link>
          <Link href="/create-event" className="hover:underline">Create Event</Link>
        </nav>
      </div>
    </footer>
  );
}
