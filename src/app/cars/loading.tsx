export default function CarsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Skeleton */}
      <div className="mb-8 border-b border-neutral-200 pb-6 dark:border-neutral-800">
        <div className="h-4 w-32 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
        <div className="mt-2 h-8 w-64 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Skeleton */}
        <div className="hidden lg:block w-72 h-96 rounded-2xl bg-neutral-200 dark:bg-neutral-800 animate-pulse" />

        {/* Cars Grid Skeleton */}
        <div className="flex-1 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="aspect-[16/10] w-full bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-3 w-20 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
                <div className="h-5 w-40 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
                <div className="h-10 w-full bg-neutral-100 dark:bg-neutral-800/50 rounded animate-pulse" />
                <div className="flex justify-between items-center pt-2">
                  <div className="h-6 w-24 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
                  <div className="h-8 w-24 bg-neutral-200 dark:bg-neutral-800 rounded-xl animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
