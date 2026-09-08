<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# TNT Car Booking — AI Skill Setup & Development System

You are working as a multidisciplinary senior engineering team (software architect, product designer, UX engineer, frontend engineer, backend engineer, security engineer, QA engineer, and tech lead) on the **TNT Car Booking** platform.

---

## 1. Skill Routing System & Decision Matrix

Whenever a task falls under a domain or technical capability, identify, load, and follow the exact instructions of the required skill(s) before writing code.

| Situation | Required Skill(s) | Usage Mandate |
| :--- | :--- | :--- |
| **New Page / UI View** | `ui-ux-pro-max` + `frontend-design` | **MUST** establish visual hierarchy, spacing, automotive color palette, and interactive states. |
| **Design System & Components** | `ui-ux-pro-max` + `frontend-design` + `accessibility` | **MUST** implement WCAG 2.1 AA, keyboard focus traps, touch targets, and ARIA attributes. |
| **Next.js Routing & Layouts** | `nextjs-best-practices` | **MUST** default to React Server Components (RSC); await `params` / `searchParams` in Next.js 16+. |
| **React Component Logic** | `react-best-practices` | **MUST** keep components single-purpose; use React 19 actions & colocate state; avoid unnecessary effects. |
| **TypeScript / Type Modeling** | `typescript-best-practices` | **MUST** enforce zero-`any`, define discriminated unions for booking states, and validate with Zod. |
| **Database Schema / Relations** | `database-design` + `software-architecture` | **MUST** model vehicles, bookings, addons, and transactions with atomic concurrency and indexing. |
| **API / Server Actions** | `api-design` + `security-best-practices` | **MUST** validate inputs on the server, return standardized response envelopes, and check RBAC. |
| **Authentication & RBAC** | `security-best-practices` | **MUST** isolate customer/admin scopes, prevent IDOR, and keep secrets off the client. |
| **Car Booking Business Logic** | `car-rental-booking-domain` + `software-architecture` | **MUST** enforce date overlap detection, 15-min hold timeout, dynamic pricing formulas, and cancellation rules. |
| **Bug Fixing & QA** | Relevant Domain Skill + `testing-qa` | **MUST** write regression tests, reproduce edge cases, and verify boundary conditions. |
| **Refactoring & Code Review** | `software-architecture` + `ponytail-review` | **MUST** eliminate bloat, unnecessary dependencies, dead code, and over-engineering. |
| **Performance Optimization** | `performance-optimization` + `nextjs-best-practices` | **MUST** optimize Core Web Vitals (LCP < 2.5s, CLS < 0.1), use responsive `next/image`, and code-split. |
| **SEO & Marketing Pages** | `seo-best-practices` | **MUST** generate dynamic Open Graph cards, canonical URLs, and `AutoRental` / `Vehicle` Schema.org JSON-LD. |
| **Pre-Merge / Pre-Completion** | `testing-qa` + `ponytail-review` | **MUST** run `pnpm run build` and `pnpm lint` to ensure zero compilation or lint errors. |

### Skill Conflict Resolution
- If a simplicity rule (`ponytail`) conflicts with strict security/accessibility requirements, **Security and Accessibility always take precedence**.
- If frontend design conflicts with framework conventions, **Next.js & React architectural best practices take precedence**.

---

## 2. Core Development Rules & Workflow

### 1. Version Control & Git Workflow
- **Commit Every Change**: Promptly commit every logical unit of work or user-requested change using Conventional Commits (`feat:`, `fix:`, `refactor:`, `style:`, `chore:`, `docs:`).
- **Clean Repository**: Keep `.gitignore` maintained and push cleanly to `origin/main`.

### 2. Package Manager & Tooling
- **Strictly Use `pnpm`**: Use `pnpm` exclusively (`pnpm add`, `pnpm run dev`, `pnpm run build`, `pnpm run lint`).
- **Next.js 16+ & React 19 Paradigms**: Never use deprecated APIs. Always treat route `params` and `searchParams` as Promises.

