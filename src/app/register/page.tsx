"use client";
import { FormEvent, Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import FormField from "@/components/FormField";
import { safeRedirect } from "@/lib/safe-redirect";

function RegisterForm() {
  const router = useRouter();
  const redirect = safeRedirect(useSearchParams().get("redirect"));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const photoURL = String(fd.get("photoURL") ?? "").trim();
    const password = String(fd.get("password") ?? "");

    const found: Record<string, string> = {};
    if (!name) found.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) found.email = "Enter a valid email address.";
    if (photoURL && !/^https?:\/\/.+/i.test(photoURL)) found.photoURL = "Photo URL must start with http:// or https://.";
    if (password.length < 6) found.password = "Password must be at least 6 characters.";
    else if (!/[A-Z]/.test(password)) found.password = "Password must contain an uppercase letter.";
    else if (!/[a-z]/.test(password)) found.password = "Password must contain a lowercase letter.";
    setErrors(found);
    if (Object.keys(found).length) {
      toast.error(Object.values(found)[0]);
      return;
    }

    setBusy(true);
    const { error } = await authClient.signUp.email({ name, email, password, image: photoURL || undefined });
    setBusy(false);
    if (error) {
      toast.error(error.message || "Could not create your account.");
      return;
    }
    toast.success("Account created. Welcome to IftarShare!");
    router.push(redirect);
    router.refresh();
  }

  const field = (key: string, label: string, props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <FormField label={label} error={errors[key]}>
      <input name={key} {...props} className={`input w-full ${errors[key] ? "input-error" : ""}`} />
    </FormField>
  );

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-12">
      <div className="card w-full border border-base-300 bg-base-100 shadow-lg">
        <div className="card-body gap-4">
          <h1 className="text-center text-3xl font-extrabold text-primary">Join IftarShare</h1>
          <p className="text-center text-sm opacity-75">Create an account to host and join events.</p>
          <form onSubmit={handleSubmit} noValidate className="space-y-3">
            {field("name", "Name", { type: "text", placeholder: "Your full name" })}
            {field("email", "Email", { type: "email", placeholder: "you@example.com" })}
            {field("photoURL", "Photo URL (optional)", { type: "url", placeholder: "https://..." })}
            {field("password", "Password", { type: "password", placeholder: "Min 6 chars, upper and lower case" })}
            <button type="submit" disabled={busy} className="btn btn-primary w-full">
              {busy && <span className="loading loading-spinner loading-sm" />} Register
            </button>
          </form>
          <p className="text-center text-sm">
            Already have an account? <Link href={`/login${redirect !== "/" ? `?redirect=${encodeURIComponent(redirect)}` : ""}`} className="link link-primary font-medium">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
