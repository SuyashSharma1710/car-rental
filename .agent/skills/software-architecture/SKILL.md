---
name: software-architecture
description: Clean architecture, modular layer boundaries, service layer, data access layer (DAL), separation of concerns, and dependency management.
---

# Software Architecture & Layered System Design

## 1. Clean Layered Architecture
Organize code into clear, unidirectional layers:

```text
Presentation Layer (src/app/, src/components/)
        ↓
Application / Service Layer (src/services/ or src/lib/services/)
        ↓
Data Access Layer / Repository (src/lib/db/, src/lib/api/)
        ↓
Domain Models & Types (src/types/)
```

### Layer Responsibilities:
- **Presentation (`src/app/`, `src/components/`)**: Rendering UI, handling user interactions, invoking Server Actions/services. No raw SQL or direct third-party SDK calls in components.
- **Service Layer (`src/lib/services/`)**: Orchestrating business logic (e.g., `bookingService.ts`, `pricingService.ts`, `availabilityService.ts`). Contains validation, calculations, and transactional operations.
- **Data Access Layer (`src/lib/db/` or `src/lib/mock/`)**: Encapsulating database queries, mutations, and caching logic.
- **Domain Types (`src/types/`)**: Pure TypeScript contracts and schemas with zero runtime dependencies.

## 2. Directory Conventions
```text
src/
├── app/                  # Next.js App Router (pages, layouts, routes, actions)
├── components/           # UI Components
│   ├── ui/               # Core primitives (Button, Input, Card, Modal)
│   ├── cars/             # Car listing, detail, and filter components
│   ├── booking/          # Booking workflow, calendar, summary
│   └── layout/           # Header, Footer, Navigation
├── lib/                  # Utilities, database clients, helpers
│   ├── services/         # Business logic services
│   ├── db/               # Database client & repositories
│   └── utils/            # Pure helper functions (formatters, dates, currency)
├── types/                # Shared TypeScript definitions
└── hooks/                # Custom reusable client hooks
```

## 3. Dependency Inversion & Testability
- Export well-defined interfaces for services so they can be easily mocked in unit and integration tests.
- Keep helper functions pure with zero side effects whenever possible.

## 4. Error Handling Strategy
- Use domain-specific error classes or standardized error objects (`ValidationError`, `NotFoundError`, `ConflictError`, `UnauthorizedError`).
- Translate errors into user-friendly localized messages at the UI boundary. Never leak stack traces or internal database column names.
