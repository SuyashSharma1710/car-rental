import type { Metadata } from "next";
import { getVehicles } from "@/lib/services/vehicleService";
import { getCategories } from "@/lib/services/categoryService";
import { CarCard } from "@/components/cars/CarCard";
import { CarFilters } from "@/components/cars/CarFilters";
import { VehicleFilterParams, TransmissionType, FuelType } from "@/types/fleet";
import { Car, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Available Fleet Catalog | TNT Car Booking",
  description: "Browse and filter our comprehensive fleet of available electric, luxury, SUV, and economy rental cars.",
};

interface CarsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CarsCatalogPage({ searchParams }: CarsPageProps) {
  const query = await searchParams;

  // Build filter parameters safely
  const filters: VehicleFilterParams = {
    category: typeof query.category === "string" ? query.category : undefined,
    transmission: typeof query.transmission === "string" ? (query.transmission as TransmissionType) : undefined,
    fuelType: typeof query.fuelType === "string" ? (query.fuelType as FuelType) : undefined,
    minSeats: typeof query.minSeats === "string" ? Number(query.minSeats) : undefined,
    maxPrice: typeof query.maxPrice === "string" ? Number(query.maxPrice) : undefined,
    search: typeof query.search === "string" ? query.search : undefined,
  };

  const [vehicles, categories] = await Promise.all([
    getVehicles(filters),
    getCategories(),
  ]);

  const activeCategoryName = filters.category
    ? categories.find((c) => c.slug === filters.category)?.name
    : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200 pb-6 dark:border-neutral-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            <Car className="h-4 w-4" />
            <span>Verified Rental Fleet</span>
            {activeCategoryName && <span>• {activeCategoryName}</span>}
          </div>
          <h1 className="mt-1.5 text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
            {activeCategoryName ? `${activeCategoryName} Vehicles` : "Explore All Rental Cars"}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            Showing {vehicles.length} available {vehicles.length === 1 ? "vehicle" : "vehicles"} with instant reservation
          </p>
        </div>
      </div>

      {/* Main Catalog Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <CarFilters categories={categories} />

        {/* Cars Grid */}
        <div className="flex-1">
          {vehicles.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-neutral-300 bg-white p-12 text-center dark:border-neutral-800 dark:bg-neutral-900/50">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 dark:bg-sky-950 dark:text-sky-400 mb-4">
                <SlidersHorizontal className="h-6 w-6" />
              </div>
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
                No vehicles match your selected filters
              </h2>
              <p className="mt-2 max-w-md text-xs text-neutral-500 dark:text-neutral-400">
                Try adjusting your price range, category, or transmission criteria to view more available cars in our fleet.
              </p>
              <Link
                href="/cars"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-sky-500 transition"
              >
                Reset All Filters
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {vehicles.map((vehicle, idx) => (
                <CarCard key={vehicle.id} vehicle={vehicle} priority={idx < 3} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
