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
          <Skeleton className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700" />
          <div className="space-y-1">
            <Skeleton className="h-5 w-32 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-4 w-48 bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
        <Skeleton className="w-20 h-9 rounded-md bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
    <div className="mt-6">
      <Skeleton className="w-full h-64 rounded-lg bg-gray-200 dark:bg-gray-700" />
    </div>
  </div>
);

export const OrderMetricsSkeleton = () => (
  <div className="bg-white/90 dark:bg-gray-900 border-none shadow-lg rounded-lg p-6 h-[450px]">
    <div className="flex items-center justify-between gap-2 leading-none font-bold">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700" />
          <div className="space-y-1">
            <Skeleton className="h-5 w-32 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-4 w-48 bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      </div>
    </div>
    <div className="mt-6">
      <Skeleton className="w-full h-64 rounded-lg bg-gray-200 dark:bg-gray-700" />
    </div>
  </div>
);

export const RevenueMetricsSkeleton = () => (
  <div className="bg-white/90 dark:bg-gray-900 border-none shadow-lg rounded-lg p-6 h-[450px]">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div className="space-y-1">
          <Skeleton className="h-5 w-24 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-4 w-48 bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
    <div className="mt-6">
      <Skeleton className="w-full h-64 rounded-lg bg-gray-200 dark:bg-gray-700" />
    </div>
  </div>
);

export const ItemsMetricsSkeleton = () => (
  <div className="bg-white/90 dark:bg-gray-900 border-none shadow-lg rounded-lg p-6 h-[450px]">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div className="space-y-1">
          <Skeleton className="h-5 w-24 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-4 w-48 bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
    <div className="mt-6">
      <Skeleton className="w-full h-64 rounded-lg bg-gray-200 dark:bg-gray-700" />
    </div>
  </div>
);

export const CommentsMetricsSkeleton = () => (
  <div className="bg-white/90 dark:bg-gray-900 border-none shadow-lg rounded-lg p-6 h-[450px]">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700" />
        <div className="space-y-1">
          <Skeleton className="h-5 w-24 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-4 w-48 bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
    <div className="mt-6">
      <Skeleton className="w-full h-64 rounded-lg bg-gray-200 dark:bg-gray-700" />
    </div>
  </div>
);

export const LatestCommentsSkeleton = () => (
  <div className="bg-white/90 dark:bg-gray-900 border-none shadow-lg rounded-lg p-6 h-[450px]">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700" />
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
          <Skeleton className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
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
