---
name: accessibility
description: WCAG 2.1 AA accessibility standards, semantic HTML, keyboard navigation, focus management, ARIA live regions, and color contrast.
---

# Accessibility (a11y) & Inclusive Design Standards

## 1. Semantic HTML Structure
- Use landmark elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`, `<footer>`.
- Enforce heading hierarchy: Exactly one `<h1>` per page, followed sequentially by `<h2>`, `<h3>` without skipping levels.
- Use native interactive elements: Use `<button>` for actions and `<a href="...">` for navigations. Never use `<div onClick="...">`.

## 2. Forms & Inputs Accessibility
- Every input field must have an associated `<label htmlFor="id">` or `aria-label`.
- Associate validation errors with inputs using `aria-describedby="error-id"` and `aria-invalid="true"`.
- Date range pickers and car filter controls must support arrow keys, Tab navigation, and Escape to close dropdowns.

## 3. Keyboard Navigation & Focus Management
- Interactive components (modals, dialogs, drawers, dropdown menus) MUST trap focus while open and restore focus to the trigger element upon closing.
- Ensure all interactive elements have visible, high-contrast focus rings (`focus-visible:ring-2 focus-visible:ring-offset-2`).
- Provide "Skip to main content" links for screen reader and keyboard users.

## 4. Screen Reader Announcements & ARIA
- Use `aria-live="polite"` or `role="status"` for dynamic updates (e.g. price recalculations, filter results count, availability status).
- Set meaningful `alt` text on vehicle images (e.g. `alt="Side view of Silver BMW 5 Series Sedan"`) or `alt=""` for purely decorative icons accompanied by `aria-hidden="true"`.

## 5. Color Contrast & Touch Targets
- Text must meet WCAG 2.1 AA minimum contrast ratios:
  - Normal text: at least `4.5:1`
  - Large text (`18pt+` or `14pt+ bold`): at least `3.0:1`
- Minimum touch target size for mobile: at least `44x44px` with adequate padding.
