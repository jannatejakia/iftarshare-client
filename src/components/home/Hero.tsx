import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="border-b border-base-300">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:py-16 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">Lend a hand at your local iftar.</h1>
          <p className="mt-5 max-w-lg text-lg leading-8 opacity-80">Find iftar and food distribution events in Bangladesh. Join an event or organise your own.</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
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
