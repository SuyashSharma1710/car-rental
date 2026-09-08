---
name: seo-best-practices
description: Technical SEO, Next.js Metadata API, Open Graph & Twitter Cards, JSON-LD Schema.org structured data (AutoRental/RentalCarReservation), and sitemaps.
---

# Search Engine Optimization (SEO) & Structured Data

## 1. Next.js Metadata API
- Define comprehensive static or dynamic metadata on every public page:
```typescript
import type { Metadata } from 'next';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const car = await getCarById(id);
  
  return {
    title: `Rent ${car.make} ${car.model} (${car.year}) | TNT Car Booking`,
    description: `Book a ${car.make} ${car.model} in top condition. Instant confirmation, transparent pricing at $${car.dailyRate}/day with zero hidden fees.`,
    openGraph: {
      title: `${car.make} ${car.model} Rental | TNT Car Booking`,
      description: `Reserve your ${car.make} ${car.model} today.`,
      images: [{ url: car.imageUrl, width: 1200, height: 630, alt: `${car.make} ${car.model}` }],
    },
    alternates: {
      canonical: `/cars/${car.id}`,
    },
  };
}
```

## 2. JSON-LD Structured Data (Schema.org)
- Embed structured data scripts for Search Engine Rich Snippets:
  - `AutoRental` on homepage / fleet listing.
  - `Product` / `Vehicle` on car detail pages.
```tsx
export function CarStructuredData({ car }: { car: Car }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Vehicle',
    name: `${car.make} ${car.model}`,
    vehicleModelDate: car.year,
    fuelType: car.fuelType,
    numberOfDoors: car.doors,
    seatingCapacity: car.seats,
    offers: {
      '@type': 'Offer',
      price: car.dailyRate,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

## 3. Crawlability & Canonical URLs
- Implement `src/app/sitemap.ts` to dynamically generate XML sitemaps for all vehicles and locations.
- Implement `src/app/robots.ts` to guide web crawlers while disallowing private checkout or user account pages.
