import SectionHeading from "./SectionHeading";

const features = [
  { icon: "🍲", title: "Create a distribution event", text: "Plan an Iftar, Sehri or food-pack drive in minutes and set how many people you can serve." },
  { icon: "🤝", title: "Join with one click", text: "Find a drive near you and reserve your spot as a volunteer or a receiver." },
  { icon: "📊", title: "Live capacity tracking", text: "See how many seats are taken so organisers never over- or under-prepare." },
  { icon: "🌙", title: "Light and dark themes", text: "Switch to a comfortable dark mode for late-night Sehri planning." },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <SectionHeading title="Why IftarShare?" text="Everything a neighbourhood needs to organise food distribution without the chaos." />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <div key={feature.title} className="card h-full border border-base-300 bg-base-200/60 p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-2xl">{feature.icon}</div>
            <h3 className="mb-2 text-lg font-bold">{feature.title}</h3>
            <p className="text-sm opacity-75">{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
