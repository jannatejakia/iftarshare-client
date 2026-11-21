import Link from "next/link";
import { Logo } from "./Navbar";

const XLogo = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
);
const FbLogo = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true"><path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.7V3.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2v2.3H7.7V13h2.7v8z" /></svg>
);
const IgLogo = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>
);

export default function Footer() {
  return (
    <footer className="mt-16 bg-neutral text-neutral-content">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <Logo />
          <p className="text-sm opacity-80">
            A neighbourhood platform to organise and join Iftar, Sehri and food-distribution events, so no one in the community goes hungry.
          </p>
          <div className="flex gap-3 pt-1">
            <a href="https://x.com" target="_blank" rel="noreferrer" className="btn btn-circle btn-ghost btn-sm border-neutral-content/30" aria-label="X"><XLogo /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="btn btn-circle btn-ghost btn-sm border-neutral-content/30" aria-label="Facebook"><FbLogo /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="btn btn-circle btn-ghost btn-sm border-neutral-content/30" aria-label="Instagram"><IgLogo /></a>
          </div>
        </div>
        <div>
          <h3 className="mb-3 font-semibold text-secondary">Explore</h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/events" className="hover:underline">Upcoming Events</Link></li>
            <li><Link href="/create-event" className="hover:underline">Create an Event</Link></li>
            <li><Link href="/joined-events" className="hover:underline">My Joined Events</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-semibold text-secondary">Event types</h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li>Iftar Packet</li>
            <li>Sehri Meal</li>
            <li>Food Pack</li>
            <li>Water &amp; Dates</li>
            <li>Eid Gift</li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-semibold text-secondary">Contact</h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li>House 12, Road 5, Dhanmondi, Dhaka</li>
            <li>hello@iftarshare.example</li>
            <li>+880 1700-000000</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-neutral-content/15 py-4 text-center text-xs opacity-70">
        © IftarShare. Made with care for the community.
      </div>
    </footer>
  );
}
