import Link from "next/link";
import Image from "next/image";
import { getAdminVehicles } from "@/lib/services/vehicleService";
import { StatusToggle } from "@/components/admin/StatusToggle";
import { Plus, Car, Edit3, ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Vehicle Inventory Management | TNT Admin",
  description: "Manage fleet vehicles, rates, and operational availability.",
};

export default async function AdminVehiclesPage() {
  const vehicles = await getAdminVehicles();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-5 dark:border-neutral-800">
        <div>
          <h1 className="text-2xl font-black text-neutral-900 dark:text-white flex items-center gap-2.5">
            <Car className="h-6 w-6 text-sky-600" />
            Vehicle Inventory ({vehicles.length})
          </h1>
          <p className="text-xs text-neutral-500">
            Control vehicle availability, pricing, specifications, and featured status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/vehicles/new"
            className="flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-sky-500 transition"
          >
            <Plus className="h-4 w-4" /> Add New Vehicle
          </Link>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="rounded-2xl border border-neutral-200/80 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50/70 text-neutral-500 dark:border-neutral-800 dark:bg-neutral-950/40">
                <th className="px-5 py-3.5 font-bold uppercase tracking-wider">Vehicle</th>
                <th className="px-4 py-3.5 font-bold uppercase tracking-wider">Category</th>
                <th className="px-4 py-3.5 font-bold uppercase tracking-wider">Plate & Specs</th>
                <th className="px-4 py-3.5 font-bold uppercase tracking-wider">Daily Rate</th>
                <th className="px-4 py-3.5 font-bold uppercase tracking-wider">Deposit</th>
                <th className="px-4 py-3.5 font-bold uppercase tracking-wider">Status</th>
                <th className="px-5 py-3.5 font-bold uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
              {vehicles.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-neutral-500">
                    No vehicles found in database. Click &quot;Add New Vehicle&quot; to register one.
                  </td>
                </tr>
              ) : (
                vehicles.map((v) => (
                  <tr key={v.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3.5">
                        <div className="relative h-12 w-18 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800 shrink-0 border border-neutral-200 dark:border-neutral-700">
                          <Image
                            src={v.mainImage}
                            alt={`${v.make} ${v.model}`}
                            fill
                            sizes="72px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
                            <span>{v.make} {v.model}</span>
                            <span className="text-neutral-400 font-normal">({v.year})</span>
                            {v.isFeatured && (
                              <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-400">
                                Featured
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-neutral-400 font-mono">Hub: {v.location}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5 font-medium text-neutral-700 dark:text-neutral-300">
                      <span className="rounded-lg bg-neutral-100 px-2 py-1 text-[11px] font-semibold text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                        {v.category.name}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="font-mono font-bold text-neutral-900 dark:text-white text-xs">
                        {v.licensePlate}
                      </div>
                      <div className="text-[11px] text-neutral-400 capitalize">
                        {v.transmission.toLowerCase()} • {v.fuelType.toLowerCase()} • {v.seats} seats
                      </div>
                    </td>

                    <td className="px-4 py-3.5 font-bold text-neutral-900 dark:text-white">
                      ${Number(v.dailyRate).toFixed(2)}
                      <span className="text-[10px] font-normal text-neutral-400">/day</span>
                    </td>

                    <td className="px-4 py-3.5 font-medium text-neutral-600 dark:text-neutral-400">
                      ${Number(v.securityDeposit).toFixed(2)}
                    </td>

                    <td className="px-4 py-3.5">
                      <StatusToggle vehicleId={v.id} currentStatus={v.status} />
                    </td>

                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/cars/${v.id}`}
                          target="_blank"
                          title="View on public site"
                          className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 transition"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/admin/vehicles/${v.id}`}
                          className="inline-flex items-center gap-1 rounded-lg bg-sky-50 px-2.5 py-1 text-[11px] font-bold text-sky-700 hover:bg-sky-100 dark:bg-sky-950 dark:text-sky-400 dark:hover:bg-sky-900 transition"
                        >
                          <Edit3 className="h-3.5 w-3.5" /> Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
