# Phase 1 Implementation Plan — Core Fleet & Catalog

This document specifies the exact architecture and implementation plan for **Phase 1 (Core Fleet & Catalog)**.

---

## 1. Route Architecture & Components

### Customer-Facing (Public)
1. **`/` (Home Landing)**:
   - Hero section with date/location search bar entry point.
   - Featured Vehicles showcase (highlighting electric, luxury, SUV).
   - Category browse pills (`Economy`, `Sedan`, `SUV`, `Luxury`, `Electric`).
   - Value propositions (Instant confirmation, zero hidden fees, 24/7 roadside assistance).
2. **`/cars` (Fleet Catalog)**:
   - Filterable, responsive car grid (desktop 3-column, tablet 2-column, mobile 1-column).
   - Filter sidebar & mobile bottom-sheet drawer (Category, Transmission, Fuel Type, Seats, Price Slider).
   - Real-time search query URL synchronization (`?category=suv&transmission=automatic`).
   - Car Card component (aspect-ratio image, specs badges, daily rate, "View Details" CTA).
   - Explicit states: Skeleton loading, Empty filter results with clear reset button, Error recovery.
3. **`/cars/[id]` (Vehicle Detail View)**:
   - High-resolution gallery (main preview + thumbnail selector).
   - Comprehensive technical specs (transmission, fuel, seats, doors, luggage capacity, mileage).
   - Included features badge list (Bluetooth, Backup Camera, Apple CarPlay, GPS).
   - Transparent price breakdown card with refundable security deposit note.
   - Customer Reviews section with average rating and verified booking tags.
   - "Reserve This Car" primary action button routing into booking flow.

### Admin Fleet Management
1. **`/admin` & `/admin/dashboard`**:
   - High-level KPIs (Total fleet count, available vehicles, in-maintenance vehicles, total categories).
   - Quick actions (Add new vehicle, manage categories).
2. **`/admin/vehicles`**:
   - Data table of all vehicles (thumbnail, make/model, license plate, category, daily rate, status badge).
   - Quick toggle for vehicle status (`AVAILABLE`, `MAINTENANCE`, `RESERVED`).
3. **`/admin/vehicles/new` & `/admin/vehicles/[id]`**:
   - Vehicle creation and editing form.
   - Image URL management, category dropdown, rate & deposit inputs, specs attributes.
4. **`/admin/categories`**:
   - Category CRUD management (name, slug, description, image).

---

## 2. Backend & Data Access Layer (DAL)

### Services (`src/lib/services/`):
- **`vehicleService.ts`**:
  - `getVehicles(filters?: VehicleFilterParams): Promise<VehicleWithCategory[]>`
  - `getVehicleById(id: string): Promise<VehicleWithDetails | null>`
  - `getFeaturedVehicles(): Promise<VehicleWithCategory[]>`
  - `createVehicle(data: CreateVehicleInput): Promise<Vehicle>`
  - `updateVehicle(id: string, data: UpdateVehicleInput): Promise<Vehicle>`
  - `updateVehicleStatus(id: string, status: VehicleStatus): Promise<Vehicle>`
- **`categoryService.ts`**:
  - `getCategories(): Promise<VehicleCategory[]>`
  - `getCategoryBySlug(slug: string): Promise<VehicleCategory | null>`
  - `createCategory(data: CreateCategoryInput): Promise<VehicleCategory>`

### Validation Schemas (`src/lib/validations/vehicle.ts`):
- `VehicleFilterSchema`: Zod schema for catalog search params.
- `VehicleCreateSchema` & `VehicleUpdateSchema`: Server Action mutation validation.

---

## 3. Applicable Skills for Phase 1
- `ui-ux-pro-max` + `frontend-design`: Modern automotive aesthetics, carbon/blue themes, spacing system, elevation.
- `accessibility`: WCAG 2.1 AA keyboard focus, ARIA attributes for filter drawers and image galleries.
- `nextjs-best-practices`: Server Components (RSC) for fleet catalog, dynamic metadata, responsive `next/image`.
- `react-best-practices`: Single-purpose reusable cards, badges, and filter state management.
- `typescript-best-practices`: Strict domain types for vehicles, categories, and query parameters (zero `any`).
- `software-architecture`: Layered DAL (Page → Service Layer → Prisma Client).
