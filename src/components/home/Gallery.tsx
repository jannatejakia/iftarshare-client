import SectionHeading from "./SectionHeading";

const photoIds = [
  "photo-1593113598332-cd288d649433",
  "photo-1488521787991-ed7bbaae773c",
  "photo-1469571486292-0ba58a3f068b",
  "photo-1559027615-cd4628902d4a",
  "photo-1593113630400-ea4288922497",
  "photo-1542810634-71277d95dcbb",
  "photo-1509099836639-18ba1795216d",
  "photo-1532629345422-7515f3d16bb6",
];

export default function Gallery() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <SectionHeading title="Moments of Giving" text="A glimpse of what community kindness looks like on the ground." />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {photoIds.map((id, i) => (
          <div key={id} className="aspect-square overflow-hidden rounded-box bg-base-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://images.unsplash.com/${id}?w=600&h=600&auto=format&fit=crop&q=70`}
              alt={`Community food distribution moment ${i + 1}`}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 hover:scale-110"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
