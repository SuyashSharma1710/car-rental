import { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Sign In | TNT Car Booking",
  description: "Secure administrator access for fleet management operations.",
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-sky-600 transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Public Website
        </Link>

        <div className="rounded-3xl border border-neutral-200/90 bg-white p-8 shadow-xl dark:border-neutral-800 dark:bg-neutral-900">
          {/* Header */}
          <div className="text-center pb-6 border-b border-neutral-100 dark:border-neutral-800">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-600 to-cyan-500 text-white shadow-md shadow-sky-500/25 mb-4">
              <Shield className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-black tracking-tight text-neutral-900 dark:text-white">
              Admin & Operations Console
            </h1>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              Sign in with your verified administrator credentials
            </p>
          </div>

          {/* Form */}
          <div className="pt-6">
            <AdminLoginForm />
          </div>

          {/* Footer Security Notice */}
          <div className="mt-6 border-t border-neutral-100 pt-4 text-center text-[11px] text-neutral-400 dark:border-neutral-800">
            <p>Protected by TNT Role-Based Authorization & Session Guard.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
