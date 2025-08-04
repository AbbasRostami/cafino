import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonSidebar = () => {
  return (
    <aside className="hidden lg:block w-80 h-full bg-white/80 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl">
      <ScrollArea className="h-full" dir="rtl">
        <div className="p-6 space-y-8 animate-pulse">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-r from-amber-300 to-orange-300" />
              <Skeleton className="h-6 w-20 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
            <Skeleton className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* Divider */}
          <div className="bg-gradient-to-r from-amber-300 to-orange-300 h-1 w-full rounded-full" />

          {/* دسته‌بندی‌ها */}
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

          {/* محدوده قیمت */}
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
