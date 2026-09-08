import Image from "next/image";
import Link from "next/link";
import { getCategoriesWithCounts } from "@/lib/services/categoryService";
import { CategoryForm } from "@/components/admin/CategoryForm";
import { Layers, Car, ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Vehicle Categories | TNT Admin",
  description: "Manage fleet classification categories and vehicle segments.",
};

export default async function AdminCategoriesPage() {
  const categories = await getCategoriesWithCounts();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-5 dark:border-neutral-800">
        <h1 className="text-2xl font-black text-neutral-900 dark:text-white flex items-center gap-2.5">
          <Layers className="h-6 w-6 text-purple-600" />
          Fleet Categories & Segments ({categories.length})
        </h1>
        <p className="text-xs text-neutral-500">
          Configure vehicle classifications used for catalog filtering and customer navigation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Category List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl border border-neutral-200/80 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50/70 text-neutral-500 dark:border-neutral-800 dark:bg-neutral-950/40">
                    <th className="px-5 py-3.5 font-bold uppercase tracking-wider">Category</th>
                    <th className="px-4 py-3.5 font-bold uppercase tracking-wider">Slug</th>
                    <th className="px-4 py-3.5 font-bold uppercase tracking-wider">Active Vehicles</th>
                    <th className="px-5 py-3.5 font-bold uppercase tracking-wider text-right">Public View</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
                  {categories.map((cat) => (
                    <tr key={cat.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          {cat.image ? (
                            <div className="relative h-10 w-16 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800 shrink-0 border border-neutral-200 dark:border-neutral-700">
                              <Image
                                src={cat.image}
                                alt={cat.name}
                                fill
                                sizes="64px"
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="h-10 w-16 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400">
                              <Car className="h-5 w-5" />
                            </div>
                          )}
                          <div>
                            <div className="font-bold text-neutral-900 dark:text-white">
                              {cat.name}
                            </div>
                            {cat.description && (
                              <p className="text-[11px] text-neutral-400 line-clamp-1 max-w-xs">
                                {cat.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3.5 font-mono text-xs text-neutral-500">
                        {cat.slug}
                      </td>

                      <td className="px-4 py-3.5">
                        <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-bold text-sky-700 dark:bg-sky-950 dark:text-sky-400">
                          {cat._count.vehicles} {cat._count.vehicles === 1 ? "car" : "cars"}
                        </span>
                      </td>

                      <td className="px-5 py-3.5 text-right">
                        <Link
                          href={`/cars?category=${cat.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 hover:underline"
                        >
                          <span>Explore</span>
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Col: Add New Category Form */}
        <div className="lg:col-span-1">
          <CategoryForm />
        </div>
      </div>
    </div>
  );
}
