---
name: testing-qa
description: Quality assurance, unit testing for domain pricing/availability, integration tests for booking actions, and E2E critical path validation.
---

# Testing & Quality Assurance (QA) Strategy

## 1. Testing Pyramid for Car Booking
```text
        / \
       /E2E\     Critical Booking Journeys (Search -> Reserve -> Confirm)
      /-----\
     / Integ \   Server Actions, Database Queries, Payment Handlers
    /---------\
   /   Unit    \ Pricing Calculation, Date Overlap, Validation Schemas
  /-------------\
```

## 2. Unit Testing Priorities
- **Pricing Calculation Engine**:
  - Exact day count for standard multi-day rentals.
  - Partial day hourly surcharge boundary test.
  - Add-on summation and coupon percentage/flat discount logic.
  - Tax calculation precision (rounding to 2 decimal places).
- **Date & Availability Utilities**:
  - Boundary conditions: Start date in the past, end date before start date.
  - Overlap matrix tests (exact match, partial overlap, adjacent non-overlapping windows).

## 3. Integration Testing Priorities
- Server Action execution with valid and invalid Zod payloads.
- State transitions (Draft -> Held -> Confirmed -> Cancelled).
- Idempotency behavior when payment webhook is called multiple times.

## 4. End-to-End (E2E) Critical Paths
- User searches for cars with dates & location -> Views filtered list -> Selects car -> Configures add-ons -> Completes checkout form -> Receives booking confirmation reference.
- Booking management: User enters booking reference and email -> Views booking status -> Cancels eligible booking -> Verification of status update.

## 5. Pre-Deployment Quality Checklist
1. `pnpm run build` succeeds with zero TypeScript errors.
2. `pnpm run lint` passes cleanly with zero ESLint warnings.
3. No dead code, unhandled promise rejections, or console log leaks.
