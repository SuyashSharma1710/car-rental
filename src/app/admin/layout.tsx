import Link from "next/link";
import { getAdminSession } from "@/lib/auth/session";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";
import { LayoutDashboard, Car, Layers, ArrowLeft, Shield, UserCheck } from "lucide-react";

export const metadata = {
  title: "Admin Console | TNT Car Booking",
  description: "Fleet and operations management dashboard.",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  // If unauthenticated (e.g. on /admin/login), render clean standalone layout
  if (!session) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-neutral-100 dark:bg-neutral-950 flex flex-col justify-center">
        {children}
      </div>
    );
  }

  // Authenticated Admin Dashboard Layout
  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-neutral-100 dark:bg-neutral-950">
      {/* Admin Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        <div className="p-6 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-500 text-white shadow-md shadow-sky-500/20">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-black text-neutral-900 dark:text-white">
                Admin Console
              </h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  {session.role}
                </span>
              </div>
            </div>
          </div>

          {/* User Profile Card */}
          <div className="mt-4 rounded-xl bg-neutral-50 p-2.5 dark:bg-neutral-950/60 border border-neutral-100 dark:border-neutral-800 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-400 text-xs font-bold">
              <UserCheck className="h-3.5 w-3.5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                {session.fullName || session.email}
              </p>
              <p className="text-[10px] text-neutral-400 truncate">{session.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1.5 p-4 text-xs font-bold">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-neutral-700 hover:bg-neutral-100 hover:text-sky-600 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-sky-400 transition"
          >
            <LayoutDashboard className="h-4 w-4 text-neutral-400" />
            Overview Dashboard
          </Link>
          <Link
            href="/admin/vehicles"
            className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-neutral-700 hover:bg-neutral-100 hover:text-sky-600 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-sky-400 transition"
          >
            <Car className="h-4 w-4 text-neutral-400" />
            Vehicle Inventory
          </Link>
          <Link
            href="/admin/categories"
            className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-neutral-700 hover:bg-neutral-100 hover:text-sky-600 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-sky-400 transition"
          >
            <Layers className="h-4 w-4 text-neutral-400" />
            Fleet Categories
          </Link>
        </nav>

        {/* Footer Database Status & Logout */}
        <div className="p-4 border-t border-neutral-100 dark:border-neutral-800 space-y-2">
          <div className="rounded-xl bg-neutral-50 p-3 text-[11px] dark:bg-neutral-950/50 border border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Hostinger MySQL
            </div>
            <p className="mt-0.5 text-neutral-400 truncate">Database: u249221993_temp_delete</p>
          </div>

          <AdminLogoutButton />

          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-xl border border-neutral-200 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800 transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Public Site
          </Link>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex h-14 items-center justify-between border-b border-neutral-200 bg-white px-6 dark:border-neutral-800 dark:bg-neutral-900 md:hidden">
          <span className="text-xs font-black text-neutral-900 dark:text-white flex items-center gap-1.5">
            <Shield className="h-4 w-4 text-sky-600" /> Admin Console
          </span>
          <div className="flex items-center gap-3 text-xs font-bold">
            <Link href="/admin/dashboard" className="text-sky-600">
              Dashboard
            </Link>
            <Link href="/admin/vehicles" className="text-neutral-600 dark:text-neutral-400">
              Vehicles
            </Link>
            <Link href="/admin/categories" className="text-neutral-600 dark:text-neutral-400">
              Categories
            </Link>
          </div>
        </header>
        <div className="flex-1 p-6 lg:p-8 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
