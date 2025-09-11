"use client";

import { ChartNoAxesCombined, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { RevenueOverview } from "@/types/admin";
import { formatCurrency } from "@/utils/formatters";

export const description = "Revenue bar chart";

export function RevenueMetrics({ revenue }: { revenue?: RevenueOverview }) {
  const chartData = [
    {
      name: "امروز",
      grossSales: revenue?.today?.grossSales,
      discounts: revenue?.today?.discounts,
      netRevenue: revenue?.today?.netRevenue,
    },
    {
      name: "این هفته",
      grossSales: revenue?.thisWeek?.grossSales,
      discounts: revenue?.thisWeek?.discounts,
      netRevenue: revenue?.thisWeek?.netRevenue,
    },
    {
      name: "این ماه",
      grossSales: revenue?.thisMonth?.grossSales,
      discounts: revenue?.thisMonth?.discounts,
      netRevenue: revenue?.thisMonth?.netRevenue,
    },
    {
      name: "کل",
      grossSales: revenue?.total?.grossSales,
      discounts: revenue?.total?.discounts,
      netRevenue: revenue?.total?.netRevenue,
    },
  ];

  const chartConfig = {
    grossSales: {
      label: "فروش ناخالص",
      color: "var(--color-amber-400)",
    },
    discounts: {
      label: "تخفیف‌ها",
      color: "var(--color-amber-600)",
    },
    netRevenue: {
      label: "درآمد خالص",
      color: "var(--color-amber-800)",
    },
  } satisfies ChartConfig;

  return (
    <Card className="bg-white/90 dark:bg-gray-900 border-none shadow-lg hover:shadow-xl transition-all duration-500 h-full sm:h-[450px]">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-amber-400 to-amber-600 shadow-md dark:from-amber-500 dark:to-amber-700">
                <ChartNoAxesCombined size={20} />
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
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[280px]">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey="grossSales"
              fill="var(--color-grossSales)"
              radius={4}
            />
            <Bar dataKey="discounts" fill="var(--color-discounts)" radius={4} />
            <Bar
              dataKey="netRevenue"
              fill="var(--color-netRevenue)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 text-sm w-full">
        <div className="flex flex-col sm:flex-row gap-2 w-full items-center justify-between">
          <span className="text-green-600 dark:text-green-400 text-base font-semibold">
            میانگین ارزش سفارش‌ها:
          </span>

          <div className="flex items-center gap-1 text-green-600 dark:text-green-400 font-bold">
            <span>
              {formatCurrency(Math.round(revenue?.averageOrderValue || 0))}
            </span>
            <span className="text-xs font-normal">تومان</span>
            <TrendingUp className="h-4 w-4" />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
