import test from "node:test";
import assert from "node:assert/strict";
import {
  VehicleCreateSchema,
  VehicleUpdateSchema,
  VehicleFilterSchema,
  CategoryCreateSchema,
  CategoryUpdateSchema,
} from "../src/lib/validations/vehicle";

test("Fleet Validation - CategoryCreateSchema accepts valid input", () => {
  const validCategory = {
    name: "Luxury Electric",
    slug: "luxury-electric",
    description: "Premium sustainable sedans and SUVs",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89",
  };

  const parsed = CategoryCreateSchema.safeParse(validCategory);
  assert.equal(parsed.success, true);
  if (parsed.success) {
    assert.equal(parsed.data.name, "Luxury Electric");
    assert.equal(parsed.data.slug, "luxury-electric");
  }
});

test("Fleet Validation - CategoryCreateSchema rejects invalid slug characters", () => {
  const invalidCategory = {
    name: "Luxury Electric",
    slug: "Luxury Electric!", // contains spaces and caps
  };

  const parsed = CategoryCreateSchema.safeParse(invalidCategory);
  assert.equal(parsed.success, false);
});

test("Fleet Validation - CategoryUpdateSchema allows partial update", () => {
  const partialCategory = {
    description: "Updated description for luxury fleet category",
  };

  const parsed = CategoryUpdateSchema.safeParse(partialCategory);
  assert.equal(parsed.success, true);
  if (parsed.success) {
    assert.equal(parsed.data.description, "Updated description for luxury fleet category");
    assert.equal(parsed.data.name, undefined);
  }
});

test("Fleet Validation - VehicleCreateSchema validates full payload", () => {
  const validVehicle = {
    make: "Tesla",
    model: "Model S Plaid",
    year: 2024,
    licensePlate: "TNT-E101",
    vin: "5YJSA1E28HF123456",
    categoryId: "cat_1234567890",
    status: "AVAILABLE",
    transmission: "AUTOMATIC",
    fuelType: "ELECTRIC",
    seats: 5,
    doors: 4,
    luggageCapacity: 3,
    mileage: 1200,
    dailyRate: 149.99,
    hourlyRate: 25.0,
    securityDeposit: 500,
    isFeatured: true,
    mainImage: "https://images.unsplash.com/photo-1560958089-b8a1929cea89",
    galleryImages: [
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89",
      "https://images.unsplash.com/photo-1536700503339-1e4b06520771",
    ],
    features: ["Autopilot", "Tri-Motor AWD", "Glass Roof"],
    location: "SFO Airport Hub",
  };

  const parsed = VehicleCreateSchema.safeParse(validVehicle);
  assert.equal(parsed.success, true);
  if (parsed.success) {
    assert.equal(parsed.data.make, "Tesla");
    assert.equal(parsed.data.dailyRate, 149.99);
    assert.equal(parsed.data.isFeatured, true);
    assert.equal(parsed.data.features.length, 3);
  }
});

test("Fleet Validation - VehicleCreateSchema rejects negative dailyRate or invalid year", () => {
  const invalidVehicle = {
    make: "Tesla",
    model: "Model S",
    year: 1980, // min is 1990
    licensePlate: "TNT-001",
    categoryId: "cat_123",
    dailyRate: -50, // must be positive
    mainImage: "https://images.unsplash.com/photo-test",
  };

  const parsed = VehicleCreateSchema.safeParse(invalidVehicle);
  assert.equal(parsed.success, false);
});

test("Fleet Validation - VehicleUpdateSchema allows partial rates and status updates", () => {
  const updatePayload = {
    dailyRate: 189.5,
    status: "MAINTENANCE" as const,
    isFeatured: true,
  };

  const parsed = VehicleUpdateSchema.safeParse(updatePayload);
  assert.equal(parsed.success, true);
  if (parsed.success) {
    assert.equal(parsed.data.dailyRate, 189.5);
    assert.equal(parsed.data.status, "MAINTENANCE");
    assert.equal(parsed.data.isFeatured, true);
  }
});

test("Fleet Validation - VehicleFilterSchema validates query search parameters", () => {
  const filterInput = {
    category: "suv",
    transmission: "AUTOMATIC",
    fuelType: "ELECTRIC",
    minSeats: 5,
    maxPrice: 200,
    search: "Tesla",
  };

  const parsed = VehicleFilterSchema.safeParse(filterInput);
  assert.equal(parsed.success, true);
  if (parsed.success) {
    assert.equal(parsed.data.category, "suv");
    assert.equal(parsed.data.transmission, "AUTOMATIC");
    assert.equal(parsed.data.fuelType, "ELECTRIC");
    assert.equal(parsed.data.minSeats, 5);
    assert.equal(parsed.data.maxPrice, 200);
  }
});

test("Fleet Validation - VehicleFilterSchema ignores undefined filters safely", () => {
  const emptyFilters = {};
  const parsed = VehicleFilterSchema.safeParse(emptyFilters);
  assert.equal(parsed.success, true);
  if (parsed.success) {
    assert.equal(parsed.data.category, undefined);
    assert.equal(parsed.data.maxPrice, undefined);
  }
});
