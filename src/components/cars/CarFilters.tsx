"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import { VehicleCategory } from "@prisma/client";
import { Filter, RotateCcw, X, Search } from "lucide-react";

interface CarFiltersProps {
  categories: VehicleCategory[];
}

export function CarFilters({ categories }: CarFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Local filter states from URL
  const currentCategory = searchParams.get("category") || "";
  const currentTransmission = searchParams.get("transmission") || "";
  const currentFuel = searchParams.get("fuelType") || "";
  const currentSeats = searchParams.get("minSeats") || "";
  const currentPrice = searchParams.get("maxPrice") || "";
  const currentSearch = searchParams.get("search") || "";

  const [priceSlider, setPriceSlider] = useState<number>(currentPrice ? Number(currentPrice) : 300);
  const [searchVal, setSearchVal] = useState<string>(currentSearch);

  const updateFilters = useCallback(
    (newParams: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(newParams).forEach(([key, value]) => {
        if (value && value !== "ALL" && value !== "") {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [pathname, router, searchParams]
  );

  const handleReset = () => {
    setSearchVal("");
    setPriceSlider(300);
    startTransition(() => {
      router.replace(pathname, { scroll: false });
    });
    setIsMobileOpen(false);
  };

  const filterContent = (
    <div className="space-y-6">
      {/* Search Input */}
      <div>
        <label htmlFor="search" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
          Search Model or Make
        </label>
        <div className="relative mt-2">
          <input
            id="search"
            type="text"
            placeholder="e.g. Tesla, BMW, RAV4..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateFilters({ search: searchVal });
              }
            }}
            className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 shadow-sm focus:border-sky-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          />
          <button
            onClick={() => updateFilters({ search: searchVal })}
            className="absolute right-2 top-2 rounded-lg bg-neutral-200 p-1.5 text-neutral-600 hover:bg-sky-600 hover:text-white dark:bg-neutral-800 dark:text-neutral-300"
            aria-label="Submit search"
          >
            <Search className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
          Vehicle Category
        </label>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          <button
            onClick={() => updateFilters({ category: null })}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              !currentCategory
                ? "bg-sky-600 text-white shadow-sm"
                : "border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => updateFilters({ category: currentCategory === cat.slug ? null : cat.slug })}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                currentCategory === cat.slug
                  ? "bg-sky-600 text-white shadow-sm"
                  : "border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Transmission */}
      <div>
        <label htmlFor="transmission" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
          Transmission
        </label>
        <select
          id="transmission"
          value={currentTransmission}
          onChange={(e) => updateFilters({ transmission: e.target.value })}
          className="mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-sm text-neutral-900 focus:border-sky-500 focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
        >
          <option value="">Any Transmission</option>
          <option value="AUTOMATIC">Automatic Only</option>
          <option value="MANUAL">Manual Only</option>
        </select>
      </div>

      {/* Fuel Type */}
      <div>
        <label htmlFor="fuelType" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
          Fuel & Energy
        </label>
        <select
          id="fuelType"
          value={currentFuel}
          onChange={(e) => updateFilters({ fuelType: e.target.value })}
          className="mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-sm text-neutral-900 focus:border-sky-500 focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
        >
          <option value="">All Fuel Types</option>
          <option value="ELECTRIC">Electric (EV)</option>
          <option value="HYBRID">Hybrid</option>
          <option value="PETROL">Petrol</option>
          <option value="DIESEL">Diesel</option>
        </select>
      </div>

      {/* Minimum Seats */}
      <div>
        <label htmlFor="minSeats" className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
          Minimum Seating
        </label>
        <div className="mt-2 flex gap-2">
          {[4, 5, 7].map((seats) => (
            <button
              key={seats}
              onClick={() => updateFilters({ minSeats: currentSeats === String(seats) ? null : String(seats) })}
              className={`flex-1 rounded-xl py-2 text-xs font-bold transition ${
                currentSeats === String(seats)
                  ? "bg-sky-600 text-white shadow-sm"
                  : "border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
              }`}
            >
              {seats}+ Seats
            </button>
          ))}
        </div>
      </div>

      {/* Max Price Slider */}
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="maxPrice" className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
            Max Daily Rate
          </label>
          <span className="text-xs font-bold text-sky-600 dark:text-sky-400">${priceSlider} / day</span>
        </div>
        <input
          id="maxPrice"
          type="range"
          min="40"
          max="300"
          step="10"
          value={priceSlider}
          onChange={(e) => setPriceSlider(Number(e.target.value))}
          onMouseUp={() => updateFilters({ maxPrice: String(priceSlider) })}
          onTouchEnd={() => updateFilters({ maxPrice: String(priceSlider) })}
          className="mt-2 w-full accent-sky-600"
        />
        <div className="flex justify-between text-[11px] text-neutral-400">
          <span>$40</span>
          <span>$300+</span>
        </div>
      </div>

      {/* Reset Action */}
      <button
        onClick={handleReset}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 py-2.5 text-xs font-semibold text-neutral-600 transition hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Reset All Filters
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-24 rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <div className="mb-5 flex items-center justify-between border-b border-neutral-100 pb-3 dark:border-neutral-800">
            <h2 className="flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-white">
              <Filter className="h-4 w-4 text-sky-600" />
              Filter Fleet
            </h2>
            {isPending && <span className="text-xs text-sky-600 animate-pulse">Updating...</span>}
          </div>
          {filterContent}
        </div>
      </aside>

      {/* Mobile Filter Trigger Button */}
      <div className="lg:hidden mb-6 flex items-center justify-between">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-neutral-900 px-4 py-2.5 text-xs font-bold text-white shadow-sm dark:bg-neutral-800"
        >
          <Filter className="h-4 w-4 text-sky-400" />
          Filter Fleet ({categories.length} Categories)
        </button>
        {(currentCategory || currentTransmission || currentFuel || currentSeats || currentPrice || currentSearch) && (
          <button onClick={handleReset} className="text-xs font-semibold text-rose-600 hover:underline">
            Reset Filters
          </button>
        )}
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col bg-white p-6 shadow-2xl dark:bg-neutral-900 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">Filters</h3>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="rounded-lg p-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                aria-label="Close filters"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="py-4">{filterContent}</div>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="mt-auto w-full rounded-xl bg-sky-600 py-3 text-xs font-bold text-white"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </>
  );
}
