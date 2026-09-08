"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { createCategoryAction, updateCategoryAction, deleteCategoryAction } from "@/lib/actions/adminActions";
import { Layers, Plus, Edit2, Trash2, ExternalLink, Loader2, X, AlertCircle } from "lucide-react";

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  _count: {
    vehicles: number;
  };
}

interface CategoryManagerProps {
  initialCategories: CategoryItem[];
}

export function CategoryManager({ initialCategories }: CategoryManagerProps) {
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form input states
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingCategory) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
    }
  };

  const startEdit = (cat: CategoryItem) => {
    setEditingCategory(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description || "");
    setImage(cat.image || "");
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const cancelEdit = () => {
    setEditingCategory(null);
    setName("");
    setSlug("");
    setDescription("");
    setImage("");
    setErrorMessage(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const formData = new FormData();
    formData.set("name", name);
    formData.set("slug", slug);
    formData.set("description", description);
    formData.set("image", image);

    startTransition(async () => {
      let res;
      if (editingCategory) {
        res = await updateCategoryAction(editingCategory.id, formData);
      } else {
        res = await createCategoryAction(formData);
      }

      if (res.success) {
        setSuccessMessage(editingCategory ? "Category updated successfully." : "Category created successfully.");
        cancelEdit();
      } else {
        setErrorMessage(res.error || "Operation failed.");
      }
    });
  };

  const handleDelete = (cat: CategoryItem) => {
    if (cat._count.vehicles > 0) {
      setErrorMessage(
        `Cannot delete "${cat.name}": ${cat._count.vehicles} vehicle(s) are currently assigned to this category. Reassign or delete those vehicles first.`
      );
      return;
    }

    if (!confirm(`Are you sure you want to delete the "${cat.name}" category?`)) {
      return;
    }

    setErrorMessage(null);
    setSuccessMessage(null);

    startTransition(async () => {
      const res = await deleteCategoryAction(cat.id);
      if (res.success) {
        setSuccessMessage(`Category "${cat.name}" deleted successfully.`);
        if (editingCategory?.id === cat.id) {
          cancelEdit();
        }
      } else {
        setErrorMessage(res.error || "Failed to delete category.");
      }
    });
  };

  const inputClasses =
    "w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2 text-xs font-medium text-neutral-900 shadow-sm focus:border-purple-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left 2 Cols: Category List */}
      <div className="lg:col-span-2 space-y-4">
        {errorMessage && (
          <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs font-semibold text-rose-800 dark:border-rose-900 dark:bg-rose-950/60 dark:text-rose-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs font-semibold text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-400">
            {successMessage}
          </div>
        )}

        <div className="rounded-2xl border border-neutral-200/80 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50/70 text-neutral-500 dark:border-neutral-800 dark:bg-neutral-950/40">
                  <th className="px-5 py-3.5 font-bold uppercase tracking-wider">Category</th>
                  <th className="px-4 py-3.5 font-bold uppercase tracking-wider">Slug</th>
                  <th className="px-4 py-3.5 font-bold uppercase tracking-wider">Vehicles</th>
                  <th className="px-5 py-3.5 font-bold uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60">
                {initialCategories.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-8 text-center text-neutral-500">
                      No categories found. Create one using the form on the right.
                    </td>
                  </tr>
                ) : (
                  initialCategories.map((cat) => (
                    <tr
                      key={cat.id}
                      className={`hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition ${
                        editingCategory?.id === cat.id ? "bg-purple-50/40 dark:bg-purple-950/30" : ""
                      }`}
                    >
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
                              <Layers className="h-5 w-5" />
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
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/cars?category=${cat.slug}`}
                            target="_blank"
                            title="View in public fleet"
                            className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 transition"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Link>

                          <button
                            onClick={() => startEdit(cat)}
                            title="Edit Category"
                            className="inline-flex items-center gap-1 rounded-lg bg-purple-50 px-2.5 py-1 text-[11px] font-bold text-purple-700 hover:bg-purple-100 dark:bg-purple-950 dark:text-purple-400 dark:hover:bg-purple-900 transition"
                          >
                            <Edit2 className="h-3 w-3" /> Edit
                          </button>

                          <button
                            onClick={() => handleDelete(cat)}
                            disabled={isPending}
                            title={
                              cat._count.vehicles > 0
                                ? `Cannot delete: ${cat._count.vehicles} vehicle(s) assigned`
                                : "Delete Category"
                            }
                            className={`rounded-lg p-1.5 transition ${
                              cat._count.vehicles > 0
                                ? "text-neutral-300 dark:text-neutral-700 cursor-not-allowed"
                                : "text-rose-500 hover:bg-rose-50 hover:text-rose-700 dark:hover:bg-rose-950 dark:hover:text-rose-400"
                            }`}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Right Col: Create / Edit Category Form */}
      <div className="lg:col-span-1">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 space-y-4"
        >
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400">
                <Layers className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-neutral-900 dark:text-white">
                  {editingCategory ? "Edit Category" : "Add New Category"}
                </h2>
                <p className="text-[11px] text-neutral-400">
                  {editingCategory ? `Editing: ${editingCategory.name}` : "Create a vehicle classification segment"}
                </p>
              </div>
            </div>

            {editingCategory && (
              <button
                type="button"
                onClick={cancelEdit}
                className="rounded-lg p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800"
                title="Cancel edit"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Category Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. Electric & Hybrid, Sports Luxury"
              className={inputClasses}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              URL Slug *
            </label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. electric-hybrid"
              className={`${inputClasses} font-mono`}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of this segment"
              className={inputClasses}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
              Cover Image URL
            </label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className={inputClasses}
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-purple-600 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-purple-500 disabled:opacity-50 transition"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : editingCategory ? (
                <Edit2 className="h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              <span>{editingCategory ? "Save Changes" : "Create Category"}</span>
            </button>

            {editingCategory && (
              <button
                type="button"
                onClick={cancelEdit}
                className="rounded-xl border border-neutral-200 px-4 py-2.5 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
