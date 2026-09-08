"use client";

import Link from "next/link";
import { useState } from "react";
import { Car, Menu, X, Shield, Sparkles } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200/80 bg-white/90 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 transition hover:opacity-90">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-500 text-white shadow-md shadow-sky-500/20">
            <Car className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-neutral-900 dark:text-white">
              TNT<span className="text-sky-600 dark:text-sky-400">.</span>
            </span>
            <span className="hidden text-xs font-semibold uppercase tracking-wider text-neutral-500 sm:inline ml-1.5 dark:text-neutral-400">
              Car Rental
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600 dark:text-neutral-300">
          <Link href="/cars" className="transition hover:text-sky-600 dark:hover:text-sky-400">
            Fleet Catalog
          </Link>
          <Link href="/#categories" className="transition hover:text-sky-600 dark:hover:text-sky-400">
            Categories
          </Link>
          <Link href="/#why-us" className="transition hover:text-sky-600 dark:hover:text-sky-400">
            Why Choose Us
          </Link>
          <Link href="/#faq" className="transition hover:text-sky-600 dark:hover:text-sky-400">
            FAQs
          </Link>
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/admin"
            className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3.5 py-1.5 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900"
          >
            <Shield className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
            Admin Portal
          </Link>
          <Link
            href="/cars"
            className="flex items-center gap-1.5 rounded-lg bg-sky-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-sky-500 hover:shadow-md active:scale-95"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Browse Cars
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-neutral-600 transition hover:bg-neutral-100 md:hidden dark:text-neutral-300 dark:hover:bg-neutral-800"
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="border-b border-neutral-200 bg-white px-4 pt-2 pb-6 md:hidden dark:border-neutral-800 dark:bg-neutral-950">
          <div className="flex flex-col gap-3 text-sm font-medium">
            <Link
              href="/cars"
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-3 py-2 text-neutral-700 transition hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-900"
            >
              Fleet Catalog
            </Link>
            <Link
              href="/#categories"
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-3 py-2 text-neutral-700 transition hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-900"
            >
              Vehicle Categories
            </Link>
            <Link
              href="/#why-us"
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-3 py-2 text-neutral-700 transition hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-900"
            >
              Why TNT Rentals
            </Link>
            <Link
              href="/#faq"
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-3 py-2 text-neutral-700 transition hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-900"
            >
              FAQs & Help
            </Link>
            <div className="mt-2 flex flex-col gap-2 pt-2 border-t border-neutral-200 dark:border-neutral-800">
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 rounded-lg border border-neutral-200 py-2.5 text-xs font-semibold text-neutral-800 dark:border-neutral-800 dark:text-neutral-200"
              >
                <Shield className="h-3.5 w-3.5 text-sky-600" />
                Admin Dashboard
              </Link>
              <Link
                href="/cars"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 rounded-lg bg-sky-600 py-2.5 text-xs font-bold text-white shadow-sm"
              >
                Browse Fleet
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
