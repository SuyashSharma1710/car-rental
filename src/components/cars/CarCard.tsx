import Image from "next/image";
import Link from "next/link";
import { VehicleWithCategory } from "@/types/fleet";
import { Users, Fuel, Gauge, Briefcase, Sparkles, ArrowRight } from "lucide-react";

interface CarCardProps {
  vehicle: VehicleWithCategory;
  priority?: boolean;
}

export function CarCard({ vehicle, priority = false }: CarCardProps) {
  const isAvailable = vehicle.status === "AVAILABLE";

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/50 hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900">
      {/* Image Container with Badges */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-950">
        <Image
          src={vehicle.mainImage}
          alt={`${vehicle.make} ${vehicle.model} - ${vehicle.year}`}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient Overlay for Text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md">
            {vehicle.category.name}
          </span>
          {vehicle.isFeatured && (
            <span className="flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-1 text-xs font-bold text-neutral-950 shadow-sm">
              <Sparkles className="h-3 w-3 fill-current" /> Featured
            </span>
          )}
        </div>

        {/* Availability status badge if not available */}
        {!isAvailable && (
          <div className="absolute bottom-3 right-3 rounded-md bg-rose-600/90 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
            {vehicle.status}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-5">
        {/* Title */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              {vehicle.make} • {vehicle.year}
            </p>
            <h3 className="mt-0.5 text-lg font-bold text-neutral-900 group-hover:text-sky-600 dark:text-white dark:group-hover:text-sky-400 transition">
              {vehicle.model}
            </h3>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="mt-4 grid grid-cols-2 gap-2 border-y border-neutral-100 py-3 text-xs text-neutral-600 dark:border-neutral-800/80 dark:text-neutral-400">
          <div className="flex items-center gap-2">
            <Gauge className="h-4 w-4 text-neutral-400" />
            <span className="capitalize">{vehicle.transmission.toLowerCase()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Fuel className="h-4 w-4 text-neutral-400" />
            <span className="capitalize">{vehicle.fuelType.toLowerCase()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-neutral-400" />
            <span>{vehicle.seats} Seats</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-neutral-400" />
            <span>{vehicle.luggageCapacity} Bags</span>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="mt-auto pt-4 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-neutral-900 dark:text-white">
                ${Number(vehicle.dailyRate).toFixed(0)}
              </span>
              <span className="text-xs font-medium text-neutral-500">/ day</span>
            </div>
            {Number(vehicle.securityDeposit) > 0 && (
              <p className="text-[11px] text-neutral-400">
                +${Number(vehicle.securityDeposit).toFixed(0)} deposit
              </p>
            )}
          </div>

          <Link
            href={`/cars/${vehicle.id}`}
            className="flex items-center gap-1.5 rounded-xl bg-neutral-900 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:bg-sky-600 active:scale-95 dark:bg-neutral-800 dark:hover:bg-sky-500"
          >
            View Specs
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
