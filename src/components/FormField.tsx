import { ReactNode } from "react";

type Props = {
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
};

// Label + input + error message
export default function FormField({ label, error, className = "", children }: Props) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-sm font-medium">{label}</span>
      {children}
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
    </label>
  );
}
