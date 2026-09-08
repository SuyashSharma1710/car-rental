import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getVehicleById } from "@/lib/services/vehicleService";
import { VehicleGallery } from "@/components/cars/VehicleGallery";
import {
  Users,
  Fuel,
  Gauge,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Star,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Info,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface CarDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: CarDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const vehicle = await getVehicleById(id);

  if (!vehicle) {
    return {
      title: "Vehicle Not Found | TNT Car Booking",
    };
  }

  return {
    title: `${vehicle.make} ${vehicle.model} (${vehicle.year}) Rental | TNT Car Booking`,
    description: `Rent the ${vehicle.make} ${vehicle.model} for $${Number(vehicle.dailyRate).toFixed(0)}/day. Instant online confirmation with zero hidden fees.`,
    openGraph: {
      title: `Rent ${vehicle.make} ${vehicle.model} (${vehicle.year})`,
      description: `Reserve your ${vehicle.make} ${vehicle.model} with TNT Car Booking.`,
      images: [{ url: vehicle.mainImage, width: 1200, height: 630, alt: `${vehicle.make} ${vehicle.model}` }],
    },
  };
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { id } = await params;
  const vehicle = await getVehicleById(id);

  if (!vehicle) {
    notFound();
  }

  const galleryList = Array.isArray(vehicle.galleryImages)
    ? (vehicle.galleryImages as string[])
    : [];

  const featuresList = Array.isArray(vehicle.features)
    ? (vehicle.features as string[])
    : [];

  const isAvailable = vehicle.status === "AVAILABLE";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <nav className="mb-6 flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
        <Link href="/" className="hover:text-sky-600 transition">
          Home
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/cars" className="hover:text-sky-600 transition">
          Fleet Catalog
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-neutral-900 dark:text-white">
          {vehicle.make} {vehicle.model}
        </span>
      </nav>

      {/* Main Grid: Left Gallery + Details, Right Sticky Booking Card */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Left 2 Columns: Gallery & Specs */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky-700 dark:bg-sky-950 dark:text-sky-400">
                {vehicle.category.name}
              </span>
              {vehicle.isFeatured && (
                <span className="flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-400">
                  <Sparkles className="h-3 w-3 fill-current text-amber-500" /> Featured Model
                </span>
              )}
            </div>
            <h1 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-neutral-900 dark:text-white">
              {vehicle.make} {vehicle.model} <span className="text-neutral-400 font-normal">({vehicle.year})</span>
            </h1>
            <div className="mt-2 flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-sky-600" /> Hub: {vehicle.location}
              </span>
              <span>•</span>
              <span>License: {vehicle.licensePlate}</span>
            </div>
          </div>

          {/* Interactive Image Gallery */}
          <VehicleGallery
            mainImage={vehicle.mainImage}
            galleryImages={galleryList}
            make={vehicle.make}
            model={vehicle.model}
          />

          {/* Technical Specifications */}
          <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <h2 className="text-base font-bold text-neutral-900 dark:text-white mb-4">
              Vehicle Specifications
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="rounded-xl border border-neutral-100 bg-neutral-50/50 p-3.5 dark:border-neutral-800/80 dark:bg-neutral-950/50">
                <div className="flex items-center gap-2 text-neutral-500 mb-1">
                  <Gauge className="h-4 w-4 text-sky-600" /> Transmission
                </div>
                <p className="font-bold text-neutral-900 dark:text-white capitalize">
                  {vehicle.transmission.toLowerCase()}
                </p>
              </div>

              <div className="rounded-xl border border-neutral-100 bg-neutral-50/50 p-3.5 dark:border-neutral-800/80 dark:bg-neutral-950/50">
                <div className="flex items-center gap-2 text-neutral-500 mb-1">
                  <Fuel className="h-4 w-4 text-sky-600" /> Fuel & Energy
                </div>
                <p className="font-bold text-neutral-900 dark:text-white capitalize">
                  {vehicle.fuelType.toLowerCase()}
                </p>
              </div>

              <div className="rounded-xl border border-neutral-100 bg-neutral-50/50 p-3.5 dark:border-neutral-800/80 dark:bg-neutral-950/50">
                <div className="flex items-center gap-2 text-neutral-500 mb-1">
                  <Users className="h-4 w-4 text-sky-600" /> Seating
                </div>
                <p className="font-bold text-neutral-900 dark:text-white">
                  {vehicle.seats} Passengers
                </p>
              </div>

              <div className="rounded-xl border border-neutral-100 bg-neutral-50/50 p-3.5 dark:border-neutral-800/80 dark:bg-neutral-950/50">
                <div className="flex items-center gap-2 text-neutral-500 mb-1">
                  <Briefcase className="h-4 w-4 text-sky-600" /> Luggage
                </div>
                <p className="font-bold text-neutral-900 dark:text-white">
                  {vehicle.luggageCapacity} Large Bags
                </p>
              </div>
            </div>
          </div>

          {/* Included Features */}
          {featuresList.length > 0 && (
            <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
              <h2 className="text-base font-bold text-neutral-900 dark:text-white mb-4">
                Key Standard Equipment & Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {featuresList.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Customer Reviews Section */}
          <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-neutral-900 dark:text-white">
                Verified Customer Reviews ({vehicle.reviews.length})
              </h2>
              <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                <Star className="h-4 w-4 fill-current" />
                <span>5.0 / 5.0</span>
              </div>
            </div>

            {vehicle.reviews.length === 0 ? (
              <p className="text-xs text-neutral-500 py-4">
                No reviews yet for this vehicle. Be the first to rent and leave feedback!
              </p>
            ) : (
              <div className="space-y-4">
                {vehicle.reviews.map((rev) => (
                  <div key={rev.id} className="border-t border-neutral-100 pt-3 dark:border-neutral-800">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-neutral-900 dark:text-white">{rev.customer.fullName}</span>
                      <span className="text-neutral-400">
                        {new Date(rev.createdAt).toISOString().split("T")[0]}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Sticky Rate & Booking Action Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-3xl border border-neutral-200/90 bg-white p-6 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
            {/* Status Flag */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-neutral-100 dark:border-neutral-800">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Availability Status
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                  isAvailable
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400"
                    : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-400"
                }`}
              >
                {vehicle.status}
              </span>
            </div>

            {/* Daily Pricing Card */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-neutral-500">Standard Rental Rate</p>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-4xl font-black text-neutral-900 dark:text-white">
                  ${Number(vehicle.dailyRate).toFixed(0)}
                </span>
                <span className="text-sm font-semibold text-neutral-500">/ 24h day</span>
              </div>
              <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                ✓ Unlimited mileage included
              </p>
            </div>

            {/* Fee Breakdown Info */}
            <div className="space-y-2.5 rounded-2xl bg-neutral-50 p-4 text-xs text-neutral-600 dark:bg-neutral-950 dark:text-neutral-400 mb-6 border border-neutral-100 dark:border-neutral-800">
              <div className="flex justify-between">
                <span>Base Daily Rate:</span>
                <span className="font-semibold text-neutral-900 dark:text-white">
                  ${Number(vehicle.dailyRate).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Refundable Deposit:</span>
                <span className="font-semibold text-neutral-900 dark:text-white">
                  ${Number(vehicle.securityDeposit).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Standard Insurance:</span>
                <span className="font-semibold text-emerald-600">Included</span>
              </div>
            </div>

            {/* Primary Action Button (Leads into Booking flow) */}
            {isAvailable ? (
              <Link
                href={`/booking/details?vehicleId=${vehicle.id}`}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 py-3.5 text-sm font-bold text-white shadow-md shadow-sky-600/30 transition hover:from-sky-500 hover:to-cyan-500 active:scale-95"
              >
                Start Reservation
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <button
                disabled
                className="w-full rounded-xl bg-neutral-200 py-3 text-sm font-bold text-neutral-500 cursor-not-allowed dark:bg-neutral-800 dark:text-neutral-400"
              >
                Vehicle Currently Reserved
              </button>
            )}

            {/* Trust Assurances */}
            <div className="mt-6 space-y-2 border-t border-neutral-100 pt-4 text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Zero cancellation fee up to 48h before pickup</span>
              </div>
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-sky-600 shrink-0" />
                <span>Driver license verified during online checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
