---
name: security-best-practices
description: OWASP Top 10 web security, authentication & RBAC, CSRF protection, input sanitization, safe payment workflows, and secret management.
---

# Security Best Practices & Defensive Engineering

## 1. Zero Secrets in Client Code
- Never expose API keys, database connection strings, payment secret keys (e.g. `STRIPE_SECRET_KEY`), or JWT signing secrets to client components or public bundles.
- Only public variables prefixed with `NEXT_PUBLIC_` should ever be sent to the browser.
- Store sensitive configuration in `.env.local` (ensuring it is in `.gitignore`).

## 2. Server-Side Authentication & Authorization
- Protect sensitive routes, server actions, and API endpoints using session/token verification on the server.
- Enforce Role-Based Access Control (RBAC):
  - `Customer`: Can create bookings, view only their own bookings, request cancellation.
  - `Staff / Agent`: Can inspect vehicles, update pickup/return records.
  - `Admin`: Full fleet management, pricing adjustment, financial ledger access.
- Prevent Insecure Direct Object References (IDOR): Always verify `booking.customerId === session.user.id` when fetching or mutating a booking.

## 3. Input Validation & Injection Defense
- Validate all incoming payloads with Zod schemas.
- Use parameterized queries or ORM/query builders to prevent SQL/NoSQL injection.
- Sanitize user-provided text inputs (e.g. special requests, feedback) to prevent Stored Cross-Site Scripting (XSS).

## 4. Payment Gateway & Webhook Security
- Never store raw credit card details or CVVs on your servers. Use Stripe Elements or hosted checkout.
- Webhook Handlers: Validate webhook HMAC signatures (e.g. `stripe.webhooks.constructEvent`) before trusting webhook events.
- Idempotent Processing: Record processed event IDs to prevent double-crediting on retried webhooks.

## 5. Security Headers & Rate Limiting
- Implement standard security headers (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Content-Security-Policy`).
- Rate limit sensitive endpoints (login, password reset, payment initiation, search scraping).
