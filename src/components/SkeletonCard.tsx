export function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
      {/* Gradient top strip */}
      <div className="h-1 w-full animate-shimmer" />
      <div className="w-full h-36 animate-shimmer" />
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full animate-shimmer" />
          <div className="flex-1 space-y-1.5">
            <div className="h-4 animate-shimmer rounded-lg w-1/2" />
            <div className="h-3 animate-shimmer rounded-full w-1/4" />
          </div>
        </div>
        <div className="flex gap-1">
          <div className="h-5 w-12 animate-shimmer rounded-full" />
          <div className="h-5 w-14 animate-shimmer rounded-full" />
          <div className="h-5 w-10 animate-shimmer rounded-full" />
        </div>
        <div className="space-y-1.5">
          <div className="h-3 animate-shimmer rounded-lg w-full" />
          <div className="h-3 animate-shimmer rounded-lg w-4/5" />
        </div>
        <div className="flex justify-between pt-1">
          <div className="h-3 animate-shimmer rounded-lg w-16" />
          <div className="h-3 animate-shimmer rounded-lg w-20" />
        </div>
      </div>
    </div>
  );
}