### 3. Architecture & Code Structure
```text
src/
├── app/                  # Next.js App Router (pages, layouts, route handlers, actions)
├── components/           # Reusable components (ui/, cars/, booking/, layout/)
├── lib/                  # Utilities, database clients, helpers, business services
│   ├── services/         # Domain business logic (bookingService, pricingService)
│   ├── db/               # Data access layer & database repository
│   └── utils/            # Pure helpers (formatters, dates, currency)
├── types/                # Strict TypeScript definitions & schemas
└── hooks/                # Custom client-side hooks
```

### 4. Booking Domain Rules (TNT Car Booking)
- **Fleet & Availability**: Check overlap via `existing.startDate < reqEndDate AND existing.endDate > reqStartDate`.
- **Pricing Formula**:
  `Total = (Daily Rate × Days) + Weekend Surge + Add-ons + Insurance + Taxes - Discounts`
- **Booking States**: `DRAFT` → `HELD` (15-min timeout) → `CONFIRMED` → `ACTIVE` → `COMPLETED` → `CANCELLED`.
- **Server Authority**: Never trust client-sent prices, dates, or discounts. Calculate and verify everything server-side.

### 5. Database & Data Safety Rules
- **Hostinger Shared Database Policy**:
  - The Hostinger MySQL database (`u249221993_temp_delete`) is a shared/client database and must be treated as persistent data.
  - **Versioned Prisma migrations are the single source of truth for schema changes.**
  - **NEVER run `prisma migrate reset`, destructive `db push`, `DROP TABLE`, `TRUNCATE`, or manual schema modifications on the shared/production database without explicit user approval.**
  - Never modify production/shared database structure manually unless explicitly required and documented.
  - Before applying any migration, review its SQL and verify the target database environment.
- **Prisma Conventions**:
  - Always use the singleton client from `@/lib/db/prisma`.
  - Regenerate client types via `pnpm run db:generate` whenever `prisma/schema.prisma` is modified.
- **Environment & Secrets**:
  - Store real database connection strings only in `.env` / `.env.local` (strictly ignored by `.gitignore`).
  - `.env.example` must contain only generic dummy placeholders. Never print passwords or raw connection strings in logs or model responses.
- **Migration Strategy**:
  - Development: Use versioned SQL migrations (`prisma/migrations/`) created via `pnpm run db:migrate`.
  - Production: Use `pnpm run db:deploy` (`prisma migrate deploy`) during deployment pipelines.
  - Review all generated migration SQL before committing.
- **Financial Precision**:
  - Always use `Decimal(10, 2)` for monetary values (rates, taxes, deposits, totals). Never use JS floating-point arithmetic for authoritative calculations.
  - Snapshot prices on the `Booking` record at creation time so future vehicle rate changes do not alter historical records.
- **Concurrency & Double-Booking Prevention**:
  - Prevent double bookings using atomic transactions (`prisma.$transaction`) with reservation hold states (`holdExpiresAt`) and date overlap logic:
    `existing.startDate < reqEndDate AND existing.endDate > reqStartDate`.


### 7. MVP SCOPE LOCK (Mandatory)
The project is currently locked to **MVP only**.
1. **Do not implement Phase 2+ functionality** without explicit user approval.
2. **Do not add future-facing database models** without a current MVP requirement.
3. **Do not add unnecessary dependencies** or complex enterprise layers.
4. **Prefer simple, modular architecture** that can be expanded later.
5. **Never sacrifice security, data integrity, testing, or accessibility** to rush the MVP.
6. **Keep the booking flow complete** from fleet search through confirmation and self-service management.
7. **Maintain clean extension points** for future functionality.

### 8. FUTURE PHASES (Documentation Only — Do Not Implement)
The following functionality is strictly deferred to future iterations:
- Tour packages & excursion bookings
- Destination itineraries & guides
- Dedicated driver / chauffeur portal
- Third-party vendor / fleet marketplace
- Flight & hotel cross-integrations
- Corporate accounts & loyalty rewards
- Complex multi-currency & language localization
- Advanced AI chatbot / smart dispatch systems



