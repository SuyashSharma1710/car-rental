import Link from "next/link";
import { Car, ShieldCheck, Clock, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-neutral-200 bg-white text-neutral-600 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Info */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-600 text-white shadow-sm">
                <Car className="h-5 w-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-neutral-900 dark:text-white">
                TNT<span className="text-sky-600">.</span> Car Booking
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
              Premium, modern, and transparent car rental service. Seamless reservations with zero hidden fees and instant confirmation.
            </p>
            <div className="mt-4 flex items-center gap-4 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-4 w-4 text-emerald-600" /> Fully Insured
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-sky-600" /> 24/7 Roadside
              </span>
            </div>
          </div>

          {/* Fleet Categories */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
              Fleet Categories
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/cars?category=electric" className="transition hover:text-sky-600">
                  Electric Vehicles (EV)
                </Link>
              </li>
              <li>
                <Link href="/cars?category=luxury" className="transition hover:text-sky-600">
                  Executive & Luxury
                </Link>
              </li>
              <li>
                <Link href="/cars?category=suv" className="transition hover:text-sky-600">
                  SUVs & Crossovers
                </Link>
              </li>
              <li>
                <Link href="/cars?category=sports" className="transition hover:text-sky-600">
                  Sports Coupes
                </Link>
              </li>
              <li>
                <Link href="/cars?category=economy" className="transition hover:text-sky-600">
                  Economy & Compact
                </Link>
              </li>
            </ul>
          </div>

          {/* Hub Locations */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
              Rental Hubs
            </h3>
            <ul className="mt-3 space-y-2.5 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                <span>Main Terminal Central Hub, Gateway Blvd</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                <span>Airport VIP Terminal Dropoff Hub</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                <span>Downtown Financial District Plaza</span>
              </li>
            </ul>
          </div>

          {/* Quick Access & Admin */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
              Platform & Support
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/cars" className="transition hover:text-sky-600">
                  Search All Available Cars
                </Link>
              </li>
              <li>
                <Link href="/admin" className="font-semibold text-sky-600 hover:underline">
                  Admin Fleet Dashboard
                </Link>
              </li>
              <li className="flex items-center gap-2 pt-2 text-xs text-neutral-500">
                <Phone className="h-3.5 w-3.5" /> Support: +1 (800) 555-0199
              </li>
              <li className="flex items-center gap-2 text-xs text-neutral-500">
                <Mail className="h-3.5 w-3.5" /> reservations@tntcarbooking.com
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-neutral-200 pt-6 text-center text-xs text-neutral-400 dark:border-neutral-800">
          <p>© {new Date().getFullYear()} TNT Car Booking Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
