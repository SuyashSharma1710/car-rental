import Link from "next/link";
import { Compass, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-sky-50 text-sky-600 dark:bg-sky-950 dark:text-sky-400 mb-4">
        <Compass className="h-8 w-8" />
      </div>
      <h1 className="text-3xl font-black text-neutral-900 dark:text-white">
        404 — Page Not Found
      </h1>
      <p className="mt-2 text-xs text-neutral-500 leading-relaxed">
        The destination URL you requested does not exist or has been moved.
      </p>
      <div className="mt-6 flex gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-sky-500 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Home
        </Link>
        <Link
          href="/cars"
          className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 px-5 py-2.5 text-xs font-bold text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900 transition"
        >
          Browse Cars
        </Link>
      </div>
    </div>
  );
}
