"use client";

import { TicketCheck } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface TicketsChartProps {
  data?: {
    total: number;
    open: number;
    closed: number;
    answered: number;
  };
  className?: string;
}

const chartConfig = {
  count: {
    label: "تعداد",
  },
  open: {
    label: "باز",
    color: "var(--chart-1)",
  },
  answered: {
    label: "پاسخ داده شده",
    color: "var(--chart-2)",
  },
  closed: {
    label: "بسته شده",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export const TicketsChart = ({ data, className }: TicketsChartProps) => {
  if (!data) return null;

  const chartData = [
    {
      status: "total",
      count: data?.total,
      fill: "var(--color-amber-400)",
    },
    {
      status: "open",
      count: data?.open,
      fill: "var(--color-amber-500)",
    },
    {
      status: "answered",
      count: data?.answered,
      fill: "var(--color-amber-600)",
    },
    {
      status: "closed",
      count: data?.closed,
      fill: "var(--color-amber-700)",
    },
  ];

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "total":
        return "تعداد";
      case "open":
        return "باز";
      case "answered":
        return "پاسخ داده شده";
      case "closed":
        return "بسته شده";
      default:
        return status;
    }
  };

  return (
    <Card
      className={`${className}bg-white/90 dark:bg-gray-900 border-none shadow-lg hover:shadow-xl transition-all duration-500 h-full sm:h-[450px]`}
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-amber-400 to-amber-600 shadow-md dark:from-amber-500 dark:to-amber-700">
            <TicketCheck size={20} />
          </div>
          <div>
            <CardTitle className="text-lg font-bold text-gray-800 dark:text-white">
              آمار تیکت‌ها
            </CardTitle>
            <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
              وضعیت تیکت‌های پشتیبانی
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[230px] "
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="count"
              label={({ status, count }) =>
                `${getStatusLabel(status)}: ${count}`
              }
              nameKey="status"
            />
          </PieChart>
        </ChartContainer>

        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="text-lg font-bold text-blue-400 dark:text-blue-400">
              {data?.total}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              تعداد کلی
            </div>
          </div>
          <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
            <div className="text-lg font-bold text-red-600 dark:text-red-400">
              {data?.open}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">باز</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
              {data?.answered}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              پاسخ داده شده
            </div>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="text-lg font-bold text-green-600 dark:text-green-400">
              {data?.closed}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              بسته شده
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
