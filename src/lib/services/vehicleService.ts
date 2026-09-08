import { prisma } from "@/lib/db/prisma";
import { VehicleFilterParams, VehicleWithCategory, VehicleWithDetails, VehicleStatus } from "@/types/fleet";
import { VehicleCreateInput, VehicleUpdateInput, VehicleCreateSchema, VehicleUpdateSchema, VehicleFilterSchema } from "@/lib/validations/vehicle";
import { Prisma } from "@prisma/client";

export async function getVehicles(filters: VehicleFilterParams = {}): Promise<VehicleWithCategory[]> {
  try {
    const validatedFilters = VehicleFilterSchema.parse(filters);
    const where: Prisma.VehicleWhereInput = {
      status: validatedFilters.status ?? "AVAILABLE",
    };

    if (validatedFilters.category) {
      where.category = {
        slug: validatedFilters.category,
      };
    }

    if (validatedFilters.transmission) {
      where.transmission = validatedFilters.transmission;
    }

    if (validatedFilters.fuelType) {
      where.fuelType = validatedFilters.fuelType;
    }

    if (validatedFilters.minSeats) {
      where.seats = {
        gte: validatedFilters.minSeats,
      };
    }

    if (validatedFilters.maxPrice) {
      where.dailyRate = {
        lte: validatedFilters.maxPrice,
      };
    }

    if (validatedFilters.search) {
      where.OR = [
        { make: { contains: validatedFilters.search } },
        { model: { contains: validatedFilters.search } },
      ];
    }

    return await prisma.vehicle.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: [
        { isFeatured: "desc" },
        { dailyRate: "asc" },
      ],
    });
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    throw new Error("Unable to fetch fleet vehicles.");
  }
}

export async function getFeaturedVehicles(limit = 6): Promise<VehicleWithCategory[]> {
  try {
    return await prisma.vehicle.findMany({
      where: {
        status: "AVAILABLE",
        isFeatured: true,
      },
      include: {
        category: true,
      },
      take: limit,
      orderBy: {
        dailyRate: "asc",
      },
    });
  } catch (error) {
    console.error("Error fetching featured vehicles:", error);
    throw new Error("Unable to fetch featured vehicles.");
  }
}

export async function getVehicleById(id: string): Promise<VehicleWithDetails | null> {
  try {
    return await prisma.vehicle.findUnique({
      where: { id },
      include: {
        category: true,
        reviews: {
          include: {
            customer: {
              select: {
                fullName: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
  } catch (error) {
    console.error(`Error fetching vehicle with ID ${id}:`, error);
    throw new Error("Unable to fetch vehicle details.");
  }
}

export async function getAdminVehicles(): Promise<VehicleWithCategory[]> {
  try {
    return await prisma.vehicle.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("Error fetching admin vehicles:", error);
    throw new Error("Unable to fetch admin vehicle inventory.");
  }
}

export async function getFleetStats() {
  try {
    const [totalVehicles, availableVehicles, maintenanceVehicles, totalCategories] = await Promise.all([
      prisma.vehicle.count(),
      prisma.vehicle.count({ where: { status: "AVAILABLE" } }),
      prisma.vehicle.count({ where: { status: "MAINTENANCE" } }),
      prisma.vehicleCategory.count(),
    ]);

    return {
      totalVehicles,
      availableVehicles,
      maintenanceVehicles,
      totalCategories,
    };
  } catch (error) {
    console.error("Error fetching fleet stats:", error);
    throw new Error("Unable to fetch fleet statistics.");
  }
}

export async function createVehicle(input: VehicleCreateInput) {
  const validated = VehicleCreateSchema.parse(input);
  return await prisma.vehicle.create({
    data: {
      make: validated.make,
      model: validated.model,
      year: validated.year,
      licensePlate: validated.licensePlate,
      vin: validated.vin,
      categoryId: validated.categoryId,
      status: validated.status,
      transmission: validated.transmission,
      fuelType: validated.fuelType,
      seats: validated.seats,
      doors: validated.doors,
      luggageCapacity: validated.luggageCapacity,
      mileage: validated.mileage,
      dailyRate: validated.dailyRate,
      hourlyRate: validated.hourlyRate,
      securityDeposit: validated.securityDeposit,
      isFeatured: validated.isFeatured,
      mainImage: validated.mainImage,
      galleryImages: validated.galleryImages,
      features: validated.features,
      location: validated.location,
    },
    include: {
      category: true,
    },
  });
}

export async function updateVehicle(id: string, input: VehicleUpdateInput) {
  const validated = VehicleUpdateSchema.parse(input);
  return await prisma.vehicle.update({
    where: { id },
    data: validated,
    include: {
      category: true,
    },
  });
}

export async function updateVehicleStatus(id: string, status: VehicleStatus) {
  return await prisma.vehicle.update({
    where: { id },
    data: { status },
  });
}