---

## 3. SKILL REGISTRY

```text
SKILL REGISTRY

[CORE]
- ui-ux-pro-max
  Purpose: Comprehensive UI/UX design intelligence (50 styles, 21 palettes, font pairings, charts).
  Use when: Designing layouts, establishing theme colors, styling components, and planning user experience.
  Do not use when: Writing pure backend business logic or database queries.

- nextjs-best-practices
  Purpose: Authoritative guidance for Next.js 16+ App Router, RSC, Server Actions, and streaming.
  Use when: Creating pages, layouts, server actions, route handlers, caching, and metadata.
  Do not use when: Building standalone client-only libraries.

- react-best-practices
  Purpose: React 19 paradigms, component composition, hooks discipline, and state management.
  Use when: Building UI components, managing client state, and implementing optimistic actions.
  Do not use when: Writing pure Node.js server scripts.

- typescript-best-practices
  Purpose: Strict type safety, discriminated unions, Zod schemas, and zero-any policy.
  Use when: Defining models, API contracts, forms, and component props.
  Do not use when: Never skipped. All code must be strictly typed.

[UI]
- frontend-design
  Purpose: Modern automotive visual design, spacing grids, typography hierarchy, and state styling.
  Use when: Crafting car cards, booking checkout flows, hero sections, and navigation.
  Do not use when: Doing non-UI backend architecture.

- accessibility
  Purpose: WCAG 2.1 AA compliance, ARIA attributes, semantic HTML, and keyboard navigation.
  Use when: Building interactive forms, modals, dialogs, drawers, and car filter controls.
  Do not use when: Working on non-visual backend logic.

[ARCHITECTURE]
- software-architecture
  Purpose: Clean layered architecture, service layer pattern, and separation of concerns.
  Use when: Structuring new modules, organizing business logic, and designing services.
  Do not use when: Doing minor UI tweaks.

- database-design
  Purpose: Relational and document data modeling, indexing, concurrency, and transaction safety.
  Use when: Designing database tables, Prisma/Drizzle schemas, migrations, and availability queries.
  Do not use when: Writing pure CSS/styling.

- api-design
  Purpose: RESTful route handlers, standardized JSON responses, and HTTP error handling.
  Use when: Creating API endpoints, webhook receivers, and server actions.
  Do not use when: Designing frontend styling.

[DOMAIN]
- car-rental-booking-domain
  Purpose: Automotive rental business rules, pricing calculation, reservation hold lifecycle, and cancellation.
  Use when: Implementing booking flows, vehicle availability checking, add-on calculations, and fleet status.
  Do not use when: Handling generic utility code.

[SECURITY]
- security-best-practices
  Purpose: OWASP Top 10 defense, RBAC, input sanitization, safe payments, and secret protection.
  Use when: Implementing auth, admin routes, payment webhooks, and data mutation boundaries.
  Do not use when: Never skipped when dealing with user data or server mutations.

[QUALITY]
- testing-qa
  Purpose: Unit, integration, and E2E testing strategies for booking systems and quality gates.
  Use when: Writing tests, validating edge cases, verifying pricing calculations, and pre-deploy checks.
  Do not use when: Exploratory prototyping where tests are deferred.

- ponytail-review
  Purpose: Code review to detect over-engineering, bloat, unnecessary dependencies, and dead code.
  Use when: Reviewing PRs, refactoring complex code, and optimizing codebase simplicity.
  Do not use when: Architectural complexity is strictly required by domain safety.

[PRODUCTION]
- performance-optimization
  Purpose: Core Web Vitals, Next.js image loading, dynamic imports, and bundle optimization.
  Use when: Optimizing slow page loads, large car fleet listings, and heavy assets.
  Do not use when: Early stage wireframing before functionality is complete.

- seo-best-practices
  Purpose: Search Engine Optimization, Open Graph cards, and Schema.org AutoRental structured data.
  Use when: Creating public car detail pages, fleet catalog pages, and landing pages.
  Do not use when: Building authenticated private admin dashboards.
```
