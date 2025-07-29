import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Props {
  viewMode: "grid" | "list";
}

export const MenuItemSkeleton = ({ viewMode }: Props) => {
  return (
    <div
      className={cn(
        "group bg-white dark:bg-gray-800 rounded-2xl w-80 h-full shadow-lg overflow-hidden transition-all duration-300 border border-transparent animate-pulse",
        viewMode === "list" ? "flex flex-row" : ""
      )}
    >
      {/* تصویر */}
      <div
        className={cn(
          "relative overflow-hidden bg-gray-200 dark:bg-gray-700",
          viewMode === "list" ? "w-full sm:w-1/3 h-48" : "h-64"
        )}
      >
        <Skeleton className="w-full h-full bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* جزئیات */}
      <div
        className={cn(
          "p-4 flex flex-col gap-3",
          viewMode === "list" ? "w-full sm:w-2/3" : ""
        )}
      >
        {/* عنوان و امتیاز */}
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-3 w-20 bg-gray-200 dark:bg-gray-700" />
          </div>
          <Skeleton className="h-6 w-12 rounded-full" />
        </div>

        {/* توضیح محصول */}
        <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700" />

        {/* مواد تشکیل دهنده */}
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* موجودی */}
        <div className="space-y-2 mt-2">
          <Skeleton className="h-3 w-24 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-6 w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* قیمت و دکمه‌ها */}
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
  );
};
