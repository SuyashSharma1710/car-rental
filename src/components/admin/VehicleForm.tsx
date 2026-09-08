"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { VehicleStatus, TransmissionType, FuelType } from "@prisma/client";
import { createVehicleAction, updateVehicleAction } from "@/lib/actions/adminActions";
import { Loader2, ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";

export interface SerializedCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
}

export interface SerializedVehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  vin: string | null;
  categoryId: string;
  status: VehicleStatus;
  transmission: TransmissionType;
  fuelType: FuelType;
  seats: number;
  doors: number;
  luggageCapacity: number;
  mileage: number;
  dailyRate: number | string;
  hourlyRate: number | string | null;
  securityDeposit: number | string;
  isFeatured: boolean;
  mainImage: string;
  galleryImages: unknown;
  features: unknown;
  location: string;
}

interface VehicleFormProps {
  categories: SerializedCategory[];
  initialData?: SerializedVehicle | null;
}

export function VehicleForm({ categories, initialData }: VehicleFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isEdit = Boolean(initialData);

  // Form states with initial fallback
  const [mainImageUrl, setMainImageUrl] = useState(initialData?.mainImage || "");
  const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured || false);

  const initialFeaturesString = Array.isArray(initialData?.features)
    ? (initialData.features as string[]).join(", ")
    : "";

  const initialGalleryString = Array.isArray(initialData?.galleryImages)
    ? (initialData.galleryImages as string[]).join(", ")
    : "";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    formData.set("isFeatured", String(isFeatured));

    startTransition(async () => {
      let res;
      if (isEdit && initialData) {
        res = await updateVehicleAction(initialData.id, formData);
      } else {
        res = await createVehicleAction(formData);
      }

      if (res?.success) {
        router.push("/admin/vehicles");
        router.refresh();
      } else {
        setErrorMessage(res?.error || "An unexpected error occurred.");
      }
    });
  };

  const inputClasses =
    "w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-xs font-medium text-neutral-900 shadow-sm focus:border-sky-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100";

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between border-b border-neutral-200 pb-5 dark:border-neutral-800">
        <div>
          <Link
            href="/admin/vehicles"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-sky-600 transition mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Vehicles
          </Link>
          <h1 className="text-2xl font-black text-neutral-900 dark:text-white">
            {isEdit ? `Edit ${initialData?.make} ${initialData?.model}` : "Add New Fleet Vehicle"}
          </h1>
          <p className="text-xs text-neutral-500">
            {isEdit
              ? "Update vehicle specs, rates, and availability in real-time."
              : "Register a verified vehicle to the live inventory."}
          </p>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 rounded-xl bg-sky-600 px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-sky-500 disabled:opacity-50 transition"
        >
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          {isEdit ? "Save Changes" : "Create Vehicle"}
        </button>
      </div>

      {errorMessage && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-800 dark:border-rose-900 dark:bg-rose-950/60 dark:text-rose-400">
          {errorMessage}
        </div>
      )}

      {/* Basic Identity Section */}
      <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-500">
          1. Vehicle Identification
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Make / Brand *
            </label>
            <input
              name="make"
              type="text"
              required
              defaultValue={initialData?.make || ""}
              placeholder="e.g. Tesla, BMW, Toyota"
              className={inputClasses}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Model *
            </label>
            <input
              name="model"
              type="text"
              required
              defaultValue={initialData?.model || ""}
              placeholder="e.g. Model 3, 5 Series, RAV4"
              className={inputClasses}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Model Year *
            </label>
            <input
              name="year"
              type="number"
              required
              min={1990}
              max={new Date().getFullYear() + 2}
              defaultValue={initialData?.year || new Date().getFullYear()}
              className={inputClasses}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              License Plate *
            </label>
            <input
              name="licensePlate"
              type="text"
              required
              defaultValue={initialData?.licensePlate || ""}
              placeholder="e.g. TNT-8899"
              className={`${inputClasses} font-mono`}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              VIN (Optional)
            </label>
            <input
              name="vin"
              type="text"
              defaultValue={initialData?.vin || ""}
              placeholder="17-character VIN"
              className={`${inputClasses} font-mono`}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Category / Segment *
            </label>
            <select
              name="categoryId"
              required
              defaultValue={initialData?.categoryId || (categories[0]?.id ?? "")}
              className={inputClasses}
            >
              {categories.map((cat) => (
                <option
                  key={cat.id}
                  value={cat.id}
                  className="bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
                >
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Specifications & Status Section */}
      <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-500">
          2. Specifications & Operations
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Transmission *
            </label>
            <select
              name="transmission"
              defaultValue={initialData?.transmission || "AUTOMATIC"}
              className={inputClasses}
            >
              <option
                value="AUTOMATIC"
                className="bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
              >
                Automatic
              </option>
              <option
                value="MANUAL"
                className="bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
              >
                Manual
              </option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Fuel / Powertrain *
            </label>
            <select
              name="fuelType"
              defaultValue={initialData?.fuelType || "PETROL"}
              className={inputClasses}
            >
              <option
                value="PETROL"
                className="bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
              >
                Petrol
              </option>
              <option
                value="DIESEL"
                className="bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
              >
                Diesel
              </option>
              <option
                value="ELECTRIC"
                className="bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
              >
                Electric
              </option>
              <option
                value="HYBRID"
                className="bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
              >
                Hybrid
              </option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Seats *
            </label>
            <input
              name="seats"
              type="number"
              min={1}
              max={20}
              defaultValue={initialData?.seats || 5}
              className={inputClasses}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Luggage Bags *
            </label>
            <input
              name="luggageCapacity"
              type="number"
              min={0}
              max={15}
              defaultValue={initialData?.luggageCapacity || 2}
              className={inputClasses}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Operational Status *
            </label>
            <select
              name="status"
              defaultValue={initialData?.status || "AVAILABLE"}
              className={inputClasses}
            >
              <option
                value="AVAILABLE"
                className="bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
              >
                Available
              </option>
              <option
                value="RESERVED"
                className="bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
              >
                Reserved
              </option>
              <option
                value="RENTED"
                className="bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
              >
                Rented
              </option>
              <option
                value="MAINTENANCE"
                className="bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
              >
                Maintenance
              </option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Current Mileage (km)
            </label>
            <input
              name="mileage"
              type="number"
              min={0}
              defaultValue={initialData?.mileage || 0}
              className={inputClasses}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Hub Location *
            </label>
            <input
              name="location"
              type="text"
              defaultValue={initialData?.location || "Main Airport Hub"}
              className={inputClasses}
            />
          </div>
        </div>
      </div>

      {/* Pricing & Deposit Section */}
      <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-500">
          3. Pricing & Deposits (USD)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Daily Rate ($ / Day) *
            </label>
            <input
              name="dailyRate"
              type="number"
              step="0.01"
              required
              min={1}
              defaultValue={initialData ? Number(initialData.dailyRate) : 89}
              className={`${inputClasses} font-bold`}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Hourly Rate (Optional)
            </label>
            <input
              name="hourlyRate"
              type="number"
              step="0.01"
              defaultValue={initialData?.hourlyRate ? Number(initialData.hourlyRate) : ""}
              placeholder="e.g. 15.00"
              className={inputClasses}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Security Deposit ($) *
            </label>
            <input
              name="securityDeposit"
              type="number"
              step="0.01"
              min={0}
              defaultValue={initialData ? Number(initialData.securityDeposit) : 250}
              className={inputClasses}
            />
          </div>
        </div>

        <div className="pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="h-4 w-4 rounded border-neutral-300 text-sky-600 focus:ring-sky-500"
            />
            <span className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              Promote as Featured Vehicle on Homepage
            </span>
          </label>
        </div>
      </div>

      {/* Media & Equipment Features */}
      <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-500">
          4. Media & Equipment Features
        </h2>

        <div>
          <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
            Main Image URL *
          </label>
          <input
            name="mainImage"
            type="url"
            required
            value={mainImageUrl}
            onChange={(e) => setMainImageUrl(e.target.value)}
            placeholder="https://images.unsplash.com/..."
            className={inputClasses}
          />
          {mainImageUrl && (
            <div className="mt-3 flex items-center gap-4">
              <div className="relative h-24 w-36 overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
                <Image
                  src={mainImageUrl}
                  alt="Vehicle main preview"
                  fill
                  className="object-cover"
                  onError={() => setMainImageUrl("")}
                />
              </div>
              <span className="text-xs text-neutral-400">Live preview</span>
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
            Gallery Images (Comma-separated URLs)
          </label>
          <input
            name="galleryImages"
            type="text"
            defaultValue={initialGalleryString}
            placeholder="https://images.unsplash.com/1, https://images.unsplash.com/2"
            className={inputClasses}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
            Features & Equipment (Comma-separated)
          </label>
          <input
            name="features"
            type="text"
            defaultValue={initialFeaturesString}
            placeholder="Autopilot, Heated Seats, 360 Camera, Apple CarPlay, Bluetooth"
            className={inputClasses}
          />
        </div>
      </div>
    </form>
  );
}
