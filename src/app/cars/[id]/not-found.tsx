import Link from "next/link";
import { Car, ArrowLeft } from "lucide-react";

export default function VehicleNotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-neutral-100 text-neutral-400 dark:bg-neutral-900 mb-4">
        <Car className="h-8 w-8" />
      </div>
      <h1 className="text-2xl font-black text-neutral-900 dark:text-white">
        Vehicle Not Found
      </h1>
      <p className="mt-2 text-xs text-neutral-500 leading-relaxed">
        The vehicle you are looking for may have been updated, archived, or is currently unavailable in our fleet inventory.
      </p>
      <Link
        href="/cars"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-sky-500 transition"
      >
        <ArrowLeft className="h-4 w-4" />
        Return to Fleet Catalog
      </Link>
    </div>
  );
}
