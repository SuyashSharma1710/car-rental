import { getCategoriesWithCounts } from "@/lib/services/categoryService";
import { CategoryManager } from "@/components/admin/CategoryManager";
import { Layers } from "lucide-react";

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

      <CategoryManager initialCategories={categories} />
    </div>
  );
}

