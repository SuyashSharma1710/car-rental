import { notFound } from "next/navigation";
import { getVehicleById } from "@/lib/services/vehicleService";
import { getCategories } from "@/lib/services/categoryService";
import { VehicleForm } from "@/components/admin/VehicleForm";

export const dynamic = "force-dynamic";

interface EditVehiclePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: EditVehiclePageProps) {
  const { id } = await params;
  const vehicle = await getVehicleById(id);

  if (!vehicle) {
    return { title: "Vehicle Not Found | TNT Admin" };
  }

  return {
    title: `Edit ${vehicle.make} ${vehicle.model} | TNT Admin`,
  };
}

export default async function EditVehiclePage({ params }: EditVehiclePageProps) {
  const { id } = await params;
  const [vehicle, categories] = await Promise.all([
    getVehicleById(id),
    getCategories(),
  ]);

  if (!vehicle) {
    notFound();
  }

  return (
    <div>
      <VehicleForm categories={categories} initialData={vehicle} />
    </div>
  );
}
