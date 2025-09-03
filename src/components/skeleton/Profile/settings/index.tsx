"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function ProfileSkeleton() {
  return (
    <Card className="rounded-xl p-4 shadow-sm space-y-6 animate-pulse">
      <div className="flex justify-center">
        <Skeleton className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700" />
      </div>

      <Skeleton className="h-4 w-1/3 mx-auto" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-5 mt-4">
        {Array.from({ length: 9 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-24 rounded-xl bg-gray-200 dark:bg-gray-700"
          />
        ))}
      </div>

      <div className="flex justify-center mt-4 px-4">
        <Skeleton className="h-10 w-full rounded-md bg-gray-200 dark:bg-gray-700" />
      </div>
    </Card>
  );
}
