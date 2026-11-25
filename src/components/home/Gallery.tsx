import Image from "next/image";
import SectionHeading from "./SectionHeading";

const photos = [
  { file: "food-aid.jpg", caption: "Preparing drinking water for relief", alt: "Relief workers loading bottled water for people affected by Cyclone Sidr in Bangladesh", width: 1280, height: 1920 },
  { file: "community-relief.jpg", caption: "Community relief in Bangladesh", alt: "People greeting a relief team in a village in Bangladesh", width: 1280, height: 853 },
  { file: "relief-supplies.jpg", caption: "Food supplies in Barisal", alt: "Boxes of food supplies ready for distribution in Barisal, Bangladesh", width: 1280, height: 848 },
];

export default function Gallery() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <SectionHeading title="Gallery" text="Community relief and food support in Bangladesh." />
      <div className="grid gap-x-6 gap-y-8 sm:grid-cols-3">
        {photos.map((photo) => (
          <figure key={photo.file}>
            <Image src={`/images/${photo.file}`} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 640px) 100vw, 33vw" className="aspect-[4/3] w-full rounded-md object-cover" />
            <figcaption className="mt-3 text-sm leading-6">
              <p className="font-medium">{photo.caption}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
