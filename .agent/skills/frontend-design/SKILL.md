---
name: frontend-design
description: Visual design standards, typography scales, cohesive automotive color palettes, responsive layouts, micro-interactions, and component state design.
---

# Frontend Design & Visual Excellence Standards

## 1. Design Philosophy for Car Rental & Automotive
- **Brand Aesthetic**: Sleek, high-performance, trustworthy, and modern. High-contrast typography with subtle metallic/carbon-neutral accents and vibrant primary highlights (e.g., Electric Blue `#2563EB` / Velocity Orange `#EA580C` / Emerald Green `#059669` / Obsidian Dark `#09090B`).
- **Clean Elevation**: Subtle borders (`border-neutral-200 dark:border-neutral-800`), refined shadows (`shadow-sm`, `shadow-md`), and layered surfaces over heavy blur/glassmorphism.

## 2. Layout & Spacing System
- Strict 4px/8px baseline grid (`p-2`, `p-4`, `p-6`, `p-8`, `gap-4`, `gap-6`, `gap-8`).
- Mobile-first responsive breakpoints:
  - Mobile (`< 640px`): Full-width cards, compact bottom sheets, sticky booking bar.
  - Tablet (`640px - 1024px`): 2-column car grid, collapsible filter sidebar.
  - Desktop (`> 1024px`): 3-column car grid with persistent search/filter drawer, sticky checkout breakdown.

## 3. Typography System
- Font hierarchy:
  - Display / Hero Headings: Bold, clean sans-serif with tight tracking (`tracking-tight text-3xl font-extrabold sm:text-4xl lg:text-5xl`).
  - Section Headings: `text-2xl font-bold tracking-tight`.
  - Component Titles: `text-lg font-semibold`.
  - Body Text: `text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-300`.
  - Badges & Metadata: `text-xs font-medium uppercase tracking-wider`.

## 4. Comprehensive Interactive States
Every interactive element MUST have defined styles for:
- **Default (Idle)**: Clear affordance and legible text contrast.
- **Hover**: Smooth color/border transition (`transition-all duration-200 hover:border-blue-500 hover:shadow-md`).
- **Focus**: Distinct focus ring for keyboard accessibility (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600`).
- **Active / Pressed**: Subtle scale or elevation shift (`active:scale-[0.98]`).
- **Disabled**: Reduced opacity, `cursor-not-allowed`, and suppressed hover effects (`disabled:opacity-50 disabled:pointer-events-none`).
- **Loading**: Inline spinner or pulsing skeleton, maintaining element dimensions to prevent layout shifts.

## 5. Visual Hierarchy in Car Listings
- **Car Card Anatomy**:
  1. Car Image (High quality, consistent aspect ratio `16:9` or `4:3`, clean cutout/lighting).
  2. Category Badge (e.g. `Luxury Sedan`, `Electric SUV`, `Economy`).
  3. Vehicle Name & Make (e.g. `Tesla Model 3 Long Range`, `BMW 3 Series`).
  4. Quick Specs Badges (Transmission, Fuel/Battery, Seats, Luggage Capacity).
  5. Pricing Section (Daily rate highlighted in bold, total estimate, transparent deposit notes).
  6. Call to Action (`Book Now` / `View Details`).
