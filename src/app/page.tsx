import Link from "next/link";
import Image from "next/image";
import { getFeaturedVehicles } from "@/lib/services/vehicleService";
import { getCategoriesWithCounts } from "@/lib/services/categoryService";
import { HeroSearch } from "@/components/home/HeroSearch";
import { CarCard } from "@/components/cars/CarCard";
import { Shield, Sparkles, Clock, CheckCircle2, ArrowRight, HelpCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [featuredVehicles, categories] = await Promise.all([
    getFeaturedVehicles(6),
    getCategoriesWithCounts(),
  ]);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-neutral-950 py-20 lg:py-28 text-white">
        {/* Background ambient lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/30 via-neutral-950 to-neutral-950 pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-sky-400 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            Next-Generation Automotive Fleet
          </div>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white">
            Drive with Confidence. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
              Rent with Total Transparency.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-neutral-300 sm:text-lg">
            Experience hand-picked electric, executive luxury, and high-capacity SUV rentals. Instant online confirmation, verified vehicle specs, and zero hidden checkout fees.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/cars"
              className="flex items-center gap-2 rounded-xl bg-sky-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-600/30 transition-all hover:bg-sky-500 hover:shadow-xl active:scale-95"
            >
              Browse Full Fleet
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#categories"
              className="flex items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900/80 px-6 py-3.5 text-sm font-bold text-neutral-200 transition-all hover:bg-neutral-800"
            >
              Explore Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Floating Hero Search Engine */}
      <section className="px-4 sm:px-6 lg:px-8">
        <HeroSearch categories={categories} />
      </section>

      {/* Category Showcase Section */}
      <section id="categories" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                Tailored for Every Journey
              </p>
              <h2 className="mt-1 text-2xl font-extrabold text-neutral-900 dark:text-white sm:text-3xl">
                Explore by Vehicle Category
              </h2>
            </div>
            <Link
              href="/cars"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:underline dark:text-sky-400"
            >
              View all fleet categories <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/cars?category=${cat.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-white p-4 text-center transition-all duration-200 hover:-translate-y-1 hover:border-sky-500 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
              >
                {cat.image && (
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-950 mb-3">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="200px"
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <h3 className="text-sm font-bold text-neutral-900 group-hover:text-sky-600 dark:text-white dark:group-hover:text-sky-400">
                  {cat.name}
                </h3>
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                  {cat._count.vehicles} available
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vehicles Showcase */}
      <section className="bg-neutral-100/70 py-20 dark:bg-neutral-900/40 border-y border-neutral-200/60 dark:border-neutral-800/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                Premium Selection
              </p>
              <h2 className="mt-1 text-2xl font-extrabold text-neutral-900 dark:text-white sm:text-3xl">
                Featured Fleet Vehicles
              </h2>
            </div>
            <Link
              href="/cars"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:underline dark:text-sky-400"
            >
              See complete catalog ({featuredVehicles.length}+ models) <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredVehicles.map((vehicle, idx) => (
              <CarCard key={vehicle.id} vehicle={vehicle} priority={idx === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose TNT Value Props */}
      <section id="why-us" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              The TNT Advantage
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-neutral-900 dark:text-white">
              Engineered for Effortless Rentals
            </h2>
            <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
              We eliminated dealership lines, bait-and-switch rates, and hidden terminal fees to provide a smooth rental experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-2xl border border-neutral-200/80 bg-white dark:border-neutral-800 dark:bg-neutral-900">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 dark:bg-sky-950/50 dark:text-sky-400 mb-4">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">100% Guaranteed Model</h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                You drive the exact make, model, and year you reserve. No downgrade surprises or unexpected substitutions.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-2xl border border-neutral-200/80 bg-white dark:border-neutral-800 dark:bg-neutral-900">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">Zero Hidden Charges</h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                Itemized transparent pricing from step one. All taxes, mandatory surcharges, and deposit requirements shown upfront.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-2xl border border-neutral-200/80 bg-white dark:border-neutral-800 dark:bg-neutral-900">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400 mb-4">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">Fast-Track Key Handover</h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                Pre-verified digital driver licensing and direct-to-vehicle contactless pickup at our major terminal hubs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-neutral-100/70 py-20 dark:bg-neutral-900/40 border-t border-neutral-200/60 dark:border-neutral-800/60">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Common Questions
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-sky-600 shrink-0" />
                What documents do I need at vehicle pickup?
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400 pl-6">
                You will need a valid driver&apos;s license (held for at least 1 year) and an active credit or debit card matching the primary driver&apos;s name for the refundable security deposit hold.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-sky-600 shrink-0" />
                How does the security deposit work?
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400 pl-6">
                A temporary pre-authorization hold is placed on your card at pickup. Once the vehicle is returned in original condition with the required fuel level, the hold is fully released immediately.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
              <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-sky-600 shrink-0" />
                What is the cancellation and refund policy?
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400 pl-6">
                Cancellations made more than 48 hours before pickup receive a 100% full refund. Cancellations within 24–48 hours receive a 50% refund or full store credit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-600 via-sky-700 to-cyan-700 p-8 sm:p-12 text-white shadow-xl">
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                Ready to Hit the Road?
              </h2>
              <p className="mt-3 text-sm text-sky-100 leading-relaxed">
                Explore our full lineup of clean, inspected vehicles available for instant reservation at all major hubs.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/cars"
                  className="rounded-xl bg-white px-6 py-3 text-xs font-bold text-sky-700 shadow-md transition hover:bg-neutral-100"
                >
                  Explore Fleet Catalog
                </Link>
                <Link
                  href="/#categories"
                  className="rounded-xl border border-white/40 bg-white/10 px-6 py-3 text-xs font-bold text-white transition hover:bg-white/20"
                >
                  Browse Categories
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
