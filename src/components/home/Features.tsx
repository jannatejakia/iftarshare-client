const steps = [
  { title: "Find something nearby", text: "Search by your area or the kind of event you want to help with. Check the date and meeting point before joining." },
  { title: "Join as a volunteer", text: "Sign up to help the organiser. Your place is a volunteer spot, not a reservation for a meal or food pack." },
  { title: "Planning your own event?", text: "Add the location, time and number of volunteers you need. Explain the work so people know what to expect." },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:py-16">
      <h2 className="text-2xl font-semibold text-primary sm:text-3xl">How to take part</h2>
      <p lang="bn" className="mt-2 opacity-70">যেটুকু সময় দিতে পারেন, সেখান থেকেই শুরু করুন।</p>
      <div className="mt-8 grid gap-8 md:grid-cols-3 md:gap-10">
        {steps.map((step, index) => (
          <div key={step.title} className="border-t border-base-300 pt-5">
            <span className="text-sm font-medium text-primary">0{index + 1}</span>
            <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm leading-7 opacity-75">{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
