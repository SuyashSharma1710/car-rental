"use server";

import { revalidatePath } from "next/cache";
import { createVehicle, updateVehicle, updateVehicleStatus } from "@/lib/services/vehicleService";
import { createCategory } from "@/lib/services/categoryService";
import { VehicleStatus, TransmissionType, FuelType } from "@prisma/client";

export async function createVehicleAction(formData: FormData) {
  try {
    const rawFeatures = (formData.get("features") as string) || "";
    const features = rawFeatures
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);

    const rawGallery = (formData.get("galleryImages") as string) || "";
    const galleryImages = rawGallery
      .split(",")
      .map((g) => g.trim())
      .filter(Boolean);

    const mainImage = (formData.get("mainImage") as string) || "";

    await createVehicle({
      make: formData.get("make") as string,
      model: formData.get("model") as string,
      year: Number(formData.get("year")),
      licensePlate: formData.get("licensePlate") as string,
      vin: (formData.get("vin") as string) || null,
      categoryId: formData.get("categoryId") as string,
      status: (formData.get("status") as VehicleStatus) || "AVAILABLE",
      transmission: (formData.get("transmission") as TransmissionType) || "AUTOMATIC",
      fuelType: (formData.get("fuelType") as FuelType) || "PETROL",
      seats: Number(formData.get("seats") || 5),
      doors: Number(formData.get("doors") || 4),
      luggageCapacity: Number(formData.get("luggageCapacity") || 2),
      mileage: Number(formData.get("mileage") || 0),
      dailyRate: Number(formData.get("dailyRate")),
      hourlyRate: formData.get("hourlyRate") ? Number(formData.get("hourlyRate")) : null,
      securityDeposit: Number(formData.get("securityDeposit") || 0),
      isFeatured: formData.get("isFeatured") === "true" || formData.get("isFeatured") === "on",
      mainImage,
      galleryImages: galleryImages.length > 0 ? galleryImages : [mainImage],
      features,
      location: (formData.get("location") as string) || "Main Hub",
    });

    revalidatePath("/cars");
    revalidatePath("/admin/vehicles");
    revalidatePath("/");
    return { success: true };
  } catch (error: unknown) {
    console.error("Failed to create vehicle:", error);
    return { success: false, error: error instanceof Error ? error.message : "Failed to create vehicle." };
  }
}

export async function updateVehicleAction(id: string, formData: FormData) {
  try {
    const rawFeatures = (formData.get("features") as string) || "";
    const features = rawFeatures
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);

    const rawGallery = (formData.get("galleryImages") as string) || "";
    const galleryImages = rawGallery
      .split(",")
      .map((g) => g.trim())
      .filter(Boolean);

    const mainImage = (formData.get("mainImage") as string) || "";

    await updateVehicle(id, {
      make: formData.get("make") as string,
      model: formData.get("model") as string,
      year: Number(formData.get("year")),
      licensePlate: formData.get("licensePlate") as string,
      vin: (formData.get("vin") as string) || null,
      categoryId: formData.get("categoryId") as string,
      status: (formData.get("status") as VehicleStatus) || "AVAILABLE",
      transmission: (formData.get("transmission") as TransmissionType) || "AUTOMATIC",
      fuelType: (formData.get("fuelType") as FuelType) || "PETROL",
      seats: Number(formData.get("seats") || 5),
      doors: Number(formData.get("doors") || 4),
      luggageCapacity: Number(formData.get("luggageCapacity") || 2),
      mileage: Number(formData.get("mileage") || 0),
      dailyRate: Number(formData.get("dailyRate")),
      hourlyRate: formData.get("hourlyRate") ? Number(formData.get("hourlyRate")) : null,
      securityDeposit: Number(formData.get("securityDeposit") || 0),
      isFeatured: formData.get("isFeatured") === "true" || formData.get("isFeatured") === "on",
      mainImage,
      galleryImages: galleryImages.length > 0 ? galleryImages : [mainImage],
      features,
      location: (formData.get("location") as string) || "Main Hub",
    });

    revalidatePath("/cars");
    revalidatePath(`/cars/${id}`);
    revalidatePath("/admin/vehicles");
    return { success: true };
  } catch (error: unknown) {
    console.error("Failed to update vehicle:", error);
    return { success: false, error: error instanceof Error ? error.message : "Failed to update vehicle." };
  }
}

export async function toggleVehicleStatusAction(id: string, status: VehicleStatus) {
  try {
    await updateVehicleStatus(id, status);
    revalidatePath("/cars");
    revalidatePath(`/cars/${id}`);
    revalidatePath("/admin/vehicles");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error: unknown) {
    console.error("Failed to toggle vehicle status:", error);
    return { success: false, error: error instanceof Error ? error.message : "Failed to change status." };
  }
}

export async function createCategoryAction(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const slug = (formData.get("slug") as string) || name.toLowerCase().replace(/\s+/g, "-");
    const description = (formData.get("description") as string) || null;
    const image = (formData.get("image") as string) || null;

    await createCategory({
      name,
      slug,
      description,
      image,
    });

    revalidatePath("/cars");
    revalidatePath("/admin/categories");
    revalidatePath("/");
    return { success: true };
  } catch (error: unknown) {
    console.error("Failed to create category:", error);
    return { success: false, error: error instanceof Error ? error.message : "Failed to create category." };
  }
}
