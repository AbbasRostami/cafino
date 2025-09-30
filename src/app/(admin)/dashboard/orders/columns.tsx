"use client";

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MapPin, ShoppingCart } from "lucide-react";
import {
  getStatusBadge,
  formatCurrency,
  formatJalaliDate,
} from "@/utils/formatters";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import OrderDetails from "./Details";
import { OrderAdmin, OrderColumnsProps } from "@/types/admin";
import { OrderStatus } from "@/types";

export const columns = ({
  currentPage,
  currentLimit,
  orders,
  setSelectedOrder,
  changeStatus,
  isChangingStatus,
  changeVars,
}: OrderColumnsProps) =>
  useMemo<ColumnDef<OrderAdmin>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ردیف",
        cell: (info) => (currentPage - 1) * currentLimit + info?.row?.index + 1,
        enableSorting: false,
      },
      {
        accessorKey: "user",
        header: "کاربر",
        cell: (info) => {
          const user = info.getValue() as any;
          return (
            <div className="flex items-center gap-2">
              <span className="text-gray-800 dark:text-gray-200">
                {user?.first_name + " " + user?.last_name || "نامشخص"}
              </span>
            </div>
          );
        },
        enableSorting: true,
      },
      {
        accessorKey: "user.phone",
        header: "شماره تماس",
        cell: (info) => {
          const user = info.getValue() as any;
          return (
            <span className="text-gray-800 dark:text-gray-200">
              {user || "نامشخص"}
            </span>
          );
        },
        enableSorting: true,
      },
      {
        accessorKey: "items",
        header: "آیتم ها",
        cell: (info) => {
          const items = info?.getValue() as any[];
          const totalItems = items?.reduce((sum, item) => sum + item?.count, 0);
          return (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="flex items-center gap-1 cursor-help">
                    <ShoppingCart className="w-4 h-4" />
                    <span>{totalItems} آیتم</span>
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="max-w-xs">
                    {items?.map((item, index) => (
                      <span key={index} className="text-sm">
                        {item?.item?.title} - {item?.count} عدد
                      </span>
                    ))}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        },
        enableSorting: true,
      },
      {
        accessorKey: "total_amount",
        header: "مبلغ کل",
        cell: (info) => (
          <span className="text-gray-800 dark:text-gray-200">
            {formatCurrency(info?.getValue() as number)} تومان
          </span>
        ),
        enableSorting: true,
      },
      {
        accessorKey: "discount_amount",
        header: "تخفیف",
        cell: (info) => {
          const discount = info?.getValue() as number;
          return discount > 0 ? (
            <div className=" text-green-600 dark:text-green-400">
              {formatCurrency(discount)} تومان
            </div>
          ) : (
            <span className="text-muted-foreground">-</span>
          );
        },
        enableSorting: true,
      },
      {
        accessorKey: "payment_amount",
        header: "مبلغ پرداختی",
        cell: (info) => (
          <div className=" text-red-600 dark:text-red-400">
            {formatCurrency(info?.getValue() as number)} تومان
          </div>
        ),
        enableSorting: true,
      },
      {
        accessorKey: "status",
        header: "وضعیت",
        cell: (info) => {
          const status = info?.getValue() as OrderStatus;
          const order = info?.row?.original;
          const isThisRowChanging =
            isChangingStatus && changeVars?.id === order?.id;
          const handleStatusChange = (newStatus: OrderStatus) => {
            changeStatus({ id: order?.id, status: newStatus });
          };
          return (
            <div className="flex justify-between items-center gap-2">
              {getStatusBadge(status)}
              <Select
                value={status}
                onValueChange={(value) =>
                  handleStatusChange(value as OrderStatus)
                }
                disabled={isThisRowChanging}
              >
                <SelectTrigger className="!w-fit !py-1 !px-2 border-none"></SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">در انتظار تایید</SelectItem>
                  <SelectItem value="processing">در حال پردازش</SelectItem>
                  <SelectItem value="delivered">تحویل داده شده</SelectItem>
                  <SelectItem value="done">تکمیل شده</SelectItem>
                  <SelectItem value="failed">ناموفق</SelectItem>
                  <SelectItem value="canceled">لغوشده</SelectItem>
                  <SelectItem value="refunded">بازگشت وجه</SelectItem>
                </SelectContent>
              </Select>
            </div>
          );
        },
        enableSorting: true,
      },
      {
        accessorKey: "address",
        header: "آدرس",
        cell: (info) => {
          const address = info?.getValue() as any;
          return (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1 cursor-help">
                    <MapPin className="w-4 h-4 " />
                    <span className="text-sm">{address?.city}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="">
                    <div>
                      {address?.province} - {address?.city}
                    </div>

                    <div>{address?.address}</div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: "payments",
        header: "تاریخ سفارش",
        cell: (info) => {
          const payments = info.getValue() as Array<{ created_at: string }>;
          const firstCreatedAt = payments?.[0]?.created_at || null;
          return (
            <div>{firstCreatedAt ? formatJalaliDate(firstCreatedAt) : "-"}</div>
          );
        },
        enableSorting: true,
      },
      {
        id: "details",
        header: "جزئیات",
        cell: ({ row }) => {
          const order = row.original;
          return (
            <OrderDetails order={order} setSelectedOrder={setSelectedOrder} />
          );
        },
        enableSorting: false,
      },
    ],
    [
      currentPage,
      currentLimit,
      orders,
      changeStatus,
      isChangingStatus,
      changeVars,
    ]
  );
