import { Skeleton } from "@/components/ui/skeleton";

export const PopularProductsSkeleton = () => (
  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-xl rounded-2xl p-6">
    <div className="flex items-center justify-between pb-4">
      <div className="flex items-center gap-2">
        <Skeleton className="w-5 h-5 bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-5 w-32 bg-gray-200 dark:bg-gray-700" />
      </div>
      <Skeleton className="h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-700" />
    </div>

    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="min-h-[100px] flex flex-col sm:flex-row items-center gap-4 py-2 px-4 bg-gray-100/50 dark:bg-gray-700/50 rounded-lg"
        >
          <div className="flex-1 w-full">
            <Skeleton className="h-5 w-3/4 mb-2 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-5 w-16 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-4 w-1/2 mt-2 bg-gray-200 dark:bg-gray-700" />
          </div>
          <Skeleton className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
        </div>
      ))}
    </div>

    <div className="mt-6">
      <Skeleton className="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
    </div>
  </div>
);
