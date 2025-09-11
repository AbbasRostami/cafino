import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatisticsDataProps } from "@/types/admin";
import { formatCurrency } from "@/utils/formatters";
import {
  BanknoteArrowDown,
  MessagesSquare,
  ShoppingCart,
  Users,
} from "lucide-react";

export const Statistics = ({ data }: StatisticsDataProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Card className="bg-white/90 dark:bg-gray-900 border-none shadow-lg hover:shadow-xl transition-all duration-500 h-[140px]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-bold">درآمد خالص</CardTitle>
          <BanknoteArrowDown size={25} />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold space-x-2">
            {formatCurrency(data?.grossSales)}
            <span> تومان</span>
          </p>
          <p className="text-muted-foreground text-xs space-x-2">
            {formatCurrency(data?.netRevenue)}
            <span> پس از کسر تخفیف‌ها</span>
          </p>
        </CardContent>
      </Card>
      <Card className="bg-white/90 dark:bg-gray-900 border-none shadow-lg hover:shadow-xl transition-all duration-500 h-[140px]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-bold">تعداد کل کاربران</CardTitle>
          <Users size={25} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data?.totalUsers}</div>
          <p className="text-muted-foreground text-xs space-x-2">
            {data?.newUsersThisMonth}
            <span> کاربران جدید در ماه</span>
          </p>
        </CardContent>
      </Card>
      <Card className="bg-white/90 dark:bg-gray-900 border-none shadow-lg hover:shadow-xl transition-all duration-500 h-[140px]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-bold">تعداد کل سفارشات</CardTitle>
          <ShoppingCart size={25} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data?.totalOrder}</div>
          <p className="text-muted-foreground text-xs space-x-2">
            {data?.activeOrder}
            <span> تعداد سفارشات فعال</span>
          </p>
        </CardContent>
      </Card>
      <Card className="bg-white/90 dark:bg-gray-900 border-none shadow-lg hover:shadow-xl transition-all duration-500 h-[140px]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-bold">تعداد کل کامنت ها</CardTitle>
          <MessagesSquare size={25} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data?.totalComments}</div>
          <p className="text-muted-foreground text-xs space-x-2">
            {data?.acceptedComments}
            <span> کامنت قبول شده</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
