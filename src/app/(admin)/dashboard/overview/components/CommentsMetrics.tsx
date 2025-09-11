import {
  CheckCircle2,
  MessageSquare,
  MessageSquareX,
  XCircle,
  TrendingUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CommentOverview } from "@/types/admin";
import { MotionDiv } from "@/utils/MotionWrapper";

export function CommentsMetrics({ data }: { data?: CommentOverview }) {
  const approvalRate =
    data?.total && data?.accepted && data?.total > 0
      ? Math.round((data?.accepted / data?.total) * 100)
      : 0;

  return (
    <Card className="gap-6 py-6 bg-white/90 dark:bg-gray-900 border-none shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden h-full sm:h-[450px]">
      <CardHeader className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative p-2 rounded-lg bg-gradient-to-r from-amber-400 to-amber-600 shadow-lg dark:from-amber-500 dark:to-amber-700">
              <MessageSquare size={22} />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-medium font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                نمای کلی کامنت ها
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                آمار کلی کامنت ها و کامنت های تایید شده
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-6 py-6 space-y-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <MotionDiv
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="relative bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/30 p-5 rounded-2xl border border-blue-200/70 dark:border-blue-700/40 text-center shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group/card"
          >
            <div className="relative">
              <div className="p-2 bg-gradient-to-br from-blue-300 to-blue-500 dark:from-blue-700 dark:to-blue-900 rounded-2xl w-12 h-12 mx-auto mb-3 flex items-center justify-center shadow-md">
                <MessageSquareX className="h-6 w-6 text-white" />
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-1 font-medium">
                کل کامنت‌ها
              </p>
              <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                {data?.total || 0}
              </p>
            </div>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="relative bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/40 dark:to-emerald-800/30 p-5 rounded-2xl border border-emerald-200/70 dark:border-emerald-700/40 text-center shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group/card"
          >
            <div className="relative">
              <div className="p-2 bg-gradient-to-br from-emerald-300 to-emerald-500 dark:from-emerald-700 dark:to-emerald-900 rounded-2xl w-12 h-12 mx-auto mb-3 flex items-center justify-center shadow-md">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
              <p className="text-sm text-emerald-700 dark:text-emerald-300 mb-1 font-medium">
                تایید شده
              </p>
              <p className="text-2xl font-bold text-emerald-800 dark:text-emerald-200">
                {data?.accepted || 0}
              </p>
            </div>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="relative bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-900/40 dark:to-rose-800/30 p-5 rounded-2xl border border-rose-200/70 dark:border-rose-700/40 text-center shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group/card"
          >
            <div className="relative">
              <div className="p-2 bg-gradient-to-br from-rose-300 to-rose-500 dark:from-rose-700 dark:to-rose-900 rounded-2xl w-12 h-12 mx-auto mb-3 flex items-center justify-center shadow-md">
                <XCircle className="h-6 w-6 text-white" />
              </div>
              <p className="text-sm text-rose-700 dark:text-rose-300 mb-1 font-medium">
                رد شده
              </p>
              <p className="text-2xl font-bold text-rose-800 dark:text-rose-200">
                {data?.unaccepted || 0}
              </p>
            </div>
          </MotionDiv>
        </div>

        <MotionDiv
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-700/40 p-5 rounded-2xl border border-slate-200/70 dark:border-slate-700/40 shadow-sm overflow-hidden"
        >
          <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-amber-300/10 rounded-full blur-xl"></div>
          <div className="relative">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                نرخ تایید کامنت‌ها
                <TrendingUp
                  size={14}
                  className="text-amber-600 dark:text-amber-400"
                />
              </span>
              <span className="text-lg font-bold bg-gradient-to-r from-amber-600 to-amber-800 dark:from-amber-400 dark:to-amber-300 bg-clip-text text-transparent">
                {approvalRate}%
              </span>
            </div>

            <div className="relative h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <MotionDiv
                initial={{ width: 0 }}
                animate={{ width: `${approvalRate}%` }}
                transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full shadow-md"
              />
            </div>

            <div className="flex justify-between items-center mt-2 text-xs text-slate-500 dark:text-slate-400">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </MotionDiv>
      </CardContent>
    </Card>
  );
}
