import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/utils/utils";

export const MenuItemSkeleton = ({
  viewMode,
}: {
  viewMode: "grid" | "list";
}) => {
  return (
    <div
      className={cn(
        viewMode === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          : "flex flex-col gap-4"
      )}
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "group bg-white dark:bg-gray-800 rounded-2xl w-full shadow-lg overflow-hidden transition-all duration-300 border border-transparent animate-pulse",
            viewMode === "list" ? "flex flex-row" : ""
          )}
        >
          <div
            className={cn(
              "relative overflow-hidden bg-gray-200 dark:bg-gray-700",
              viewMode === "list" ? "w-full sm:w-1/3 h-48" : "h-64"
            )}
          >
            <Skeleton className="w-full h-full bg-gray-200 dark:bg-gray-700" />
          </div>
          <div
            className={cn(
              "p-4 flex flex-col gap-3",
              viewMode === "list" ? "w-full sm:w-2/3" : ""
            )}
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <Skeleton className="h-5 w-32 bg-gray-200 dark:bg-gray-700" />
                <Skeleton className="h-3 w-20 bg-gray-200 dark:bg-gray-700" />
              </div>
              <Skeleton className="h-6 w-12 rounded-full" />
            </div>
            <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700" />

            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-700" />
            </div>

            <div className="space-y-2 mt-2">
              <Skeleton className="h-3 w-24 bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-6 w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
            </div>

            <div className="flex justify-between items-center mt-2">
              <Skeleton className="h-5 w-24 bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-4 w-16 bg-gray-200 dark:bg-gray-700" />
            </div>
            <div className="flex flex-col xl:flex-row gap-2">
              <Skeleton className="h-10 w-full xl:w-1/2 rounded-lg bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-10 w-full xl:w-1/2 rounded-lg bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const SkeletonSidebar = () => {
  return (
    <aside className="hidden xl:block w-80 h-full bg-white/80 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl">
      <ScrollArea className="h-full" dir="rtl">
        <div className="p-6 space-y-8 animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-r from-amber-300 to-orange-300" />
              <Skeleton className="h-6 w-20 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
            <Skeleton className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700" />
          </div>

          <div className="bg-gradient-to-r from-amber-300 to-orange-300 h-1 w-full rounded-full" />

          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/40 dark:bg-gray-700/30 space-y-2"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="w-6 h-6 rounded-lg bg-gray-200 dark:bg-gray-700" />
                  <Skeleton className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700" />
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <Skeleton className="h-5 w-28 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="flex gap-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20 bg-gray-200 dark:bg-gray-700" />
                <Skeleton className="h-10 w-28 rounded-md bg-gray-200 dark:bg-gray-700" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20 bg-gray-200 dark:bg-gray-700" />
                <Skeleton className="h-10 w-28 rounded-md bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>
            <Skeleton className="h-3 w-full rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
              <Skeleton className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
};

export const MenuSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="h-full shrink-0">
          <SkeletonSidebar />
        </div>
        <div className="flex-1">
          <MenuItemSkeleton viewMode="grid" />
        </div>
      </div>
    </div>
  );
};
