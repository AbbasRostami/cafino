import { Skeleton } from "@/components/ui/skeleton";
import { MotionDiv } from "@/utils/MotionWrapper";

export const FavoritesSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 rounded-xl">
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 flex items-center justify-center flex-col gap-2"
      >
        <Skeleton className="h-6 w-1/3 rounded-md bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-6 w-1/2 rounded-md bg-gray-200 dark:bg-gray-700" />
      </MotionDiv>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <MotionDiv
            key={i}
            className="rounded-3xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="p-5 space-y-4">
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-1/2 rounded-md bg-gray-200 dark:bg-gray-700" />
                <Skeleton className="h-4 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />
              </div>

              <Skeleton className="h-3 w-full rounded-md bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-3 w-5/6 rounded-md bg-gray-200 dark:bg-gray-700" />

              <div className="flex flex-wrap gap-1 mt-2">
                <Skeleton className="h-5 w-20 rounded-full bg-gray-200 dark:bg-gray-700" />
                <Skeleton className="h-5 w-16 rounded-full bg-gray-200 dark:bg-gray-700" />
                <Skeleton className="h-5 w-12 rounded-full bg-gray-200 dark:bg-gray-700" />
                <Skeleton className="h-5 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />
              </div>

              <div className="flex flex-col items-start pt-3 border-t border-gray-200 dark:border-gray-700 gap-2">
                <Skeleton className="h-5 w-24 rounded-md bg-gray-200 dark:bg-gray-700" />
                <div className="w-full">
                  <div className="flex justify-between text-xs mb-1">
                    <Skeleton className="h-3 w-20 bg-gray-200 dark:bg-gray-700" />
                    <Skeleton className="h-3 w-8 bg-gray-200 dark:bg-gray-700" />
                  </div>
                  <Skeleton className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700" />
                </div>
              </div>

              <div className="flex flex-col gap-2 justify-center">
                <Skeleton className="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
                <div className="flex justify-center">
                  <Skeleton className="h-10 w-32 rounded-lg bg-gray-200 dark:bg-gray-700" />
                </div>
              </div>
            </div>
          </MotionDiv>
        ))}
      </div>
    </div>
  );
};
