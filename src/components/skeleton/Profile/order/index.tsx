import { Skeleton } from "@/components/ui/skeleton";

export const OrderSkeleton = () => {
  return (
    <div className="container mx-auto px-2 py-8">
      <div className="text-center mb-8">
        <Skeleton className="mx-auto h-8 w-80 mb-3 bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="mx-auto h-5 w-96 bg-gray-200 dark:bg-gray-700" />
      </div>

      <div className="flex flex-col gap-4 p-4 bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-800 rounded-lg shadow-md">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
            >
              <div className="pb-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-gray-700" />
                    <div className="flex flex-col gap-1">
                      <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-700" />
                      <Skeleton className="h-5 w-32 bg-gray-200 dark:bg-gray-700" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-24 rounded-full bg-gray-200 dark:bg-gray-700" />
                </div>
              </div>

              <div className="pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <Skeleton className="h-4 w-28 mb-2 bg-gray-200 dark:bg-gray-700" />
                    <Skeleton className="h-6 w-32 bg-gray-200 dark:bg-gray-700" />
                  </div>

                  <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                    <Skeleton className="h-4 w-28 mb-2 bg-gray-200 dark:bg-gray-700" />
                    <Skeleton className="h-6 w-20 bg-gray-200 dark:bg-gray-700" />
                  </div>

                  <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 sm:col-span-2 lg:col-span-1">
                    <Skeleton className="h-4 w-28 mb-2 bg-gray-200 dark:bg-gray-700" />
                    <Skeleton className="h-5 w-40 bg-gray-200 dark:bg-gray-700" />
                  </div>

                  <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 sm:col-span-2 lg:col-span-1">
                    <Skeleton className="h-4 w-28 mb-2 bg-gray-200 dark:bg-gray-700" />
                    <Skeleton className="h-5 w-24 bg-gray-200 dark:bg-gray-700" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <Skeleton className="h-9 w-full lg:w-32 rounded-md bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-0 sm:mt-10 gap-4 p-2 sm:p-0 pb-10">
          <Skeleton className="h-5 w-40 bg-gray-200 dark:bg-gray-700" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-32 rounded-md bg-gray-200 dark:bg-gray-700" />
            <div className="flex gap-1">
              {Array.from({ length: 3 }).map((_, idx) => (
                <Skeleton
                  key={idx}
                  className="h-10 w-10 rounded-md bg-gray-200 dark:bg-gray-700"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
