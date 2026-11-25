"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import ThemeToggle from "./ThemeToggle";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-xl font-extrabold text-primary">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-secondary" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" /></svg>
      IftarShare
    </Link>
  );
}

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await authClient.signOut();
    toast.success("You have been logged out.");
    router.push("/");
    router.refresh();
  }

  const link = (href: string, label: string) => (
    <Link href={href} className={pathname === href ? "font-semibold text-primary" : ""}>{label}</Link>
  );

  return (
    <header className="border-b border-base-300 bg-base-100">
      <div className="navbar mx-auto max-w-7xl px-4">
        <div className="navbar-start gap-1">
          <div className="dropdown lg:hidden">
            <button tabIndex={0} className="btn btn-ghost btn-circle" aria-label="Open menu">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h8" /></svg>
            </button>
            <ul tabIndex={0} className="menu menu-sm dropdown-content z-50 mt-3 w-52 rounded-md border border-base-300 bg-base-100 p-2">
              <li>{link("/", "Home")}</li>
              <li>{link("/events", "Upcoming Events")}</li>
            </ul>
          </div>
          <Logo />
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1">
            <li>{link("/", "Home")}</li>
            <li>{link("/events", "Upcoming Events")}</li>
          </ul>
        </div>

        <div className="navbar-end gap-1">
          <ThemeToggle />
          {isPending ? (
            <span role="status" className="text-sm">Loading...</span>
          ) : user ? (
            <>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="tooltip tooltip-bottom btn btn-ghost btn-circle avatar" data-tip={user.name}>
                  <div className="w-10 rounded-full border border-base-300">
                    {user.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={user.image} alt={user.name} referrerPolicy="no-referrer" />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center bg-primary font-bold text-primary-content">{user.name?.[0]?.toUpperCase()}</span>
                    )}
                  </div>
                </div>
                <ul tabIndex={0} className="menu dropdown-content z-50 mt-3 w-56 rounded-md border border-base-300 bg-base-100 p-2">
                  <li className="menu-title truncate">{user.name}</li>
                  <li><Link href="/create-event">Create Event</Link></li>
                  <li><Link href="/manage-events">Manage Events</Link></li>
                  <li><Link href="/joined-events">Joined Events</Link></li>
                </ul>
              </div>
              <button onClick={handleLogout} className="btn btn-outline btn-primary btn-sm">Logout</button>
            </>
          ) : (
            <Link href="/login" className="btn btn-primary btn-sm">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}
