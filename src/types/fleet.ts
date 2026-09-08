import { Prisma, VehicleStatus, TransmissionType, FuelType } from "@prisma/client";

export type { VehicleStatus, TransmissionType, FuelType };

export type VehicleWithCategory = Prisma.VehicleGetPayload<{
  include: {
    category: true;
  };
}>;

export type VehicleWithDetails = Prisma.VehicleGetPayload<{
  include: {
    category: true;
    reviews: {
      include: {
        customer: {
          select: {
            fullName: true;
          };
        };
      };
      orderBy: {
        createdAt: "desc";
      };
    };
  };
}>;

export interface VehicleFilterParams {
  category?: string;
  transmission?: TransmissionType;
  fuelType?: FuelType;
  minSeats?: number;
  maxPrice?: number;
  search?: string;
  status?: VehicleStatus;
}
