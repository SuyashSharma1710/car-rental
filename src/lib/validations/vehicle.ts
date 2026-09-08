import { z } from "zod";

export const VehicleStatusEnum = z.enum(["AVAILABLE", "RESERVED", "RENTED", "MAINTENANCE"]);
export const TransmissionEnum = z.enum(["AUTOMATIC", "MANUAL"]);
export const FuelTypeEnum = z.enum(["PETROL", "DIESEL", "ELECTRIC", "HYBRID"]);

export const VehicleFilterSchema = z.object({
  category: z.string().optional(),
  transmission: TransmissionEnum.optional(),
  fuelType: FuelTypeEnum.optional(),
  minSeats: z.coerce.number().min(1).max(12).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  search: z.string().optional(),
  status: VehicleStatusEnum.optional(),
});

export const VehicleCreateSchema = z.object({
  make: z.string().min(1, "Make is required").max(50),
  model: z.string().min(1, "Model is required").max(50),
  year: z.coerce.number().int().min(1990, "Year must be 1990 or newer").max(new Date().getFullYear() + 2),
  licensePlate: z.string().min(2, "License plate is required").max(20),
  vin: z.string().max(30).optional().nullable(),
  categoryId: z.string().min(1, "Category ID is required"),
  status: VehicleStatusEnum.default("AVAILABLE"),
  transmission: TransmissionEnum.default("AUTOMATIC"),
  fuelType: FuelTypeEnum.default("PETROL"),
  seats: z.coerce.number().int().min(1).max(20).default(5),
  doors: z.coerce.number().int().min(2).max(6).default(4),
  luggageCapacity: z.coerce.number().int().min(0).max(15).default(2),
  mileage: z.coerce.number().int().min(0).default(0),
  dailyRate: z.coerce.number().min(1, "Daily rate must be greater than 0"),
  hourlyRate: z.coerce.number().min(1).optional().nullable(),
  securityDeposit: z.coerce.number().min(0).default(0),
  isFeatured: z.boolean().default(false),
  mainImage: z.string().url("Main image must be a valid URL"),
  galleryImages: z.array(z.string().url()).optional().default([]),
  features: z.array(z.string()).optional().default([]),
  location: z.string().min(1).default("Main Hub"),
});

export const VehicleUpdateSchema = VehicleCreateSchema.partial();

export const CategoryCreateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .max(50)
    .regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase alphanumeric characters and hyphens"),
  description: z.string().max(500).optional().nullable(),
  image: z.string().url("Image must be a valid URL").optional().nullable(),
});

export const CategoryUpdateSchema = CategoryCreateSchema.partial();

export type VehicleCreateInput = z.infer<typeof VehicleCreateSchema>;
export type VehicleUpdateInput = z.infer<typeof VehicleUpdateSchema>;
export type CategoryCreateInput = z.infer<typeof CategoryCreateSchema>;
export type CategoryUpdateInput = z.infer<typeof CategoryUpdateSchema>;
