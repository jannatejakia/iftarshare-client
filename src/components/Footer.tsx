import Link from "next/link";
import { Logo } from "./Navbar";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-base-300 bg-base-200/50">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-3 max-w-sm text-sm leading-7 opacity-75">A noticeboard for iftar, sehri and food distribution volunteers in Bangladesh.</p>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-col items-start gap-3 text-sm">
          <Link href="/events" className="hover:underline">Upcoming Events</Link>
          <Link href="/create-event" className="hover:underline">Create an Event</Link>
          <Link href="/joined-events" className="hover:underline">Joined Events</Link>
          <Link href="https://github.com/jannatejakia/iftarshare-client" className="hover:underline">About this project</Link>
        </nav>
        <div className="text-sm leading-7 opacity-75">
          <p className="font-medium text-base-content">Meeting the organiser</p>
          <p>Check the event description for the meeting point and volunteer tasks. Organisers provide their own event information.</p>
          <p className="mt-2">All event times are shown in Bangladesh time (UTC+6).</p>
        </div>
      </div>
      <p className="mx-auto max-w-7xl border-t border-base-300 px-4 py-4 text-xs opacity-60">© IftarShare · A community event project in Bangladesh.</p>
    </footer>
  );
}
