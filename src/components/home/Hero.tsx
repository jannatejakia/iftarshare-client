import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="border-b border-base-300">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:py-16 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="mb-5 text-sm font-medium tracking-wide opacity-65">IFTARSHARE / BANGLADESH</p>
          <h1 className="max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">Lend a hand at your local iftar.</h1>
          <p className="mt-5 max-w-lg text-lg leading-8 opacity-80">Pack meals, set out water or help with distribution. Find an organiser in your area who could use an extra pair of hands.</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/events" className="btn btn-primary">See volunteer opportunities</Link>
            <Link href="/create-event" className="link text-sm font-medium underline-offset-4">Post your event</Link>
          </div>
          <p className="mt-6 text-sm opacity-65">Iftar, sehri and food distribution in your neighbourhood.</p>
        </div>
        <figure>
          <Image src="/images/chawkbazar-iftar.jpg" alt="Plates of fruit and iftar prepared for a shared meal at Chawkbazar Shahi Mosque, Dhaka" width={1280} height={853} priority sizes="(max-width: 1024px) 100vw, 50vw" className="aspect-[4/3] w-full rounded-lg object-cover" />
          <figcaption className="mt-3 text-xs leading-5 opacity-65">Chawkbazar Shahi Mosque, Dhaka. Photo: <a href="https://commons.wikimedia.org/wiki/File:Iftar_at_Chawkbajar_Shahi_Mosque_12.jpg" className="underline underline-offset-2">Wasiul Bahar</a> / <a href="https://creativecommons.org/licenses/by-sa/4.0/" className="underline underline-offset-2">CC BY-SA 4.0</a></figcaption>
        </figure>
      </div>
    </section>
  );
}
