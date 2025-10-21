import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ShoppingBag } from "lucide-react";
import Link from "next/link";
import {
  formatCurrency,
  formatJalaliDate,
  formatRelativeTime,
  getStatusBadge,
} from "@/utils/formatters";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GetOrdersResponseProfile } from "@/types/Profile";
import { MotionDiv } from "@/utils/MotionWrapper";

export const RecentOrders = ({
  ordersData,
}: {
  ordersData?: GetOrdersResponseProfile;
}) => {
  return (
    <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-xl rounded-2xl border-none">
      {ordersData?.orders?.length ? (
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm sm:text-xl font-bold text-gray-800 dark:text-white">
            <Clock size={18} />
            آخرین سفارشات
          </CardTitle>
        </CardHeader>
      ) : null}
      <CardContent className="space-y-4 min-h-[100px]">
        {ordersData?.orders?.length ? (
          ordersData?.orders?.slice(0, 3).map((order: any) => (
            <div
              key={order?.id}
              data-testid="order-item"
              className="min-h-[120px] group flex flex-col  items-start sm:items-center justify-between px-4 py-3 bg-gray-100/50 dark:bg-gray-700/50 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="mb-3 sm:mb-0 flex justify-between gap-2 w-full">
                <div className="flex-1 text-sm text-gray-600 dark:text-gray-300 flex flex-col gap-1 w-full">
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
                                className="group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-all duration-300 py-0.5 rounded-full text-gray-800 dark:text-gray-200  text-xs  truncate max-w-[100px]"
                              >
                                {ing?.item?.title}
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
                            ?.map((i: any) => i?.item?.title)
                            .join(", ")}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="flex-1 text-sm text-gray-500 dark:text-gray-400 flex justify-end items-center gap-1">
                  <span className="text-sm text-gray-800 dark:text-gray-200">
                    {formatRelativeTime(order?.payments[0]?.created_at)}
                  </span>
                </div>
              </div>
              <div className="w-full flex justify-between items-center gap-2">
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {getStatusBadge(order?.status)}
                </div>
                <div className="font-medium text-gray-800 dark:text-white text-sm sm:text-base flex items-center gap-1">
                  <span className="text-red-600 dark:text-red-400 font-semibold text-base">
                    {formatCurrency(order?.payment_amount)}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 font-normal text-sm">
                    تومان
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <MotionDiv
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-8 text-center"
          >
            <div className="relative mb-5">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 animate-ping opacity-20" />
              </div>
              <Clock
                className="relative w-16 h-16 text-blue-400/30 dark:text-blue-500/30"
                strokeWidth={1}
              />
              <Clock
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-blue-500/60 dark:text-blue-400/60"
                fill="none"
              />
            </div>

            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              هنوز سفارشی ثبت نکرده‌اید
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs mb-4">
              سفارشات شما اینجا نمایش داده خواهند شد
            </p>

            <MotionDiv whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 rounded-full px-6 shadow-sm flex items-center"
                asChild
              >
                <Link href="/menu">
                  شروع خرید
                  <ShoppingBag className="h-4 w-4 mr-2" />
                </Link>
              </Button>
            </MotionDiv>
          </MotionDiv>
        )}
      </CardContent>
      {ordersData?.orders?.length && (
        <CardFooter>
          <Button
            variant="outline"
            className="w-full text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg text-sm sm:text-base"
            asChild
          >
            <Link href="/profile/orders">مشاهده همه سفارشات</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
