import { Skeleton } from "@/components/ui/skeleton";

export const HeaderSkeleton = () => (
  <div className="relative overflow-hidden bg-gradient-to-r from-rose-600 to-amber-500 dark:from-rose-800 dark:to-amber-700 rounded-3xl shadow-2xl p-6 sm:p-8">
    <div className="relative z-10 flex flex-col xl:flex-row items-center justify-between gap-6">
      <div className="flex flex-col items-center md:items-start text-center md:text-right w-full">
        <Skeleton className="h-8 w-3/4 max-w-xs mx-auto md:mx-0 bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-5 w-2/3 max-w-xs mt-3 mx-auto md:mx-0 bg-gray-200 dark:bg-gray-700" />
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full justify-center">
        <div className="relative flex-shrink-0">
          <Skeleton className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-700" />
        </div>

        <div className="text-center sm:text-right space-y-1 w-full">
          <Skeleton className="h-6 w-3/4 mx-auto sm:mx-0 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-5 w-1/2 mt-2 mx-auto sm:mx-0 bg-gray-200 dark:bg-gray-700" />

          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-4 w-4/5 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      </div>
    </div>
  </div>
);
