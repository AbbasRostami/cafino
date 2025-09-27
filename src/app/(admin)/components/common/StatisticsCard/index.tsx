"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";

interface StatisticsCardProps {
  title: string;
  icon: LucideIcon;
  value: string | number;
  valueLabel?: string;
  secondaryValue?: string | number;
  secondaryLabel?: string;
  className?: string;
  iconClassName?: string;
  valueClassName?: string;
  secondaryValueClassName?: string;
}

export const StatisticsCard = ({
  title,
  icon: Icon,
  value,
  valueLabel,
  secondaryValue,
  secondaryLabel,
  className = "",
  iconClassName = "",
  valueClassName = "",
  secondaryValueClassName = "",
}: StatisticsCardProps) => {
  const formatValue = (val: string | number) => {
    if (typeof val === "number") {
      return formatCurrency(val);
    }
    return val;
  };

  return (
    <Card
      className={`bg-white/90 dark:bg-gray-900 border-none shadow-lg hover:shadow-xl transition-all duration-500 h-[140px] ${className}`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-bold text-gray-700 dark:text-gray-300">
          {title}
        </CardTitle>
        <Icon
          size={25}
          className={`text-amber-600 dark:text-amber-400 ${iconClassName}`}
        />
      </CardHeader>
      <CardContent className="space-y-1">
        <div className="space-y-1">
          <p className={`text-2xl font-bold space-x-1 ${valueClassName}`}>
            <span>{formatValue(value)}</span>
            {valueLabel && (
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                {valueLabel}
              </span>
            )}
          </p>

          {secondaryValue && secondaryLabel && (
            <p
              className={`text-muted-foreground text-xs space-x-1 ${secondaryValueClassName}`}
            >
              <span> {formatValue(secondaryValue)}</span>
              <span>{secondaryLabel}</span>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
