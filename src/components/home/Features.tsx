const steps = [
  { title: "Search your area", text: "Try Mirpur, Mohammadpur or your district name. Read the meeting point and arrival time before signing up." },
  { title: "Join as a volunteer", text: "Sign up to help the organiser. Your place is a volunteer spot, not a reservation for a meal or food pack." },
  { title: "Planning your own event?", text: "Add the location, time and number of volunteers you need. Explain the work so people know what to expect." },
];

export default function Features() {
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
      <div><h2 className="text-2xl font-semibold">First time volunteering?</h2>
      <p className="mt-3 leading-7 opacity-70">Pick a time you can make. The organiser explains the work in the event description.</p></div>
      <div className="grid gap-6 sm:grid-cols-3">
        {steps.map((step, index) => (
          <div key={step.title} className="border-l border-base-300 pl-5">
            <span className="text-sm opacity-55">0{index + 1}</span>
            <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm leading-7 opacity-75">{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
