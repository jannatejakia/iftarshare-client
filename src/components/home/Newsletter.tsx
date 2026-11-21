// Design only: the form does not send anything yet
export default function Newsletter() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-4">
      <div className="rounded-box bg-primary px-6 py-14 text-center text-primary-content sm:px-12">
        <h2 className="text-3xl font-extrabold">Never miss a distribution drive</h2>
        <p className="mx-auto mt-3 max-w-xl opacity-90">Get a short weekly note with new Iftar and Sehri events near you.</p>
        <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row" action="#">
          <input type="email" required placeholder="Your email address" aria-label="Email address" className="input w-full bg-base-100 text-base-content" />
          <button type="submit" className="btn btn-secondary">Subscribe</button>
        </form>
      </div>
    </section>
  );
}
