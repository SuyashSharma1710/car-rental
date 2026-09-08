import { getCategories } from "@/lib/services/categoryService";
import { VehicleForm } from "@/components/admin/VehicleForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Add New Vehicle | TNT Admin",
  description: "Register a new vehicle to the rental fleet.",
};

export default async function NewVehiclePage() {
  const categories = await getCategories();

  return (
    <div>
      <VehicleForm categories={categories} />
    </div>
  );
}
