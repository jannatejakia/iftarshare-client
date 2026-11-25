import Link from "next/link";

type Props = {
  title: string;
  text?: string;
  action?: { href: string; label: string };
  className?: string;
};

export default function EmptyState({ title, text, action, className = "" }: Props) {
  return (
    <div className={`rounded-md border border-base-300 p-6 text-center ${className}`}>
      <p className="text-lg font-semibold">{title}</p>
      {text && <p className="mt-1 opacity-75">{text}</p>}
      {action && (
        <Link href={action.href} className="btn btn-primary mt-5">
          {action.label}
        </Link>
      )}
    </div>
  );
}
