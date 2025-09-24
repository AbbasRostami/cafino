import { Skeleton } from "@/components/ui/skeleton";

export const ItemDetailsSkeleton = () => {
  return (
    <div className="px-4 md:px-8 lg:px-8 xl:px-24 pt-28 pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-8">
          <div className="relative">
            <Skeleton className="rounded-3xl overflow-hidden h-[250px] sm:h-[500px] border-4 border-white dark:border-gray-800 animate-pulse bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="absolute top-4 right-4 w-20 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
          </div>

          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <Skeleton
                key={index}
                className="rounded-2xl h-20 animate-pulse bg-gray-200 dark:bg-gray-700"
              />
            ))}
          </div>
          <Skeleton className="rounded-3xl p-6 h-48 bg-gray-200 dark:bg-gray-700" />
        </div>

        <div className="space-y-8">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border border-white/70 dark:border-gray-700/50 relative overflow-hidden">
            <Skeleton className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-xl bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full blur-xl bg-gray-200 dark:bg-gray-700" />

            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6 relative z-10">
              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Skeleton className="px-4 py-1.5 rounded-full text-sm font-medium w-24 h-8 bg-gray-200 dark:bg-gray-700" />
                  <Skeleton className="px-3 py-1 rounded-full w-20 h-8 bg-gray-200 dark:bg-gray-700" />
                </div>

                <Skeleton className="h-10 w-3/4 bg-gray-200 dark:bg-gray-700" />

                <div className="mt-5 space-y-2">
                  <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700" />
                  <Skeleton className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700" />
                  <Skeleton className="h-4 w-4/5 bg-gray-200 dark:bg-gray-700" />
                  <Skeleton className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700" />
                </div>
              </div>

              <Skeleton className="w-12 h-12 rounded-full" />
            </div>

            <div className="mt-8">
              <div className="flex items-center gap-3 mb-5">
                <Skeleton className="h-6 w-32 bg-gray-200 dark:bg-gray-700" />
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[...Array(4)].map((_, index) => (
                  <Skeleton
                    key={index}
                    className="h-12 rounded-xl bg-gray-200 dark:bg-gray-700"
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-wrap justify-end items-center gap-3 mt-6">
              <Skeleton className="h-10 w-32 rounded-xl bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-10 w-32 rounded-xl bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>

          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-5 shadow-md border border-gray-200 dark:border-gray-700 sticky top-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex-1 min-w-0 space-y-2">
                <Skeleton className="h-6 w-32 bg-gray-200 dark:bg-gray-700" />
                <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-700" />
              </div>
              <Skeleton className="h-12 w-32 rounded-xl bg-gray-200 dark:bg-gray-700" />
            </div>

            <Skeleton className="h-2 mt-3 w-full rounded-full bg-gray-200 dark:bg-gray-700" />
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-2 gap-2 mb-6">
              <Skeleton className="h-10 rounded-md bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-10 rounded-md bg-gray-200 dark:bg-gray-700" />
            </div>

            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="p-5 rounded-2xl bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Skeleton className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-32 bg-gray-200 dark:bg-gray-700" />
                      <Skeleton className="h-3 w-24 bg-gray-200 dark:bg-gray-700" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-full bg-gray-200 dark:bg-gray-700" />
                    <Skeleton className="h-3 w-5/6 bg-gray-200 dark:bg-gray-700" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
