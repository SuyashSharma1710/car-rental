# TNT Car Booking — Project Agent Rules & Development Standards

## 1. Skill Routing & Mandatory Usage
- Identify the applicable skill before beginning work on any feature or fix.
- Apply the skill's methodology and validate output against its criteria before concluding tasks.
- For all car rental business logic, follow `car-rental-booking-domain` and `software-architecture`.
- For all UI/UX work, apply `ui-ux-pro-max`, `frontend-design`, and `accessibility`.

## 2. Version Control & Git Workflow
- **Commit Every Change**: Commit every logical unit of change or user-requested task promptly.
- **Conventional Commits**: Use standard commit prefixes (`feat:`, `fix:`, `refactor:`, `style:`, `chore:`, `docs:`).
- **Clean Repository**: Never commit temporary files or unneeded artifacts.

## 3. Package Manager & Tooling
- **Exclusively Use `pnpm`**: e.g., `pnpm add`, `pnpm run dev`, `pnpm run build`, `pnpm run lint`.
- **Next.js 16+ & React 19 Paradigms**: Server Components by default; await route `params` / `searchParams`.

## 4. Architecture & Code Structure
- **Directory Layout**:
  - `src/app/` — Next.js App Router (pages, layouts, route handlers, actions)
  - `src/components/` — Reusable components (`ui/`, `cars/`, `booking/`, `layout/`)
  - `src/lib/` — Business services (`src/lib/services/`), database repositories (`src/lib/db/`), utilities (`src/lib/utils/`)
  - `src/types/` — Shared TypeScript types & Zod schemas
  - `src/hooks/` — Custom reusable client hooks

## 5. TypeScript Strictness & Zero-`any`
- Strictly type all models, API boundaries, and booking state machines.
- Use discriminated unions for booking, payment, and async operation states.

## 6. Verification & Quality Gates
- Always run `pnpm run build` or `pnpm lint` before marking tasks complete.
