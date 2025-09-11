"use client";

import { ShoppingCart } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis } from "recharts";

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
import { OrderOverview } from "@/types/admin";

export function OrderMetrics({ data }: { data?: OrderOverview }) {
  if (!data?.byStatus) return null;

  const chartData = Object.entries(data?.byStatus || {})?.map(
    ([status, value]) => ({
      status,
      count: value ?? 0,
    })
  );

  const chartConfig = {
    pending: {
      label: "درحال پرداخت",
      color: "var(--color-amber-200)",
    },
    processing: {
      label: "در حال پردازش",
      color: "var(--color-amber-300)",
    },
    delivered: {
      label: "تحویل داده شده",
      color: "var(--color-amber-400)",
    },
    refunded: {
      label: "بازگشت وجه",
      color: "var(--color-amber-500)",
    },
    done: {
      label: "تکمیل شده",
      color: "var(--color-amber-600)",
    },
    failed: {
      label: "ناموفق",
      color: "var(--color-amber-700)",
    },
    canceled: {
      label: "لغو شده",
      color: "var(--color-amber-800)",
    },
  } satisfies ChartConfig;

  return (
    <Card className="bg-white/90 dark:bg-gray-900 border-none shadow-lg hover:shadow-xl transition-all duration-500 h-full sm:h-[450px]">
      <CardHeader>
        <CardTitle className="flex items-center justify-between  gap-2 leading-none font-bold">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-amber-400 to-amber-600 shadow-md dark:from-amber-500 dark:to-amber-700">
                <ShoppingCart size={20} />
              </div>
              <div className="space-y-1">
                <CardTitle className="text-medium font-semibold text-gray-800 dark:text-white">
                  مجموع سفارشات
                </CardTitle>
                <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                  {data?.active} سفارش فعال – {data?.today} سفارش امروز
                </CardDescription>
              </div>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="status"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label ?? value
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" radius={8}>
              {chartData?.map((entry, index) => {
                const cfg =
                  chartConfig[entry?.status as keyof typeof chartConfig];
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={cfg?.color ?? "var(--chart-1)"}
                  />
                );
              })}
              <LabelList
                dataKey="count"
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
