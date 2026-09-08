import { getFleetStats, getAdminVehicles } from "@/lib/services/vehicleService";
import Link from "next/link";
import Image from "next/image";
import { Car, CheckCircle2, Wrench, Layers, Plus, ArrowRight, ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [stats, vehicles] = await Promise.all([
    getFleetStats(),
    getAdminVehicles(),
  ]);

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-neutral-900 dark:text-white">
            Operations & Fleet Overview
          </h1>
          <p className="text-xs text-neutral-500">Real-time status synced with Hostinger MySQL</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/vehicles/new"
            className="flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-sky-500 transition"
          >
            <Plus className="h-4 w-4" /> Add Vehicle
          </Link>
          <Link
            href="/cars"
            target="_blank"
            className="flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-xs font-bold text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 transition"
          >
            <ExternalLink className="h-3.5 w-3.5" /> View Public Fleet
          </Link>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Total Fleet</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-950 dark:text-sky-400">
              <Car className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 text-3xl font-black text-neutral-900 dark:text-white">
            {stats.totalVehicles}
          </p>
          <p className="mt-1 text-xs text-neutral-400">Registered inventory</p>
        </div>

        <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Available</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 text-3xl font-black text-emerald-600 dark:text-emerald-400">
            {stats.availableVehicles}
          </p>
          <p className="mt-1 text-xs text-neutral-400">Ready for booking</p>
        </div>

        <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Maintenance</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
              <Wrench className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 text-3xl font-black text-amber-600 dark:text-amber-400">
            {stats.maintenanceVehicles}
          </p>
          <p className="mt-1 text-xs text-neutral-400">Under service/inspection</p>
        </div>

        <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Categories</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400">
              <Layers className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 text-3xl font-black text-purple-600 dark:text-purple-400">
            {stats.totalCategories}
          </p>
          <p className="mt-1 text-xs text-neutral-400">Configured segments</p>
        </div>
      </div>

      {/* Recent Fleet Inventory Summary */}
      <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-neutral-900 dark:text-white">
            Current Fleet Inventory ({vehicles.length})
          </h2>
          <Link
            href="/admin/vehicles"
            className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 hover:underline"
          >
            Manage all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-100 text-neutral-400 dark:border-neutral-800">
                <th className="pb-3 font-semibold">Vehicle</th>
                <th className="pb-3 font-semibold">Category</th>
                <th className="pb-3 font-semibold">License Plate</th>
                <th className="pb-3 font-semibold">Daily Rate</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
              {vehicles.slice(0, 5).map((v) => (
                <tr key={v.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30">
                  <td className="py-3 font-bold text-neutral-900 dark:text-white flex items-center gap-3">
                    <div className="relative h-9 w-14 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800 shrink-0">
                      <Image src={v.mainImage} alt={v.model} fill className="object-cover" />
                    </div>
                    <span>{v.make} {v.model}</span>
                  </td>
                  <td className="py-3 text-neutral-600 dark:text-neutral-400">{v.category.name}</td>
                  <td className="py-3 font-mono font-semibold">{v.licensePlate}</td>
                  <td className="py-3 font-bold text-neutral-900 dark:text-white">
                    ${Number(v.dailyRate).toFixed(2)}
                  </td>
                  <td className="py-3">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        v.status === "AVAILABLE"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400"
                          : v.status === "MAINTENANCE"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400"
                          : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-400"
                      }`}
                    >
                      {v.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <Link
                      href={`/admin/vehicles/${v.id}`}
                      className="font-bold text-sky-600 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
