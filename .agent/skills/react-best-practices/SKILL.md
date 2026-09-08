---
name: react-best-practices
description: React 19 paradigms, component composition, state management discipline, hooks optimization, and clean lifecycle design.
---

# React 19 & Component Architecture Best Practices

## 1. React 19 Paradigms
- **Actions & State**: Leverage React 19 `useActionState` and `useOptimistic` for seamless form submission and optimistic UI updates.
- **Form Handling**: Use native `<form action={...}>` with Server Actions or client action handlers.
- **Ref as Prop**: In React 19, `ref` can be passed as a normal prop to function components without `forwardRef`.

## 2. Component Decomposition & Size
- Keep components focused and single-purpose (< 150 lines where practical).
- Extract sub-components for repeated elements (e.g. `CarCard`, `CarFeatureBadge`, `PriceTag`, `BookingSummaryRow`).
- Group components by domain context:
  - `src/components/ui/` (buttons, inputs, dialogs, badges)
  - `src/components/cars/` (car grid, car filter, car gallery, car specs)
  - `src/components/booking/` (date-picker range, add-on selector, price breakdown, checkout stepper)
  - `src/components/layout/` (navbar, footer, mobile drawer)

## 3. State Management Principles
- **State Colocation**: Place state as close as possible to the component that consumes it.
- **Derive State**: Never duplicate props or other state into separate state variables. Compute derived values during render.
- **Avoid Over-Memoization**: Do not wrap every callback in `useCallback` or every value in `useMemo` unless profiling shows costly computations or stable references are required by dependencies.
- **Controlled vs Uncontrolled**: Prefer uncontrolled inputs with form data or lightweight controlled components with minimal re-renders.

## 4. Effects Discipline (`useEffect`)
- Do NOT use `useEffect` for data fetching in Next.js Server Components (fetch on the server instead).
- Do NOT use `useEffect` to transform or synchronize data; calculate it inline during rendering.
- Only use `useEffect` for external system synchronization (e.g. subscribing to browser resize, setting up third-party map widgets, synchronizing with browser storage).

## 5. Clean Fallback & Loading States
- Always implement explicit UI states for:
  - `Loading`: Skeleton loaders matching actual content layout.
  - `Empty`: Actionable empty states with clear recovery actions (e.g., "No cars available for these dates — Try adjusting your filter").
  - `Error`: Contextual error alerts with retry triggers.
