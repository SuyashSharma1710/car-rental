---
name: typescript-best-practices
description: Strict typing rules, discriminated unions, Zod validation schemas, domain type safety, and zero-any policy.
---

# TypeScript Best Practices & Type Safety

## 1. Zero-`any` Policy
- Never use `any`. Use `unknown` with type guards, generics, or explicit interfaces/types.
- Never use `@ts-ignore` or type assertions (`as unknown as Type`) to bypass compilation errors. Fix the underlying type mismatch.

## 2. Discriminated Unions for Domain State
- Model multi-state workflows (like Bookings, Payments, and Async Requests) using discriminated unions to ensure exhaustive type checking:

```typescript
export type BookingStatus =
  | { status: 'draft'; draftId: string }
  | { status: 'held'; holdExpiresAt: Date; reservationId: string }
  | { status: 'confirmed'; bookingRef: string; confirmedAt: Date }
  | { status: 'cancelled'; cancelledAt: Date; reason: string }
  | { status: 'completed'; returnedAt: Date; finalMileage: number };

export type ApiResponse<T> =
  | { success: true; data: T; timestamp: string }
  | { success: false; error: { code: string; message: string }; timestamp: string };
```

## 3. Domain Model Typing (`src/types/`)
- Centralize core domain entities:
  - `src/types/car.ts` (`Car`, `CarCategory`, `CarTransmission`, `CarFuelType`, `CarPricingTier`, `CarFilterOptions`)
  - `src/types/booking.ts` (`BookingRequest`, `BookingSummary`, `BookingAddOn`, `PriceCalculation`, `BookingDetails`)
  - `src/types/user.ts` (`UserProfile`, `UserRole`, `DriverLicenseInfo`)

## 4. Runtime Validation & Inferred Types (Zod)
- Validate all untrusted inputs at boundaries (Server Actions, Route Handlers, Forms):
```typescript
import { z } from "zod";

export const BookingSearchSchema = z.object({
  pickupLocation: z.string().min(1, "Pickup location is required"),
  dropoffLocation: z.string().optional(),
  pickupDate: z.string().datetime(),
  dropoffDate: z.string().datetime(),
  category: z.enum(["economy", "suv", "luxury", "electric", "sports"]).optional(),
  minSeats: z.coerce.number().min(2).max(9).optional(),
});

export type BookingSearchInput = z.infer<typeof BookingSearchSchema>;
```

## 5. Strict Compiler Flags
- Ensure `tsconfig.json` maintains `"strict": true`, `"noImplicitAny": true`, `"strictNullChecks": true`, and `"noUnusedLocals": true`.
