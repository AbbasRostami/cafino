"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

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
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserOverview } from "@/types/admin";
import { UserCog } from "lucide-react";

const chartConfig = {
  total: {
    label: "کل کاربران",
    color: "var(--color-amber-600)",
  },
  blockedUsers: {
    label: "مسدود شده",
    color: "var(--color-amber-500)",
  },
  newUsersThisWeek: {
    label: "این هفته",
    color: "var(--color-amber-400)",
  },
  newUsersThisMonth: {
    label: "این ماه",
    color: "var(--color-amber-300)",
  },
  monthlyActiveUsers: {
    label: "فعال ماهانه",
    color: "var(--color-amber-200)",
  },
} satisfies ChartConfig;

export function UsersMetrics({ data }: { data?: UserOverview }) {
  const id = "users-metrics";

  const chartData = [
    { key: "total", value: data?.total, fill: "var(--color-amber-600)" },
    {
      key: "blockedUsers",
      value: data?.blockedUsers,
      fill: "var(--color-amber-500)",
    },
    {
      key: "newUsersThisWeek",
      value: data?.newUsersThisWeek,
      fill: "var(--color-amber-400)",
    },
    {
      key: "newUsersThisMonth",
      value: data?.newUsersThisMonth,
      fill: "var(--color-amber-300)",
    },
    {
      key: "monthlyActiveUsers",
      value: data?.monthlyActiveUsers,
      fill: "var(--color-amber-200)",
    },
  ];

  const [activeKey, setActiveKey] = React.useState(chartData[0].key);

  const activeIndex = React.useMemo(
    () => chartData?.findIndex((item) => item?.key === activeKey),
    [activeKey, chartData]
  );

  return (
    <Card
      data-chart={id}
      className="flex flex-col bg-white/90 dark:bg-gray-900 border-none shadow-lg hover:shadow-xl transition-all duration-500 h-full sm:h-[450px]"
    >
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-2 pb-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-amber-400 to-amber-600 shadow-md dark:from-amber-500 dark:to-amber-700">
              <UserCog size={20} />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-medium font-semibold text-gray-800 dark:text-white">
                نمای کلی کاربران
              </CardTitle>
              <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                جزئیات کامل تمام کاربران
              </CardDescription>
            </div>
          </div>
        </div>
        <Select value={activeKey} onValueChange={setActiveKey}>
          <SelectTrigger
            className="ml-auto h-7 w-[180px] rounded-lg pl-2.5"
            aria-label="Select a metric"
          >
            <SelectValue placeholder="انتخاب معیار" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl ">
            {chartData?.map((item) => {
              const config = chartConfig[item?.key as keyof typeof chartConfig];
              return (
                <SelectItem key={item?.key} value={item?.key}>
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-xs"
                      style={{ backgroundColor: config?.color }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0 ">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData?.length > 0 ? chartData : []}
              dataKey="value"
              nameKey="key"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {chartData[activeIndex]?.value}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 20}
                          className="fill-muted-foreground text-sm"
                        >
                          {
                            chartConfig[activeKey as keyof typeof chartConfig]
                              ?.label
                          }
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
