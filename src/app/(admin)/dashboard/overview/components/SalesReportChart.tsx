"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, TrendingUp, DollarSign, Percent } from "lucide-react";
import { useSalesReport } from "@/services/overview/useSalesReport";
import { formatCurrency } from "@/utils/formatters";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SalesReportChartProps {
  className?: string;
}

const dateRanges = [
  {
    label: "هفته گذشته",
    value: "last-week",
    getDates: () => {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 7);
      return {
        start: start.toISOString().split("T")[0],
        end: end.toISOString().split("T")[0],
      };
    },
  },
  {
    label: "ماه گذشته",
    value: "last-month",
    getDates: () => {
      const end = new Date();
      const start = new Date();
      start.setMonth(end.getMonth() - 1);
      return {
        start: start.toISOString().split("T")[0],
        end: end.toISOString().split("T")[0],
      };
    },
  },
  {
    label: "3 ماه گذشته",
    value: "last-3-months",
    getDates: () => {
      const end = new Date();
      const start = new Date();
      start.setMonth(end.getMonth() - 3);
      return {
        start: start.toISOString().split("T")[0],
        end: end.toISOString().split("T")[0],
      };
    },
  },
  {
    label: "6 ماه گذشته",
    value: "last-6-months",
    getDates: () => {
      const end = new Date();
      const start = new Date();
      start.setMonth(end.getMonth() - 6);
      return {
        start: start.toISOString().split("T")[0],
        end: end.toISOString().split("T")[0],
      };
    },
  },
  {
    label: "سال گذشته",
    value: "last-year",
    getDates: () => {
      const end = new Date();
      const start = new Date();
      start.setFullYear(end.getFullYear() - 1);
      return {
        start: start.toISOString().split("T")[0],
        end: end.toISOString().split("T")[0],
      };
    },
  },
];

export const SalesReportChart = ({ className }: SalesReportChartProps) => {
  const [selectedRange, setSelectedRange] = useState("last-month");

  const dateRange = useMemo(() => {
    const range = dateRanges.find((r) => r.value === selectedRange);
    return range ? range.getDates() : dateRanges[1].getDates();
  }, [selectedRange]);

  const { data, error } = useSalesReport(dateRange);

  const metrics = [
    {
      title: "فروش ناخالص",
      value: data?.grossSales || 0,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-800",
    },
    {
      title: "تخفیفات",
      value: data?.discounts || 0,
      icon: Percent,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      borderColor: "border-orange-200 dark:border-orange-800",
    },
    {
      title: "درآمد خالص",
      value: data?.netRevenue || 0,
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800",
    },
  ];

  if (error) {
    return (
      <Card className={`${className} border-red-200 dark:border-red-800`}>
        <CardContent className="p-6">
          <div className="text-center text-red-600 dark:text-red-400">
            خطا در بارگذاری گزارش فروش
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={`${className} bg-white/90 dark:bg-gray-900 border-none shadow-lg hover:shadow-xl transition-all duration-500 h-full sm:h-[450px]`}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-amber-400 to-amber-600 shadow-md dark:from-amber-500 dark:to-amber-700">
                <Calendar size={20} />
              </div>
              <div className="space-y-1">
                <CardTitle className="text-medium font-semibold text-gray-800 dark:text-white">
                  آمار درآمد
                </CardTitle>
                <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                  مقایسه درآمد ناخالص، تخفیف‌ها و درآمد خالص
                </CardDescription>
              </div>
            </div>
          </div>
        </CardTitle>
        <Select value={selectedRange} onValueChange={setSelectedRange}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {dateRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="p-6 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {metrics?.map((metric) => {
            const Icon = metric?.icon;
            return (
              <div
                key={metric?.title}
                className={`group p-5 rounded-xl border ${metric?.bgColor} ${metric?.borderColor} transition-all duration-300 hover:shadow-lg hover:scale-[1.02]`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`p-2 rounded-lg ${metric?.bgColor} ${metric?.borderColor} border`}
                  >
                    <Icon className={`w-5 h-5 ${metric?.color}`} />
                  </div>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-200">
                    {metric?.title}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className={`text-2xl font-bold ${metric?.color}`}>
                    {formatCurrency(metric?.value)}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-200">
                    تومان
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {data && (
          <div className="mt-6 p-5 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">
                    خلاصه عملکرد
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {dateRanges?.find((r) => r.value === selectedRange)?.label}
                  </p>
                </div>
              </div>
              <div className="text-center sm:text-right">
                <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(data?.netRevenue)}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-200">
                  درآمد خالص
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
