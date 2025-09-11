import { Star, Calendar, MessagesSquare } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatJalaliDate } from "@/utils/formatters";
import { CommentOverview } from "@/types/admin";
import { MotionDiv } from "@/utils/MotionWrapper";

export function LastestComments({ data }: { data?: CommentOverview }) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className="border-none rounded-3xl overflow-hidden shadow-xl backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 transition-all hover:shadow-xl h-full sm:h-[450px]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-amber-400 to-amber-600 shadow-md dark:from-amber-500 dark:to-amber-700">
                <MessagesSquare size={20} />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-gray-800 dark:text-white">
                  وضعیت کامنت ها
                </CardTitle>
                <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                  آخرین کامنت‌های تایید نشده
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-6 ">
          <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
            {data?.latestUnacceptedComments?.map((comment, index) => (
              <MotionDiv
                key={comment?.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.12 }}
                whileHover={{
                  scale: 1.02,
                  y: -4,
                }}
                className="relative flex flex-col justify-between p-4 rounded-2xl bg-white/80 dark:bg-gray-800/70 backdrop-blur-md shadow-md border border-amber-100/40 dark:border-amber-800/40 transition-all duration-300"
              >
                <p className="text-medium font-medium text-gray-700 dark:text-gray-200 line-clamp-3 mb-3">
                  {comment?.text}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200/40 dark:border-gray-700/40">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-amber-500" />
                    <span className="text-sm font-normal">
                      {formatJalaliDate(comment?.created_at)}
                    </span>
                  </div>

                  {comment?.star && (
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="h-3.5 w-3.5" fill="currentColor" />
                      <span className="text-sm font-semibold">
                        {comment?.star}
                      </span>
                    </div>
                  )}
                </div>
              </MotionDiv>
            ))}
          </div>
        </CardContent>
      </Card>
    </MotionDiv>
  );
}
