import { Skeleton } from "@/components/ui/skeleton";

export const QuickActionsSkeleton = () => (
  <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-2xl rounded-3xl p-6">
    <div className="pb-4">
      <Skeleton className="h-6 w-32 bg-gray-200 dark:bg-gray-700" />
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {[...Array(6)].map((_, i) => (
        <Skeleton key={i} className="h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
      ))}
    </div>
  </div>
);
