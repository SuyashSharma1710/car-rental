# Project Agent Rules & Development Standards

## 1. Version Control & Git Workflow
- **Commit Every Change**: Commit every logical unit of change or user-requested task promptly.
- **Conventional Commits**: Use clear, standard commit prefixes (`feat:`, `fix:`, `refactor:`, `style:`, `chore:`, `docs:`).
- **Clean Repository**: Maintain `.gitignore` and avoid committing temporary or scratch files.

## 2. Package Manager & Tooling
- **Package Manager**: Exclusively use `pnpm` (e.g., `pnpm add <pkg>`, `pnpm run dev`, `pnpm run build`, `pnpm run lint`).
- **Framework Versioning**: Respect Next.js 16+ App Router and React 19 paradigms. Remember that `params` and `searchParams` in page/layout props are Promises and must be awaited.

## 3. Architecture & Code Structure (Car Rental App)
- **Directory Organization**:
  - `src/app/` — Next.js App Router pages, layouts, and route handlers.
  - `src/components/` — Modular, reusable React components (grouped by feature or `ui/`, `common/`, `booking/`, `cars/`).
  - `src/lib/` — Helper functions, API clients, database/mock services, and constants.
  - `src/types/` — Shared TypeScript interfaces and type declarations.
  - `src/hooks/` — Custom reusable client hooks.
- **Server vs. Client Components**: Default to React Server Components (RSC). Only mark components with `'use client'` when state, effects, or browser event listeners are required.

## 4. TypeScript & Code Quality
- **Strict Typing**: Enforce strict TypeScript typing. Do NOT use `any`; define explicit interfaces/types for car listings, booking payloads, user profiles, and API responses.
- **Error Handling**: Implement graceful error boundaries, try/catch blocks for async operations, and user-friendly fallback states.
- **Zero Unused Code**: Clean up dead code, unused imports, and console logs before committing.

## 5. UI/UX Design System & Aesthetics
- **Design Intelligence**: Adhere to modern, premium aesthetics (leveraging UI/UX Pro Max standards):
  - Cohesive color palettes tailored for an automotive/car rental brand (sleek dark/light modes, high-contrast accents).
  - Responsive, mobile-first layouts with smooth micro-animations, transitions, and hover states.
  - Accessible interactive elements (proper ARIA attributes, semantic HTML, focus rings).
- **No Empty Placeholders**: Use rich, realistic sample data, proper icons, and structured content layouts.

## 6. Verification & Testing
- **Validation Before Completion**: Always run `pnpm run build` or `pnpm run lint` to verify that there are zero TypeScript compilation errors or broken imports before concluding tasks.
