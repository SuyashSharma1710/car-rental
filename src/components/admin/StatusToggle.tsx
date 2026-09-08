"use client";

import { useTransition } from "react";
import { VehicleStatus } from "@prisma/client";
import { toggleVehicleStatusAction } from "@/lib/actions/adminActions";
import { Loader2 } from "lucide-react";

interface StatusToggleProps {
  vehicleId: string;
  currentStatus: VehicleStatus;
}

export function StatusToggle({ vehicleId, currentStatus }: StatusToggleProps) {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (newStatus: VehicleStatus) => {
    if (newStatus === currentStatus) return;
    startTransition(async () => {
      await toggleVehicleStatusAction(vehicleId, newStatus);
    });
  };

  const getStatusColor = (status: VehicleStatus) => {
    switch (status) {
      case "AVAILABLE":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800";
      case "RESERVED":
        return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-400 dark:border-purple-800";
      case "RENTED":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-400 dark:border-blue-800";
      case "MAINTENANCE":
      default:
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-400 dark:border-amber-800";
    }
  };

  return (
    <div className="relative inline-flex items-center">
      {isPending && (
        <Loader2 className="absolute -left-5 h-3.5 w-3.5 animate-spin text-sky-600" />
      )}
      <select
        value={currentStatus}
        disabled={isPending}
        onChange={(e) => handleStatusChange(e.target.value as VehicleStatus)}
        aria-label="Change vehicle status"
        className={`cursor-pointer rounded-lg border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider transition focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-50 ${getStatusColor(
          currentStatus
        )}`}
      >
        <option value="AVAILABLE">Available</option>
        <option value="RESERVED">Reserved</option>
        <option value="RENTED">Rented</option>
        <option value="MAINTENANCE">Maintenance</option>
      </select>
    </div>
  );
}
