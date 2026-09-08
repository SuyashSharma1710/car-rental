import test from "node:test";
import assert from "node:assert/strict";
import { getVehicles, getVehicleById, getFleetStats, getFeaturedVehicles } from "../src/lib/services/vehicleService";
import { getCategoriesWithCounts, getCategoryBySlug } from "../src/lib/services/categoryService";

test("Smoke Test - Public Fleet Catalog Data Retrieval", async () => {
  const vehicles = await getVehicles();
  assert.ok(Array.isArray(vehicles));
  assert.ok(vehicles.length > 0, "Expected at least 1 vehicle in database");

  const sampleCar = vehicles[0];
  assert.ok(sampleCar.id);
  assert.ok(sampleCar.make);
  assert.ok(sampleCar.model);
  assert.ok(sampleCar.dailyRate);
  assert.ok(sampleCar.category);
  assert.equal(sampleCar.status, "AVAILABLE");
});

test("Smoke Test - Category and Vehicle Relationships", async () => {
  const categories = await getCategoriesWithCounts();
  assert.ok(Array.isArray(categories));
  assert.ok(categories.length > 0);

  const electricCategory = categories.find((c) => c.slug === "electric");
  assert.ok(electricCategory);
  assert.ok(electricCategory._count.vehicles >= 0);

  const bySlug = await getCategoryBySlug("electric");
  assert.notEqual(bySlug, null);
  if (bySlug) {
    assert.equal(bySlug.slug, "electric");
  }
});

test("Smoke Test - Vehicle Detail View by Valid ID", async () => {
  const vehicles = await getVehicles();
  const firstCarId = vehicles[0].id;

  const detail = await getVehicleById(firstCarId);
  assert.notEqual(detail, null);
  if (detail) {
    assert.equal(detail.id, firstCarId);
    assert.ok(detail.category);
    assert.ok(Array.isArray(detail.reviews));
  }
});

test("Smoke Test - Vehicle Detail View by Invalid ID returns null safely", async () => {
  const nonExistent = await getVehicleById("non-existent-uuid-000000");
  assert.equal(nonExistent, null);
});

test("Smoke Test - Featured Vehicles retrieval", async () => {
  const featured = await getFeaturedVehicles(4);
  assert.ok(Array.isArray(featured));
  for (const car of featured) {
    assert.equal(car.isFeatured, true);
    assert.equal(car.status, "AVAILABLE");
  }
});

test("Smoke Test - Fleet Statistics for Admin Dashboard", async () => {
  const stats = await getFleetStats();
  assert.ok(typeof stats.totalVehicles === "number");
  assert.ok(typeof stats.availableVehicles === "number");
  assert.ok(typeof stats.maintenanceVehicles === "number");
  assert.ok(typeof stats.totalCategories === "number");
  assert.ok(stats.totalVehicles >= stats.availableVehicles);
});
