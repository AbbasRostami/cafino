import { Skeleton } from "@/components/ui/skeleton";

export const StatisticsSkeleton = ({
  cols = 4,
  rows = 5,
}: {
  cols?: number;
  rows?: number;
}) => (
  <div className={`grid gap-4 sm:grid-cols-2 xl:grid-cols-${cols} mb-4`}>
    {[...Array(rows)].map((_, i) => (
      <div
        key={i}
        className="bg-white/90 dark:bg-gray-900 border-none shadow-lg rounded-lg p-6 h-[140px]"
      >
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="w-6 h-6 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-8 w-32 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-3 w-40 bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    ))}
  </div>
);

export const UsersMetricsSkeleton = () => (
  <div className="bg-white/90 dark:bg-gray-900 border-none shadow-lg rounded-lg p-6 h-[450px]">
    <div className="flex-row items-start space-y-2 pb-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-lg bg-blue-200 dark:bg-blue-800" />
          <div className="space-y-1">
            <Skeleton className="h-5 w-32 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-4 w-48 bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
        <Skeleton className="w-20 h-9 rounded-md bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
    <div className="mt-6">
      <Skeleton className="w-full h-64 rounded-lg bg-blue-100 dark:bg-blue-900/30" />
    </div>
  </div>
);

export const OrderMetricsSkeleton = () => (
  <div className="bg-white/90 dark:bg-gray-900 border-none shadow-lg rounded-lg p-6 h-[450px]">
    <div className="flex items-center justify-between gap-2 leading-none font-bold">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-lg bg-orange-200 dark:bg-orange-800" />
          <div className="space-y-1">
            <Skeleton className="h-5 w-32 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-4 w-48 bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      </div>
    </div>
    <div className="mt-6">
      <Skeleton className="w-full h-64 rounded-lg bg-orange-100 dark:bg-orange-900/30" />
    </div>
  </div>
);

export const RevenueMetricsSkeleton = () => (
  <div className="bg-white/90 dark:bg-gray-900 border-none shadow-lg rounded-lg p-6 h-[450px]">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-lg bg-green-200 dark:bg-green-800" />
        <div className="space-y-1">
          <Skeleton className="h-5 w-24 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-4 w-48 bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
    <div className="mt-6">
      <Skeleton className="w-full h-64 rounded-lg bg-green-100 dark:bg-green-900/30" />
    </div>
  </div>
);

export const ItemsMetricsSkeleton = () => (
  <div className="bg-white/90 dark:bg-gray-900 border-none shadow-lg rounded-lg p-6 h-[450px]">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-lg bg-purple-200 dark:bg-purple-800" />
        <div className="space-y-1">
          <Skeleton className="h-5 w-24 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-4 w-48 bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
    <div className="mt-6">
      <Skeleton className="w-full h-64 rounded-lg bg-purple-100 dark:bg-purple-900/30" />
    </div>
  </div>
);

export const CommentsMetricsSkeleton = () => (
  <div className="bg-white/90 dark:bg-gray-900 border-none shadow-lg rounded-lg p-6 h-[450px]">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-lg bg-indigo-200 dark:bg-indigo-800" />
        <div className="space-y-1">
          <Skeleton className="h-5 w-24 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-4 w-48 bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
    <div className="mt-6">
      <Skeleton className="w-full h-64 rounded-lg bg-indigo-100 dark:bg-indigo-900/30" />
    </div>
  </div>
);

export const LatestCommentsSkeleton = () => (
  <div className="bg-white/90 dark:bg-gray-900 border-none shadow-lg rounded-lg p-6 h-[450px]">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-lg bg-cyan-200 dark:bg-cyan-800" />
        <div className="space-y-1">
          <Skeleton className="h-5 w-24 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-4 w-48 bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
    <div className="mt-6 space-y-4">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <Skeleton className="w-8 h-8 rounded-full bg-cyan-200 dark:bg-cyan-800" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-3 w-full bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-3 w-32 bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const SalesReportSkeleton = () => (
  <div className="bg-white/90 dark:bg-gray-900 backdrop-blur-md shadow-xl rounded-2xl border-none sm:h-[450px]">
    <div className="flex flex-row items-center justify-between pb-4 px-6 pt-6">
      <div className="flex items-center gap-2">
        <Skeleton className="w-5 h-5 bg-amber-200 dark:bg-amber-800" />
        <Skeleton className="h-6 w-32 bg-gray-200 dark:bg-gray-700" />
      </div>
      <Skeleton className="w-40 h-10 bg-gray-200 dark:bg-gray-700 rounded-md" />
    </div>

    <div className="px-6 pb-6 space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="p-4 rounded-xl border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-2">
              <Skeleton className="w-5 h-5 bg-amber-200 dark:bg-amber-800" />
              <Skeleton className="h-3 w-20 bg-gray-200 dark:bg-gray-700" />
            </div>
            <Skeleton className="h-8 w-24 bg-amber-100 dark:bg-amber-900/30 mb-1" />
            <Skeleton className="h-3 w-12 bg-gray-200 dark:bg-gray-700" />
          </div>
        ))}
      </div>

      <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-5 w-24 bg-gray-200 dark:bg-gray-700 mb-2" />
            <Skeleton className="h-4 w-32 bg-gray-200 dark:bg-gray-700" />
          </div>
          <div className="text-right">
            <Skeleton className="h-6 w-20 bg-emerald-200 dark:bg-emerald-800 mb-1" />
            <Skeleton className="h-3 w-16 bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const TicketsChartSkeleton = () => (
  <div className="bg-white/90 dark:bg-gray-900 border-none shadow-lg hover:shadow-xl transition-all duration-500 h-full sm:h-[450px]">
    <div className="flex flex-row items-center justify-between pb-4 px-6 pt-6">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-lg bg-amber-200 dark:bg-amber-800" />
        <div className="space-y-1">
          <Skeleton className="h-5 w-24 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-4 w-32 bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>

    <div className="px-6 pb-6 space-y-6">
      <div className="flex justify-center">
        <Skeleton className="w-64 h-64 rounded-full bg-amber-100 dark:bg-amber-900/30" />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="text-center p-3 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <Skeleton className="h-6 w-8 bg-amber-200 dark:bg-amber-800 mx-auto mb-1" />
            <Skeleton className="h-3 w-12 bg-gray-200 dark:bg-gray-700 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  </div>
);
