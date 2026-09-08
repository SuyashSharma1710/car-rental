import { prisma } from "@/lib/db/prisma";
import { CategoryCreateInput, CategoryUpdateInput, CategoryCreateSchema, CategoryUpdateSchema } from "@/lib/validations/vehicle";
import { VehicleCategory } from "@prisma/client";

export async function getCategories(): Promise<VehicleCategory[]> {
  try {
    return await prisma.vehicleCategory.findMany({
      orderBy: { name: "asc" },
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Unable to fetch vehicle categories.");
  }
}

export async function getCategoriesWithCounts() {
  try {
    return await prisma.vehicleCategory.findMany({
      include: {
        _count: {
          select: {
            vehicles: true,
          },
        },
      },
      orderBy: { name: "asc" },
    });
  } catch (error) {
    console.error("Error fetching categories with counts:", error);
    throw new Error("Unable to fetch vehicle categories with counts.");
  }
}

export async function getCategoryBySlug(slug: string): Promise<VehicleCategory | null> {
  try {
    return await prisma.vehicleCategory.findUnique({
      where: { slug },
    });
  } catch (error) {
    console.error(`Error fetching category with slug ${slug}:`, error);
    throw new Error("Unable to fetch category.");
  }
}

export async function createCategory(input: CategoryCreateInput): Promise<VehicleCategory> {
  const validated = CategoryCreateSchema.parse(input);
  return await prisma.vehicleCategory.create({
    data: validated,
  });
}

export async function updateCategory(id: string, input: CategoryUpdateInput): Promise<VehicleCategory> {
  const validated = CategoryUpdateSchema.parse(input);
  return await prisma.vehicleCategory.update({
    where: { id },
    data: validated,
  });
}

export async function deleteCategory(id: string): Promise<VehicleCategory> {
  // Check if any vehicles reference this category
  const linkedVehiclesCount = await prisma.vehicle.count({
    where: { categoryId: id },
  });

  if (linkedVehiclesCount > 0) {
    throw new Error(
      `Cannot delete category: ${linkedVehiclesCount} vehicle(s) are currently assigned to this category. Reassign or delete those vehicles first.`
    );
  }

  return await prisma.vehicleCategory.delete({
    where: { id },
  });
}
