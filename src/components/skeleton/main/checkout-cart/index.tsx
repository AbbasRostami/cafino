"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function CheckoutSkeleton() {
  return (
    <div className="min-h-screen pt-36 py-8 px-4 relative">
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-[10%] right-[15%] w-96 h-96 bg-amber-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-[15%] left-[20%] w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/3 right-1/2 w-64 h-64 bg-amber-300/15 rounded-full blur-2xl animate-pulse-slow animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] dark:bg-[url('/grid-dark.svg')] opacity-[0.03] dark:opacity-[0.05]"></div>
      </div>

      <div className="container mx-auto px-2 md:px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-10 border-b-4 border-amber-400 dark:border-amber-700 pb-4 px-2 sm:px-4">
          <Skeleton className="h-10 w-32 rounded-xl bg-gray-200 dark:bg-gray-800" />
          <Skeleton className="h-10 w-48 rounded-xl bg-gray-200 dark:bg-gray-800" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-24 rounded-xl bg-gray-200 dark:bg-gray-800" />
            <Skeleton className="h-10 w-20 rounded-xl bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="lg:hidden">
              <div className="rounded-2xl shadow-xl border border-amber-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/80 backdrop-blur-lg p-6 space-y-4">
                <Skeleton className="h-6 w-40 bg-gray-200 dark:bg-gray-800" />
                <Skeleton className="h-20 w-full rounded-lg bg-gray-200 dark:bg-gray-800" />
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800" />
                    <Skeleton className="h-4 w-1/4 bg-gray-200 dark:bg-gray-800" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800" />
                    <Skeleton className="h-4 w-1/4 bg-gray-200 dark:bg-gray-800" />
                  </div>
                  <Separator className="my-2 bg-amber-200 dark:bg-amber-800" />
                  <div className="flex justify-between">
                    <Skeleton className="h-5 w-1/3 bg-gray-200 dark:bg-gray-800" />
                    <Skeleton className="h-5 w-1/3 bg-gray-200 dark:bg-gray-800" />
                  </div>
                  <Skeleton className="h-12 w-full rounded-xl bg-gray-200 dark:bg-gray-800" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-amber-200 dark:border-gray-800 p-6 space-y-4">
              <Skeleton className="h-6 w-32 bg-gray-200 dark:bg-gray-800" />
              <Skeleton className="h-20 w-full rounded-lg bg-gray-200 dark:bg-gray-800" />
              <Skeleton className="h-10 w-32 rounded-lg bg-gray-200 dark:bg-gray-800" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-32 bg-gray-200 dark:bg-gray-800" />
              <div className="flex-1 rounded-2xl h-0.5 bg-gradient-to-r from-amber-700 to-transparent"></div>
            </div>

            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-amber-200 dark:border-gray-800 p-4 space-y-4"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <Skeleton className="w-full sm:w-1/3 h-44 rounded-xl bg-gray-200 dark:bg-gray-800" />
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

            <div className="rounded-2xl border border-amber-200 dark:border-gray-800 p-4 space-y-4">
              <Skeleton className="h-5 w-32 bg-gray-200 dark:bg-gray-800" />
              <div className="flex gap-4">
                <Skeleton className="flex-1 h-10 rounded-md bg-gray-200 dark:bg-gray-800" />
                <Skeleton className="w-24 h-10 rounded-md bg-gray-200 dark:bg-gray-800" />
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-24 max-w-sm rounded-2xl shadow-xl border border-amber-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/80 backdrop-blur-lg p-6 space-y-4">
              <Skeleton className="h-6 w-40 bg-gray-200 dark:bg-gray-800" />
              <Skeleton className="h-20 w-full rounded-lg bg-gray-200 dark:bg-gray-800" />
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800" />
                  <Skeleton className="h-4 w-1/4 bg-gray-200 dark:bg-gray-800" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800" />
                  <Skeleton className="h-4 w-1/4 bg-gray-200 dark:bg-gray-800" />
                </div>
                <Separator className="my-2 bg-amber-200 dark:bg-amber-800" />
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-1/3 bg-gray-200 dark:bg-gray-800" />
                  <Skeleton className="h-5 w-1/3 bg-gray-200 dark:bg-gray-800" />
                </div>
                <Skeleton className="h-12 w-full rounded-xl bg-gray-200 dark:bg-gray-800" />
              </div>
            </div>
          </div>
        </div>

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
