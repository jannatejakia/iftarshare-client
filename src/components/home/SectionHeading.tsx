export default function SectionHeading({ title, text }: { title: string; text: string }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">{title}</h2>
      <p className="mt-3 opacity-75">{text}</p>
    </div>
  );
}
