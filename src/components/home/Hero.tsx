import Link from "next/link";

const stats = [
  ["5", "Event types"],
  ["1-click", "Joining"],
  ["100%", "Community run"],
];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-neutral text-neutral-content">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1600&auto=format&fit=crop&q=70"
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-35"
      />
      <div className="mx-auto max-w-7xl px-4 py-24 sm:py-32">
        <span className="badge badge-secondary mb-5 px-4 py-3 font-medium">Ramadan Mubarak 🌙</span>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight sm:text-6xl">
          Share an Iftar. <span className="text-secondary">Feed a neighbour.</span>
        </h1>
        <p className="mt-5 max-w-xl text-lg opacity-90">
          IftarShare connects neighbours who want to distribute meals with people who need them. Create a drive, join one nearby, and make this Ramadan count.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/events" className="btn btn-secondary btn-lg">Find an event</Link>
          <Link href="/create-event" className="btn btn-outline btn-lg border-neutral-content text-neutral-content hover:bg-neutral-content hover:text-neutral">
            Host a distribution
          </Link>
        </div>
        <dl className="mt-12 grid max-w-xl grid-cols-3 gap-6 text-center sm:text-left">
          {stats.map(([value, label]) => (
            <div key={label}>
              <dt className="text-2xl font-bold text-secondary">{value}</dt>
              <dd className="text-sm opacity-80">{label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
