---
name: performance-optimization
description: Core Web Vitals optimization, Next.js image loading, dynamic imports, font optimization, bundle size control, and client-side minimization.
---

# Performance Optimization & Core Web Vitals

## 1. Core Web Vitals Targets
- **Largest Contentful Paint (LCP)**: `< 2.5s` (Optimize hero car images with Next.js `<Image priority />`).
- **Interaction to Next Paint (INP)**: `< 200ms` (Minimize main thread JavaScript execution, avoid expensive client re-renders).
- **Cumulative Layout Shift (CLS)**: `< 0.1` (Always specify aspect ratios or dimensions on image containers and skeleton loaders).

## 2. Image Optimization Patterns
- Use `next/image` with responsive `sizes` attribute:
```tsx
<Image
  src={car.imageUrl}
  alt={`${car.make} ${car.model}`}
  fill
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  className="object-cover rounded-xl"
  priority={isHero}
/>
```
- Serve modern formats (AVIF / WebP) automatically via Next.js image optimizer.

## 3. Bundle Size & Code Splitting
- Dynamically import heavy interactive components (e.g. Map components, PDF invoice generators, date range calendars) using `next/dynamic`:
```tsx
import dynamic from 'next/dynamic';
const InteractiveCarMap = dynamic(() => import('@/components/cars/CarLocationMap'), {
  ssr: false,
  loading: () => <div className="h-96 w-full animate-pulse bg-neutral-200 dark:bg-neutral-800 rounded-xl" />
});
```

## 4. Font & Resource Preloading
- Use `next/font/google` (e.g. Geist Sans / Geist Mono or Outfit / Inter) with variable font loading to eliminate render-blocking external stylesheets and prevent layout shift.
