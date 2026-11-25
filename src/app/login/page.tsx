"use client";
import { FormEvent, Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import FormField from "@/components/FormField";
import { safeRedirect } from "@/lib/safe-redirect";

function LoginForm() {
  const router = useRouter();
  const redirect = safeRedirect(useSearchParams().get("redirect"));
  const googleLoginEnabled = process.env.NEXT_PUBLIC_GOOGLE_LOGIN_ENABLED === "true";
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");

    const found: Record<string, string> = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) found.email = "Enter a valid email address.";
    if (!password) found.password = "Password is required.";
    setErrors(found);
    if (Object.keys(found).length) return;

    setBusy(true);
    const { error } = await authClient.signIn.email({ email, password });
    setBusy(false);
    if (error) {
      toast.error(error.message || "Incorrect email or password.");
      return;
    }
    toast.success("Welcome back! You are logged in.");
    router.push(redirect);
    router.refresh();
  }

  async function handleGoogle() {
    await authClient.signIn.social({ provider: "google", callbackURL: redirect });
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4 py-12">
      <div className="card w-full border border-base-300 bg-base-100">
        <div className="card-body gap-4">
          <h1 className="text-center text-2xl font-semibold">Login</h1>
          <p className="text-center text-sm opacity-75">Log in to create and join distribution events.</p>
          <form onSubmit={handleSubmit} noValidate className="space-y-3">
            <FormField label="Email" error={errors.email}>
              <input name="email" type="email" placeholder="you@example.com" className={`input w-full ${errors.email ? "input-error" : ""}`} />
            </FormField>
            <FormField label="Password" error={errors.password}>
              <input name="password" type="password" placeholder="Your password" className={`input w-full ${errors.password ? "input-error" : ""}`} />
            </FormField>
            <button type="submit" disabled={busy} className="btn btn-primary w-full">
              {busy && <span className="loading loading-spinner loading-sm" />} Login
            </button>
          </form>
          {googleLoginEnabled && (
            <>
              <div className="divider my-0">or</div>
              <button onClick={handleGoogle} className="btn btn-outline w-full">
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true"><path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.7 14.6 2.7 12 2.7 6.9 2.7 2.7 6.9 2.7 12s4.2 9.3 9.3 9.3c5.4 0 8.9-3.8 8.9-9.1 0-.6-.1-1.1-.2-1.6z" /></svg>
                Continue with Google
              </button>
            </>
          )}
          <p className="text-center text-sm">
            New to IftarShare? <Link href={`/register${redirect !== "/" ? `?redirect=${encodeURIComponent(redirect)}` : ""}`} className="link link-primary font-medium">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
