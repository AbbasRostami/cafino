"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { MotionDiv } from "@/utils/MotionWrapper";

export function AdminTicketChatSkeleton() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-gray-900">
        {[...Array(4)].map((_, i) => (
          <MotionDiv
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
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
              <Skeleton
                className={`h-12 rounded-lg bg-gray-200 dark:bg-gray-700 ${
                  i % 2 === 0 ? "w-3/4 ml-auto" : "w-2/3 mr-auto"
                }`}
              />
              <Skeleton className="h-3 w-20 mt-1 bg-gray-200 dark:bg-gray-700" />
            </div>
          </MotionDiv>
        ))}
      </div>
    </div>
  );
}
