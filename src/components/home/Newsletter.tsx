// Static newsletter design, as required by the assignment.
export default function Newsletter() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-10">
      <div className="border-t border-base-300 pt-8 sm:flex sm:items-center sm:justify-between sm:gap-8">
        <h2 className="text-xl font-semibold">Newsletter</h2>
        <div className="mt-4 sm:mt-0">
          <fieldset disabled aria-label="Newsletter signup" className="flex flex-wrap gap-2">
            <input type="email" placeholder="Your email address" aria-label="Email address" className="input w-full sm:w-64" />
            <button type="button" className="btn btn-primary">Subscribe</button>
          </fieldset>
          <p className="mt-2 text-xs opacity-60">Email subscriptions are not active.</p>
        </div>
      </div>
    </section>
  );
}
