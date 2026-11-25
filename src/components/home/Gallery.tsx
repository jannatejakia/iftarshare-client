import Image from "next/image";
import SectionHeading from "./SectionHeading";

const photos = [
  { file: "community-iftar.jpg", caption: "Setting out water before iftar", alt: "Two men arranging water bottles and iftar plates inside Chawkbazar Shahi Mosque", author: "Wasiul Bahar", source: "Iftar_at_Chawkbajar_Shahi_Mosque_25.jpg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" },
  { file: "iftar-preparation.jpg", caption: "A simple iftar at Chawkbazar", alt: "A plate of fruit, jilapi and a bottle of water on a mat at Chawkbazar Shahi Mosque", author: "Wasiul Bahar", source: "Iftar_at_Chawkbajar_Shahi_Mosque_29.jpg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" },
  { file: "food-distribution.jpg", caption: "Al Manahil food distribution, 2020", alt: "Al Manahil volunteers handing a food package to a family in Bangladesh", author: "Al Manahil Welfare Foundation Bangladesh", source: "Al_Manahil_food_distribution_28_October_2020.jpg", license: "CC BY 3.0", licenseUrl: "https://creativecommons.org/licenses/by/3.0/" },
];

export default function Gallery() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:py-16">
      <SectionHeading title="The work before iftar" text="Water ready, plates laid out, meals handed over. Two views from Chawkbazar Shahi Mosque in Dhaka, alongside Al Manahil's food distribution in 2020. Photos of independent initiatives, credited below." />
      <div className="grid gap-x-6 gap-y-8 sm:grid-cols-3">
        {photos.map((photo) => (
          <figure key={photo.file}>
            <Image src={`/images/${photo.file}`} alt={photo.alt} width={1280} height={853} sizes="(max-width: 640px) 100vw, 33vw" className="aspect-[4/3] w-full rounded-md object-cover" />
            <figcaption className="mt-3 text-sm leading-6">
              <p className="font-medium">{photo.caption}</p>
              <p className="mt-1 text-xs opacity-65"><a href={`https://commons.wikimedia.org/wiki/File:${photo.source}`} className="underline underline-offset-2">{photo.author}</a> · <a href={photo.licenseUrl} className="underline underline-offset-2">{photo.license}</a></p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
