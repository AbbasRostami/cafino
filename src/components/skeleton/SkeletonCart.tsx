"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function SkeletonCart() {
  return (
    <div className="min-h-screen pt-36 py-8 px-4">
      <div className="container mx-auto px-2 md:px-8 lg:px-28">
        {/* Header Skeleton */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-10 border-b pb-4">
          <Skeleton className="h-10 w-32 rounded-xl bg-gray-200 dark:bg-gray-800" />
          <Skeleton className="h-10 w-48 rounded-xl bg-gray-200 dark:bg-gray-800" />
          <Skeleton className="h-10 w-24 rounded-xl bg-gray-200 dark:bg-gray-800" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side Items */}
          <div className="lg:col-span-2 space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-2xl border p-4 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Skeleton className="w-full sm:w-1/3 h-44 rounded-xl" />
                  <div className="flex-1 space-y-3">
                    <Skeleton className="h-6 w-3/4 bg-gray-200 dark:bg-gray-800" />
                    <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-800" />
                    <Skeleton className="h-6 w-1/3 bg-gray-200 dark:bg-gray-800" />
                    <div className="flex gap-2">
                      <Skeleton className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-800" />
                      <Skeleton className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-800" />
                      <Skeleton className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-800" />

                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Discount Code Skeleton */}
            <div className="border rounded-2xl p-4 space-y-4">
              <Skeleton className="h-5 w-32 bg-gray-200 dark:bg-gray-800" />
              <div className="flex gap-4">
                <Skeleton className="flex-1 h-10 rounded-md bg-gray-200 dark:bg-gray-800" />
                <Skeleton className="w-24 h-10 rounded-md bg-gray-200 dark:bg-gray-800" />
              </div>
            </div>
          </div>

          {/* Sidebar Summary Skeleton (Desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-24 max-w-sm rounded-2xl shadow-xl border p-6 space-y-4">
              <Skeleton className="h-6 w-40 bg-gray-200 dark:bg-gray-800" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800" />
                <Skeleton className="h-4 w-1/4 bg-gray-200 dark:bg-gray-800" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800" />
                <Skeleton className="h-4 w-1/4 bg-gray-200 dark:bg-gray-800" />
              </div>
              <Separator />
              <div className="flex justify-between">
                <Skeleton className="h-5 w-1/3 bg-gray-200 dark:bg-gray-800" />
                <Skeleton className="h-5 w-1/3 bg-gray-200 dark:bg-gray-800" />
              </div>
              <Skeleton className="h-12 w-full rounded-xl bg-gray-200 dark:bg-gray-800" />
            </div>
          </div>
        </div>

        {/* Mobile Summary Skeleton */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-2xl z-50">
          <div className="p-4 flex justify-between items-center">
            <div>
                <Skeleton className="h-4 w-24 mb-2 bg-gray-200 dark:bg-gray-800" />
              <Skeleton className="h-6 w-40 bg-gray-200 dark:bg-gray-800" />
            </div>
            <Skeleton className="h-10 w-28 rounded-md bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>
      </div>
    </div>
  );
}
