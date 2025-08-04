import { Skeleton } from "@/components/ui/skeleton";

export function CommentSectionSkeleton() {
  return (
    <div className="space-y-6">
      {[...Array(2)].map((_, i) => (
        <div
          key={i}
          className="p-5 rounded-2xl border border-amber-100 dark:border-amber-800/50 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm shadow"
        >
          <div className="flex items-center gap-3 mb-4">
            <Skeleton className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="space-y-2 w-full">
              <Skeleton className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-3 w-1/4 bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
          <Skeleton className="h-4 w-full mb-2 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-4 w-4/5 mb-2 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-4 w-3/5 bg-gray-200 dark:bg-gray-700" />
        </div>
      ))}
    </div>
  );
}
