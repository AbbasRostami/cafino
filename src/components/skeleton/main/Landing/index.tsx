import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonItemSection = () => {
  return (
    <div className="group bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg relative border border-transparent min-w-[70vw] sm:min-w-[48vw] md:min-w-[32vw] lg:min-w-[25%] xl:min-w-[25%] max-w-[320px] w-full">
      <div className="relative rounded-t-2xl aspect-[4/3] w-full overflow-hidden">
        <Skeleton className="absolute inset-0 w-full h-full bg-gray-200 dark:bg-gray-800" />
      </div>

      <div className="p-5 flex flex-col gap-3 !rtl">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <Skeleton className="h-5 w-32 bg-gray-200 dark:bg-gray-800" />
            <Skeleton className="h-4 w-20 bg-gray-200 dark:bg-gray-800" />
          </div>
          <Skeleton className="h-6 w-12 rounded-full" />
        </div>

        <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-800" />
        <Skeleton className="h-4 w-[80%] bg-gray-200 dark:bg-gray-800" />

        <div className="flex gap-2 mt-2">
          <Skeleton className="h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-800" />
          <Skeleton className="h-6 w-14 rounded-full bg-gray-200 dark:bg-gray-800" />
          <Skeleton className="h-6 w-12 rounded-full bg-gray-200 dark:bg-gray-800" />
        </div>

        <div className="mt-3 space-y-2">
          <Skeleton className="h-3 w-full bg-gray-200 dark:bg-gray-800" />
          <Skeleton className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-800" />
          <Skeleton className="h-6 w-40 rounded-full bg-gray-200 dark:bg-gray-800" />
        </div>

        <div className="mt-4 flex flex-col xl:flex-row justify-between items-center gap-3">
          <Skeleton className="h-6 w-24 bg-gray-200 dark:bg-gray-800" />
          <Skeleton className="h-10 w-full xl:w-32 rounded-lg bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>
    </div>
  );
};
