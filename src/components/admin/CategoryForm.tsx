"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createCategoryAction } from "@/lib/actions/adminActions";
import { Loader2, Plus, Layers } from "lucide-react";

export function CategoryForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleNameChange = (val: string) => {
    setName(val);
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await createCategoryAction(formData);
      if (res.success) {
        setName("");
        setSlug("");
        (e.target as HTMLFormElement).reset();
        router.refresh();
      } else {
        setErrorMessage(res.error || "Failed to create category.");
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 space-y-4"
    >
      <div className="flex items-center gap-2 pb-2 border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400">
          <Layers className="h-4 w-4" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-neutral-900 dark:text-white">Add New Category</h2>
          <p className="text-[11px] text-neutral-400">Create a vehicle category / classification segment</p>
        </div>
      </div>

      {errorMessage && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-800 dark:border-rose-900 dark:bg-rose-950/60 dark:text-rose-400">
          {errorMessage}
        </div>
      )}

      <div>
        <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
          Category Name *
        </label>
        <input
          name="name"
          type="text"
          required
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder="e.g. Electric & Hybrid, Sports Luxury"
          className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-2 text-xs font-medium focus:border-purple-500 focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
          URL Slug *
        </label>
        <input
          name="slug"
          type="text"
          required
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="e.g. electric-hybrid"
          className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-2 text-xs font-mono font-medium focus:border-purple-500 focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
          Description
        </label>
        <textarea
          name="description"
          rows={2}
          placeholder="Brief description of this segment"
          className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-2 text-xs font-medium focus:border-purple-500 focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
          Cover Image URL
        </label>
        <input
          name="image"
          type="url"
          placeholder="https://images.unsplash.com/..."
          className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-2 text-xs font-medium focus:border-purple-500 focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-purple-500 disabled:opacity-50 transition"
      >
        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
        Create Category
      </button>
    </form>
  );
}
