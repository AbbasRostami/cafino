"use client";

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Loader2, Trash2, Power, PowerOff } from "lucide-react";
import { formatJalaliDate } from "@/utils/formatters";
import { confirm } from "@/components/shared/ConfirmModal";
import { ColumnsDiscountsProps } from "@/types/admin";

export const columns = ({
  currentPage,
  currentLimit,
  deleteDiscount,
  isPendingDiscount,
  deletingVars,
  updateStatusDiscount,
  isPendingStatusUpdate,
  updatingVars,
}: ColumnsDiscountsProps) =>
  useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ردیف",
        cell: (info) => (currentPage - 1) * currentLimit + info.row.index + 1,
        enableSorting: true,
      },
      {
        header: "کد تخفیف",
        accessorKey: "code",
        cell: (info) => info.getValue() as string,
        enableSorting: true,
      },
      {
        header: "مقدار تخفیف",
        accessorKey: "amount",
        cell: (info) => {
          const row = info.row.original;
          if (row.percent) {
            return `${row.percent}%`;
          }
          if (row.amount) {
            return `${row.amount} تومان`;
          }
          return "-";
        },
        enableSorting: true,
      },
      {
        accessorKey: "expires_in",
        header: "تاریخ انقضا",
        cell: (info) => {
          const date = info.getValue() as string;
          return <span>{formatJalaliDate(date)}</span>;
        },
        enableSorting: true,
      },
      {
        header: "محدودیت استفاده",
        accessorKey: "limit",
        cell: (info) => `${info.getValue() as number} بار`,
        enableSorting: true,
      },
      {
        header: "تعداد استفاده",
        accessorKey: "usage",
        cell: (info) => `${info.getValue() as number}`,
        enableSorting: true,
      },
      {
        header: "وضعیت",
        accessorKey: "active",
        cell: (info) => {
          const active = info.getValue() as boolean;
          return (
            <Badge variant={active ? "success" : "destructive"}>
              {active ? "فعال" : "غیرفعال"}
            </Badge>
          );
        },
        enableSorting: true,
      },
      {
        accessorKey: "actions",
        header: "عملیات",
        cell: (info) => {
          const id = info.row.original.id;
          const isActive = info.row.original.active;
          return (
            <TooltipProvider>
              <div className="flex justify-center items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={
                        updatingVars?.id === id && isPendingStatusUpdate
                      }
                      className={`
                        h-8 w-8 rounded-full
                        dark:bg-blue-900/30 dark:hover:bg-blue-900/50
                        transition-all duration-200
                      `}
                      onClick={() => {
                        updateStatusDiscount({ id, status: !isActive });
                      }}
                    >
                      {updatingVars?.id === id && isPendingStatusUpdate ? (
                        <Loader2
                          className="animate-spin text-blue-600 dark:text-blue-400"
                          size={20}
                        />
                      ) : isActive ? (
                        <PowerOff
                          className="text-blue-600 dark:text-blue-400"
                          size={20}
                          strokeWidth={2.2}
                        />
                      ) : (
                        <Power
                          className="text-blue-600 dark:text-blue-400"
                          size={20}
                          strokeWidth={2.2}
                        />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isActive ? "غیرفعال کردن" : "فعال کردن"}</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={deletingVars?.id === id && isPendingDiscount}
                      className={`
                        h-8 w-8 rounded-full
                        dark:bg-red-900/30 dark:hover:bg-red-900/50
                        transition-all duration-200
                        ${
                          deletingVars?.id !== id && !isPendingDiscount
                            ? "hover:scale-110"
                            : "opacity-60 cursor-not-allowed"
                        }
                      `}
                      onClick={async () => {
                        const isConfirmed = await confirm({
                          title: "حذف کد تخفیف",
                          description: "آیا از حذف این کد تخفیف اطمینان دارید؟",
                          confirmText: "حذف",
                          cancelText: "انصراف",
                        });
                        if (isConfirmed) deleteDiscount({ id });
                      }}
                    >
                      {deletingVars?.id === id && isPendingDiscount ? (
                        <Loader2
                          className="animate-spin text-red-600 dark:text-red-400"
                          size={20}
                        />
                      ) : (
                        <Trash2
                          className="text-red-600 dark:text-red-400"
                          size={20}
                          strokeWidth={2.2}
                        />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>حذف</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          );
        },
        enableSorting: false,
      },
    ],
    [
      currentPage,
      currentLimit,
      deleteDiscount,
      isPendingDiscount,
      deletingVars,
      updateStatusDiscount,
      isPendingStatusUpdate,
      updatingVars,
    ]
  );
