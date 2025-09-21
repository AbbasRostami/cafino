"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { MotionDiv } from "@/utils/MotionWrapper";

export function TicketListSkeleton() {
  return (
    <div className="space-y-6 bg-white dark:bg-gray-900 rounded-2xl p-6">
      <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-32 rounded-md bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-10 w-32 rounded-md bg-gray-200 dark:bg-gray-700" />
        </div>
        <Skeleton className="h-10 w-24 rounded-md bg-gray-200 dark:bg-gray-700" />
      </div>

      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <MotionDiv
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="p-4 border border-gray-300 dark:border-gray-600 rounded-xl"
          >
            <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <Skeleton className="h-5 w-48 mb-2 bg-gray-200 dark:bg-gray-700" />
                <div className="flex items-center gap-4">
                  <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-700" />
                </div>
              </div>
              <div className="w-full sm:w-auto flex justify-end sm:justify-start">
                <Skeleton className="h-6 w-20 rounded-full bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>
          </MotionDiv>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-center mt-5 gap-4 p-2 sm:p-4 pb-8">
        <Skeleton className="h-4 w-32 bg-gray-200 dark:bg-gray-700" />
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Skeleton className="h-10 w-24 rounded-md bg-gray-200 dark:bg-gray-700" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-10 rounded-md bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-10 w-10 rounded-md bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-10 w-10 rounded-md bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-10 w-10 rounded-md bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function TicketChatSkeleton() {
  return (
    <div className="flex flex-col h-full lg:h-[calc(100vh-120px)] bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center gap-3">
          <Skeleton className="w-8 h-8 rounded-md bg-gray-200 dark:bg-gray-700" />
          <div>
            <Skeleton className="h-6 w-48 mb-2 bg-gray-200 dark:bg-gray-700" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-20 rounded-full bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 max-h-[100vh] overflow-y-auto scrollbar-hide p-4 space-y-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`flex gap-3 ${
              i % 2 === 0 ? "flex-row" : "flex-row-reverse"
            }`}
          >
            <div className="hidden sm:flex-shrink-0">
              <Skeleton className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
            </div>
            <div
              className={`flex-1 max-w-xs sm:max-w-md ${
                i % 2 === 0 ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`flex items-center gap-2 mb-1 ${
                  i % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <Skeleton className="h-4 w-16 bg-gray-200 dark:bg-gray-700" />
                {i % 3 === 0 && (
                  <Skeleton className="h-3 w-3 rounded-full bg-gray-200 dark:bg-gray-700" />
                )}
              </div>
              <Skeleton
                className={`h-12 rounded-lg bg-gray-200 dark:bg-gray-700 ${
                  i % 2 === 0 ? "w-3/4 ml-auto" : "w-2/3 mr-auto"
                }`}
              />
              <Skeleton className="h-3 w-20 mt-1 bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <Skeleton className="h-10 w-full rounded-md bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-3 w-48 mt-2 bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
}
