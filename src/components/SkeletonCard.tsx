export function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden animate-pulse">
      <div className="w-full h-36 bg-gray-200 dark:bg-gray-700" />
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="flex-1 space-y-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
          </div>
        </div>
        <div className="flex gap-1">
          <div className="h-5 w-12 bg-gray-200 dark:bg-gray-700 rounded-full" />
          <div className="h-5 w-14 bg-gray-200 dark:bg-gray-700 rounded-full" />
          <div className="h-5 w-10 bg-gray-200 dark:bg-gray-700 rounded-full" />
        </div>
        <div className="space-y-1">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
        </div>
      </div>
    </div>
  );
}
