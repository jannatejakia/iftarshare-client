import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="border-b border-base-300">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 lg:grid-cols-2">
        <div>
          <h1 className="max-w-xl text-3xl font-semibold leading-tight sm:text-4xl">Lend a hand at your local iftar.</h1>
          <p className="mt-4 max-w-lg leading-7">Find iftar and food distribution events in Bangladesh. Join an event or organise your own.</p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link href="/events" className="btn btn-primary">Upcoming Events</Link>
            <Link href="/create-event" className="link text-sm font-medium underline-offset-4">Post your event</Link>
          </div>
        </div>
        <figure>
          <Image src="/images/iftar-gathering.jpg" alt="Food and drinks laid out for a shared iftar in Bangladesh" width={500} height={667} priority sizes="(max-width: 640px) 100vw, 500px" className="mx-auto aspect-[4/3] w-full max-w-lg rounded-lg object-cover object-bottom" />
        </figure>
      </div>
    </section>
  );
}
