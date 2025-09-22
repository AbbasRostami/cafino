import { StatisticsDataProps } from "@/types/admin";
import { StatisticsCard } from "../../../components/common/StatisticsCard";
import {
  BanknoteArrowDown,
  MessagesSquare,
  ShoppingCart,
  Ticket,
  Users,
} from "lucide-react";

export const Statistics = ({ data }: StatisticsDataProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      <StatisticsCard
        title="درآمد خالص"
        icon={BanknoteArrowDown}
        value={data?.grossSales || 0}
        valueLabel="تومان"
        secondaryValue={data?.netRevenue || 0}
        secondaryLabel="پس از کسر تخفیف‌ها"
      />

      <StatisticsCard
        title="تعداد کل کاربران"
        icon={Users}
        value={data?.totalUsers || 0}
        secondaryValue={data?.newUsersThisMonth || 0}
        secondaryLabel="کاربران جدید در ماه"
      />

      <StatisticsCard
        title="تعداد کل سفارشات"
        icon={ShoppingCart}
        value={data?.totalOrder || 0}
        secondaryValue={data?.activeOrder || 0}
        secondaryLabel="تعداد سفارشات فعال"
      />

      <StatisticsCard
        title="تعداد کل کامنت ها"
        icon={MessagesSquare}
        value={data?.totalComments || 0}
        secondaryValue={data?.acceptedComments || 0}
        secondaryLabel="کامنت قبول شده"
      />

      <StatisticsCard
        title="تعداد کل تیکت ها"
        icon={Ticket}
        value={data?.totalTickets || 0}
        secondaryValue={data?.openTickets || 0}
        secondaryLabel="تیکت های پاسخ داده نشده"
        className="sm:col-span-2 lg:col-span-1"
      />
    </div>
  );
};
