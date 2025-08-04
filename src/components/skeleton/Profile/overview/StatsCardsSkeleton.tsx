import { Skeleton } from "@/components/ui/skeleton";

export const StatsCardsSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
    {[...Array(4)].map((_, i) => (
      <div
        key={i}
        className="border-l-4 border-l-gray-300 shadow-sm rounded-lg p-4 bg-white dark:bg-gray-800"
      >
        <div className="flex items-center justify-between pb-3">
          <Skeleton className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
        </div>
        <div>
          <Skeleton className="h-7 w-3/4 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-3 w-1/2 mt-2 bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    ))}
  </div>
);
