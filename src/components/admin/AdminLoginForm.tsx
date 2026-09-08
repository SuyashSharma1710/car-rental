"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { adminLoginAction } from "@/lib/actions/authActions";
import { Shield, Lock, Mail, Loader2, AlertCircle } from "lucide-react";

export function AdminLoginForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await adminLoginAction(formData);
      if (res.success) {
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        setErrorMessage(res.error || "Authentication failed.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errorMessage && (
        <div
          role="alert"
          className="flex items-center gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs font-semibold text-rose-800 dark:border-rose-900/60 dark:bg-rose-950/60 dark:text-rose-400"
        >
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div>
        <label
          htmlFor="adminEmail"
          className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5"
        >
          Admin Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-3 h-4 w-4 text-neutral-400" />
          <input
            id="adminEmail"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="admin@tntrentals.com"
            className="w-full rounded-xl border border-neutral-300 bg-white py-2.5 pl-10 pr-3.5 text-xs font-medium text-neutral-900 shadow-sm focus:border-sky-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="adminPassword"
          className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5"
        >
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3.5 top-3 h-4 w-4 text-neutral-400" />
          <input
            id="adminPassword"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="••••••••••••"
            className="w-full rounded-xl border border-neutral-300 bg-white py-2.5 pl-10 pr-3.5 text-xs font-medium text-neutral-900 shadow-sm focus:border-sky-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 py-3 text-xs font-bold text-white shadow-md shadow-sky-500/25 transition duration-200 hover:from-sky-500 hover:to-cyan-500 disabled:opacity-50 active:scale-95"
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Authenticating...</span>
          </>
        ) : (
          <>
            <Shield className="h-4 w-4" />
            <span>Sign In to Admin Console</span>
          </>
        )}
      </button>
    </form>
  );
}
