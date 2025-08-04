import { Skeleton } from "@/components/ui/skeleton";

export const PromotionalBannerSkeleton = () => (
  <div className="bg-gradient-to-r from-rose-600 to-amber-500 dark:from-rose-800 dark:to-amber-700 text-white shadow-2xl rounded-3xl p-6 sm:p-8 text-center">
    <Skeleton className="h-7 w-3/4 mx-auto mb-4 bg-gray-200 dark:bg-gray-700" />
    <Skeleton className="h-5 w-2/3 mx-auto mb-6 bg-gray-200 dark:bg-gray-700" />
    <Skeleton className="h-10 w-32 mx-auto rounded-full bg-gray-200 dark:bg-gray-700" />
  </div>
);
