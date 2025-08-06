import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import Link from "next/link";
import moment from "moment-jalaali";
import { getStatusBadge } from "@/utils/formatters";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Order, OrdersResponse } from "@/types/Profile";

export const RecentOrders = ({
  ordersData,
}: {
  ordersData: OrdersResponse;
}) => {
  return (
    <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-xl rounded-2xl border-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-sm sm:text-xl font-bold text-gray-800 dark:text-white">
          <Clock size={18} />
          آخرین سفارش‌ها
        </CardTitle>
        <Badge
          variant="outline"
          className="text-xs border-amber-300 text-amber-600 dark:text-amber-400"
        >
          {ordersData?.data?.length} سفارش
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4 min-h-[100px]">
        {ordersData?.data?.length > 0 ? (
          ordersData?.data?.slice(0, 3).map((order: Order) => (
            <div
              key={order.id}
              className="min-h-[100px] flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-100/50 dark:bg-gray-700/50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="mb-3 sm:mb-0 flex flex-col gap-2 w-full">
                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <span className="text-md text-gray-800 dark:text-gray-400 font-semibold">
                    تاریخ سفارش:
                  </span>
                  <span className="text-sm text-gray-800 dark:text-gray-200">
                    {moment(order.payments[0].created_at).format(
                      "jYYYY/jMM/jDD"
                    )}
                  </span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300 flex flex-col gap-1 w-full">
                  <span className="text-md text-gray-800 dark:text-gray-400 font-semibold">
                    محصولات سفارش:
                  </span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex flex-wrap gap-1 text-xs max-h-[50px] overflow-hidden">
                          {order?.items
                            ?.slice(0, 3)
                            .map((ing: any, i: number) => (
                              <span
                                key={i}
                                className=" py-0.5 rounded-full text-gray-800 dark:text-gray-200  text-xs  truncate max-w-[100px]"
                              >
                                {ing.item.title}
                              </span>
                            ))}

                          {order?.items?.length > 3 && (
                            <span className=" px-2 py-0.5 rounded-full text-xs text-gray-500 dark:text-gray-400">
                              +{order?.items?.length - 3}
                            </span>
                          )}
                        </div>
                      </TooltipTrigger>

                      <TooltipContent>
                        <div className="max-w-[200px] text-xs">
                          {order?.items
                            ?.map((i: any) => i.item.title)
                            .join(", ")}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <div className="text-left sm:text-right flex flex-col gap-2">
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {getStatusBadge(order.status)}
                </div>
                <div className="font-medium text-gray-800 dark:text-white text-sm sm:text-base flex items-center gap-1">
                  {order.payment_amount.toLocaleString("fa-IR")}
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    تومان
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
            سفارشی یافت نشد
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg text-sm sm:text-base"
          asChild
        >
          <Link href="/profile/orders">مشاهده همه سفارش‌ها</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
