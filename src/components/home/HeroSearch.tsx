"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { MapPin, Calendar, Car, Search, Shield, Zap } from "lucide-react";
import { VehicleCategory } from "@prisma/client";

interface HeroSearchProps {
  categories: VehicleCategory[];
}

export function HeroSearch({ categories }: HeroSearchProps) {
  const router = useRouter();
  const [location, setLocation] = useState("Main Terminal Hub");
  const [category, setCategory] = useState("");
  const [pickupDate, setPickupDate] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (location) params.set("location", location);
    if (pickupDate) params.set("pickupDate", pickupDate);

    router.push(`/cars?${params.toString()}`);
  };

  return (
    <div className="relative z-20 mx-auto -mt-8 max-w-5xl rounded-3xl border border-neutral-200/80 bg-white/95 p-6 shadow-2xl backdrop-blur-xl dark:border-neutral-800 dark:bg-neutral-900/95 sm:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-neutral-100 pb-4 dark:border-neutral-800">
        <div>
          <h2 className="text-base font-extrabold text-neutral-900 dark:text-white">
            Find Your Ideal Rental Vehicle
          </h2>
          <p className="text-xs text-neutral-500">Live availability from verified fleet hubs</p>
        </div>
        <div className="flex items-center gap-3 text-xs font-semibold text-neutral-600 dark:text-neutral-400">
          <span className="flex items-center gap-1">
            <Zap className="h-3.5 w-3.5 text-amber-500" /> Instant Confirm
          </span>
          <span className="flex items-center gap-1">
            <Shield className="h-3.5 w-3.5 text-emerald-500" /> $0 Deductible Option
          </span>
        </div>
      </div>

      <form onSubmit={handleSearch} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Pickup Location */}
        <div>
          <label htmlFor="location" className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
            Pickup Hub
          </label>
          <div className="relative mt-1.5">
            <MapPin className="absolute left-3.5 top-3 h-4 w-4 text-sky-600" />
            <select
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 pl-10 pr-4 text-xs font-semibold text-neutral-900 focus:border-sky-500 focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
            >
              <option value="Main Terminal Hub">Main Terminal Central Hub</option>
              <option value="Airport VIP Hub">Airport VIP Terminal</option>
              <option value="Downtown Executive Hub">Downtown Financial Plaza</option>
            </select>
          </div>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="heroCategory" className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
            Vehicle Type
          </label>
          <div className="relative mt-1.5">
            <Car className="absolute left-3.5 top-3 h-4 w-4 text-sky-600" />
            <select
              id="heroCategory"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 pl-10 pr-4 text-xs font-semibold text-neutral-900 focus:border-sky-500 focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
            >
              <option value="">All Vehicle Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Pickup Date */}
        <div>
          <label htmlFor="pickupDate" className="block text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
            Pickup Date
          </label>
          <div className="relative mt-1.5">
            <Calendar className="absolute left-3.5 top-3 h-4 w-4 text-sky-600" />
            <input
              id="pickupDate"
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 pl-10 pr-3 text-xs font-semibold text-neutral-900 focus:border-sky-500 focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col justify-end">
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 py-3 text-xs font-bold text-white shadow-md shadow-sky-500/25 transition-all duration-200 hover:from-sky-500 hover:to-cyan-500 hover:shadow-lg active:scale-95"
          >
            <Search className="h-4 w-4" />
            Search Fleet
          </button>
        </div>
      </form>
    </div>
  );
}
