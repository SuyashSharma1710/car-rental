"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global runtime error:", error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400 mb-4">
        <AlertTriangle className="h-8 w-8" />
      </div>
      <h1 className="text-2xl font-black text-neutral-900 dark:text-white">
        Something went wrong
      </h1>
      <p className="mt-2 text-xs text-neutral-500 leading-relaxed">
        An unexpected error occurred while loading this page. Our team has been notified.
      </p>
      <button
        onClick={() => reset()}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-neutral-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition"
      >
        <RotateCcw className="h-4 w-4" />
        Try Again
      </button>
    </div>
  );
}
