const features = [
  ["Find an event", "Browse upcoming community events."],
  ["Join an event", "Take part in a community event."],
  ["Organise", "Create and manage your own events."],
];

export default function Features() {
  return (
    <section aria-label="What you can do" className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-3">
      {features.map(([title, text]) => (
        <div key={title}>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="mt-2 text-sm opacity-70">{text}</p>
        </div>
      ))}
    </section>
  );
}
