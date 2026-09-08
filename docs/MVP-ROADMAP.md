# TNT Car Booking — MVP Development Roadmap

This document defines the strict phased roadmap for the **TNT Car Booking MVP**. All development follows this sequence. Features outside this scope belong to Future Phases and must not be implemented prematurely.

---

## Phase 0 — Foundation & System Setup
- [x] Next.js 16+ App Router, React 19, TypeScript strict configuration with `pnpm`.
- [x] AI Skill Ecosystem & Skill Routing Matrix (`AGENTS.md`, `.agent/rules/project-rules.md`).
- [x] Hostinger Remote MySQL Database connection verification (`srv1995.hstgr.io`).
- [x] Environment variable architecture (`.env`, `.env.example`, `.env.local`).
- [ ] Finalize MVP Prisma schema & execute initial versioned migration (`pnpm run db:migrate`).
- [ ] Core Design System tokens (Tailwind CSS, automotive palette, typography, elevation).

---

## Phase 1 — Core Fleet & Catalog
- [ ] Fleet data access layer (DAL) and repository services (`vehicleService.ts`, `categoryService.ts`).
- [ ] Public Fleet Catalog page (`/cars`) with multi-facet filters (category, transmission, fuel, seats, price range).
- [ ] Vehicle Detail View (`/cars/[id]`) with high-resolution image gallery, specs badges, transparent rate cards, and reviews.
- [ ] Dynamic metadata and Open Graph social cards for vehicles (`generateMetadata`).
- [ ] Search & Availability date/location input bar.

---

## Phase 2 — Booking Engine & Lifecycle
- [ ] Vehicle availability engine with date overlap collision logic (`startDate < reqEnd AND endDate > reqStart`).
- [ ] Multi-step Booking Stepper (`/booking`):
  1. Date & Location selection (`/booking/search`)
  2. Vehicle selection & specs confirmation (`/booking/select`)
  3. Add-on services selection (GPS, Child Seat, CDW Insurance, Extra Driver) (`/booking/addons`)
  4. Driver / Customer details form (`/booking/details`)
  5. Price breakdown & invoice review (`/booking/review`)
- [ ] 15-Minute Reservation Hold state (`holdExpiresAt`) with atomic transaction locking.
- [ ] Authoritative server-side pricing engine (`basePrice`, `addOnTotal`, `taxAmount`, `depositAmount`, `totalAmount`).

---

## Phase 3 — Checkout & Payment Lifecycle
- [ ] Checkout & Payment page (`/booking/checkout`).
- [ ] Payment gateway integration (Stripe Elements / hosted checkout / Card simulator for MVP).
- [ ] Idempotent transaction recording (`PaymentTransaction` table).
- [ ] Webhook receiver with HMAC signature verification (`/api/webhooks/payment`).
- [ ] Booking Confirmation page (`/booking/confirmation/[bookingRef]`) with printable receipt & booking summary.
- [ ] Booking Failure / Retry page (`/booking/failed`).

---

## Phase 4 — Customer Portal & Self-Service
- [ ] Customer Authentication (Email/Password registration, login, session management, password reset).
- [ ] Customer Dashboard (`/account/dashboard`):
  - Overview of upcoming and past rentals.
  - Active reservation countdown & pickup instructions.
- [ ] My Bookings list & Detail view (`/account/bookings/[id]`).
- [ ] Self-Service Cancellation & Refund request handler according to cancellation policy (>48h full refund, 24-48h 50%, <24h non-refundable).
- [ ] Verified Customer Review submission on completed bookings.
- [ ] Public Lookup tool (`/booking/manage`) for guest checkout lookups (Booking Reference + Email).

---

## Phase 5 — Operational Admin Dashboard
- [ ] Secure Admin Authentication & Route Protection (`/admin/*`).
- [ ] Admin Overview Dashboard (`/admin/dashboard`): Key metrics (Total Fleet, Active Rentals, Pending Holds, Monthly Revenue).
- [ ] Vehicle Management (`/admin/vehicles`): Add, edit, upload images, update rates, toggle availability/maintenance status.
- [ ] Category Management (`/admin/categories`): Create, edit, and organize vehicle categories.
- [ ] Booking Management (`/admin/bookings`): Filter by status (`HELD`, `CONFIRMED`, `ACTIVE`, `COMPLETED`, `CANCELLED`), manual check-in/return, and cancellation handling.
- [ ] Customer Management (`/admin/customers`): Customer directory, driver license verification records, rental history.
- [ ] Add-on Management (`/admin/addons`): Configure rates and mandatory flags.
- [ ] Payment & Transaction Ledger (`/admin/payments`): Inspect transaction logs, payment statuses, and gateway references.
- [ ] Review Moderation (`/admin/reviews`): Approve, hide, or respond to customer reviews.
- [ ] Basic System Settings (`/admin/settings`): Business details, tax rate, security deposit policy, contact information.

---

## Phase 6 — Production Hardening & Launch Readiness
- [ ] End-to-End (E2E) automated tests for critical path: Search → Reserve → Checkout → Confirm → Cancel.
- [ ] Unit tests for pricing formulas, date boundary overlaps, and hold timeout expirations.
- [ ] Core Web Vitals optimization (LCP < 2.5s, CLS < 0.1, responsive `next/image`).
- [ ] WCAG 2.1 AA Accessibility audit (keyboard traps, focus management, screen reader labels).
- [ ] JSON-LD Structured Data (`AutoRental` / `Vehicle` schema) and dynamic XML sitemap.
- [ ] Production deployment migration pipeline (`pnpm run db:deploy`).

---

## Future Phases (Post-MVP / Deferred)
The following modules are strictly deferred to Phase 2+ and will NOT be implemented during MVP:
- Tour Packages & Excursion Booking
- Destination Guides & Itineraries
- Dedicated Driver & Chauffeur Portal
- Third-Party Vendor / Fleet Marketplace
- Flight & Hotel Integrations
- Corporate Accounts & B2B Invoicing
- Customer Loyalty / Rewards Program
- Dynamic Surge Pricing Algorithms
- Native iOS / Android Mobile Apps
- Multi-Currency & Multi-Language Localization
- AI Chatbot / Smart Concierge
- Affiliate Marketing System
