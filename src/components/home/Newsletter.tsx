import Link from "next/link";

// The assignment asks for the subscription design only.
export default function Newsletter() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-8">
      <div className="grid gap-6 border-y border-base-300 py-9 md:grid-cols-2 md:gap-12">
        <div>
          <h2 className="text-2xl font-semibold text-primary">Email updates</h2>
          <p lang="bn" className="mt-3 leading-7 opacity-75">ইমেইল আপডেট এখন চালু নেই। নতুন আয়োজনের খবর দেখতে Upcoming Events পাতায় চোখ রাখুন।</p>
          <Link href="/events" className="link link-primary mt-3 inline-block text-sm underline-offset-4">Browse upcoming events →</Link>
        </div>
        <form aria-label="Email updates" className="self-center">
          <label htmlFor="newsletter-email" className="mb-2 block text-sm font-medium">Your email address</label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input id="newsletter-email" type="email" placeholder="you@example.com" disabled aria-describedby="newsletter-status" className="input w-full" />
            <button type="button" disabled className="btn btn-outline">Subscribe</button>
          </div>
          <p id="newsletter-status" className="mt-2 text-xs opacity-65">Subscriptions are not open yet.</p>
        </form>
      </div>
    </section>
  );
}
