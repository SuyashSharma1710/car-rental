import { notFound } from "next/navigation";
import { getVehicleById } from "@/lib/services/vehicleService";
import { getCategories } from "@/lib/services/categoryService";
import { VehicleForm, SerializedVehicle } from "@/components/admin/VehicleForm";

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

  // Convert Prisma Decimal objects and Dates to plain JSON-serializable primitives for Client Component
  const serializedVehicle: SerializedVehicle = {
    id: vehicle.id,
    make: vehicle.make,
    model: vehicle.model,
    year: vehicle.year,
    licensePlate: vehicle.licensePlate,
    vin: vehicle.vin,
    categoryId: vehicle.categoryId,
    status: vehicle.status,
    transmission: vehicle.transmission,
    fuelType: vehicle.fuelType,
    seats: vehicle.seats,
    doors: vehicle.doors,
    luggageCapacity: vehicle.luggageCapacity,
    mileage: vehicle.mileage,
    dailyRate: Number(vehicle.dailyRate),
    hourlyRate: vehicle.hourlyRate ? Number(vehicle.hourlyRate) : null,
    securityDeposit: Number(vehicle.securityDeposit),
    isFeatured: vehicle.isFeatured,
    mainImage: vehicle.mainImage,
    galleryImages: Array.isArray(vehicle.galleryImages) ? vehicle.galleryImages : [],
    features: Array.isArray(vehicle.features) ? vehicle.features : [],
    location: vehicle.location,
  };

  const serializedCategories = categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    description: cat.description,
    image: cat.image,
  }));

  return (
    <div>
      <VehicleForm categories={serializedCategories} initialData={serializedVehicle} />
    </div>
  );
}
