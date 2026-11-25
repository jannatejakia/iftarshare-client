export default function SectionHeading({ title, text }: { title: string; text: string }) {
  return (
    <div className="mb-8 max-w-2xl">
      <h2 className="text-2xl font-semibold text-primary sm:text-3xl">{title}</h2>
      <p className="mt-3 leading-7 opacity-75">{text}</p>
    </div>
  );
}
