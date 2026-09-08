---
name: nextjs-best-practices
description: Authoritative guide for Next.js 16+ App Router, React 19 Server Components, Server Actions, caching, metadata, and routing paradigms.
---

# Next.js 16+ App Router Best Practices

## 1. Server Components vs. Client Components
- **Default to React Server Components (RSC)**: Fetch data directly in Server Components using async/await. Keep heavy libraries and secrets on the server.
- **Selective Client Components (`'use client'`)**: Use `'use client'` only at the leaves of your component tree when you need:
  - React state (`useState`, `useReducer`)
  - Effects (`useEffect`)
  - Browser event listeners (`onClick`, `onChange`, `onSubmit`)
  - Browser-only APIs (`window`, `localStorage`, `navigator`)
- **Composition Pattern**: Pass Server Components as `children` or props into Client Components to avoid making entire subtrees client-side.

## 2. Dynamic Route Parameters & SearchParams (Next.js 16 / React 19)
- In Next.js 16+, `params` and `searchParams` passed to `page.tsx`, `layout.tsx`, and `route.ts` are **Promises** and **MUST** be awaited:
```tsx
// Correct Next.js 16+ Page Props
interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CarDetailPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const query = await searchParams;
  const car = await getCarById(id);
  return <CarDetailView car={car} />;
}
```

## 3. Server Actions & Mutations
- Define Server Actions with `'use server'` at the file or function level.
- Always validate inputs using a schema validator (such as Zod) inside the Server Action before executing business logic.
- Use `revalidatePath()` or `revalidateTag()` to purge stale caches after mutations.
- Return structured result objects `{ success: boolean, data?: T, error?: string }` rather than throwing uncaught errors to the client.

## 4. Route Handlers (`src/app/api/.../route.ts`)
- Use standard Web Request and Response APIs (`NextRequest`, `NextResponse`).
- Handle HTTP verbs via named exports: `export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> })`.
- Never expose internal database error details directly in API responses.

## 5. Streaming & Suspense
- Use `loading.tsx` or `<Suspense fallback={<CarCardSkeleton />}>` around slow async data boundaries to deliver instant First Contentful Paint.
- Use `error.tsx` (must be a Client Component) with a `reset()` callback to gracefully isolate and handle runtime failures.

## 6. Image & Asset Optimization
- Always use `next/image` with explicit `width`, `height`, or `fill` with `sizes` for responsive images.
- Specify `priority` for above-the-fold hero images.

## 7. Metadata & SEO
- Export static `metadata: Metadata = { ... }` or dynamic `export async function generateMetadata({ params }): Promise<Metadata>`.
