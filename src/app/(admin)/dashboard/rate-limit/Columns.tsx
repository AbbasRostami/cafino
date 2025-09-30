"use client";

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { formatJalaliDate } from "@/utils/formatters";
import { Badge } from "@/components/ui/badge";
import { RateLimitRecord, RateLimitColumnsProps } from "@/types/admin";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Loader2, ShieldCheck, RotateCcw, Ban } from "lucide-react";
import { confirm } from "@/components/shared/ConfirmModal";
import { toast } from "sonner";

export const columns = ({
  currentPage,
  currentLimit,
  records,
  blockUser,
  isBlocking,
  blockingVars,
  unblockUser,
  isUnblocking,
  unblockingVars,
  resetRateLimit,
  isResetting,
  resettingVars,
}: RateLimitColumnsProps) => {
  return useMemo<ColumnDef<RateLimitRecord>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ردیف",
        cell: (info) => (currentPage - 1) * currentLimit + info?.row?.index + 1,
        enableSorting: false,
      },
      {
        accessorKey: "identifier",
        header: "شناسه کاربری",
        cell: (info) => {
          const identifier = info?.getValue() as string;
          return (
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  onClick={() => {
                    navigator.clipboard.writeText(identifier);
                    toast.success("شناسه کاربری کپی شد");
                  }}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <span className="text-gray-800 dark:text-gray-200 text-sm ">
                    {identifier.length > 25
                      ? identifier.slice(0, 25) + "..."
                      : identifier}
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{identifier}</p>
              </TooltipContent>
            </Tooltip>
          );
        },
        enableSorting: true,
      },
      {
        accessorKey: "endpoint",
        header: "اندپوینت ها",
        maxSize: 10,
        cell: (info) => {
          const endpoint = info?.getValue() as string;
          return (
            <span className="text-gray-800 dark:text-gray-200 text-sm cursor-pointer">
              {endpoint || "نامشخص"}
            </span>
          );
        },
        enableSorting: true,
      },
      {
        accessorKey: "violation_count",
        header: "تعداد تخلفات",
        cell: (info) => {
          const violationCount = info?.getValue() as number;
          return (
            <Badge variant={violationCount > 0 ? "destructive" : "secondary"}>
              {violationCount}
            </Badge>
          );
        },
        enableSorting: true,
      },
      {
        accessorKey: "requests_in_window",
        header: "تعداد درخواست ها",
        cell: (info) => {
          const requestsInWindow = info?.getValue() as number;
          return (
            <span className="text-gray-800 dark:text-gray-200 ">
              {requestsInWindow}
            </span>
          );
        },
        enableSorting: true,
      },
      {
        accessorKey: "block_status",
        header: "وضعیت بلاک",
        cell: (info) => {
          const blockStatus = info?.row?.original?.block_status as string;
          return (
            <Badge
              variant={
                blockStatus === "none"
                  ? "secondary"
                  : blockStatus === "temporary"
                  ? "pending"
                  : "destructive"
              }
            >
              {blockStatus === "none"
                ? "عادی"
                : blockStatus === "temporary"
                ? "موقت"
                : "دائمی"}
            </Badge>
          );
        },
        enableSorting: true,
      },
      {
        accessorKey: "created_at",
        header: "تاریخ ایجاد",
        cell: (info) => {
          const created_at = info?.row?.original?.created_at as string;
          return <div>{created_at ? formatJalaliDate(created_at) : "-"}</div>;
        },
        enableSorting: true,
      },
      {
        accessorKey: "updated_at",
        header: "تاریخ بروزرسانی",
        cell: (info) => {
          const updated_at = info?.row?.original?.updated_at as string;
          return <div>{updated_at ? formatJalaliDate(updated_at) : "-"}</div>;
        },
        enableSorting: true,
      },
      {
        accessorKey: "actions",
        header: "عملیات",
        cell: (info) => {
          const record = info?.row?.original;
          const id = record?.id;
          const blockStatus = record?.block_status;
          const isBlockingThis = blockingVars?.id === id && isBlocking;
          const isUnblockingThis = unblockingVars?.id === id && isUnblocking;
          const isResettingThis = resettingVars?.id === id && isResetting;

          return (
            <TooltipProvider>
              <div className="flex justify-center items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      disabled={isBlockingThis || blockStatus !== "none"}
                      variant="ghost"
                      size="icon"
                      className={`h-8 w-8 rounded-full dark:bg-red-900/30 dark:hover:bg-red-900/50 transition-all duration-200 ${
                        isBlockingThis || blockStatus !== "none"
                          ? "opacity-60 cursor-not-allowed"
                          : "hover:scale-110"
                      }`}
                      onClick={async () => {
                        const isConfirmed = await confirm({
                          title: "بلاک کاربر",
                          description:
                            "آیا از بلاک کردن این کاربر اطمینان دارید؟",
                          confirmText: "بلاک",
                          cancelText: "انصراف",
                        });
                        if (isConfirmed) {
                          blockUser({ id, data: { permanent: false } });
                        }
                      }}
                    >
                      {isBlockingThis ? (
                        <Loader2
                          className="animate-spin text-red-600 dark:text-red-400"
                          size={20}
                        />
                      ) : (
                        <Ban
                          className="text-red-600 dark:text-red-400"
                          size={20}
                          strokeWidth={2.2}
                        />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>بلاک کاربر</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      disabled={isUnblockingThis || blockStatus === "none"}
                      variant="ghost"
                      size="icon"
                      className={`h-8 w-8 rounded-full dark:bg-green-900/30 dark:hover:bg-green-900/50 transition-all duration-200 ${
                        isUnblockingThis || blockStatus === "none"
                          ? "opacity-60 cursor-not-allowed"
                          : "hover:scale-110"
                      }`}
                      onClick={async () => {
                        const isConfirmed = await confirm({
                          title: "آنبلاک کاربر",
                          description:
                            "آیا از آنبلاک کردن این کاربر اطمینان دارید؟",
                          confirmText: "آنبلاک",
                          cancelText: "انصراف",
                        });
                        if (isConfirmed) {
                          unblockUser({ id });
                        }
                      }}
                    >
                      {isUnblockingThis ? (
                        <Loader2
                          className="animate-spin text-green-600 dark:text-green-400"
                          size={20}
                        />
                      ) : (
                        <ShieldCheck
                          className="text-green-600 dark:text-green-400"
                          size={20}
                          strokeWidth={2.2}
                        />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>آنبلاک کاربر</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={isResettingThis}
                      className={`h-8 w-8 rounded-full dark:bg-blue-900/30 dark:hover:bg-blue-900/50 transition-all duration-200 ${
                        !isResettingThis
                          ? "hover:scale-110"
                          : "opacity-60 cursor-not-allowed"
                      }`}
                      onClick={async () => {
                        const isConfirmed = await confirm({
                          title: "ریست کردن محدودیت",
                          description:
                            "آیا از ریست کردن تمام داده‌های محدودیت این کاربر اطمینان دارید؟",
                          confirmText: "ریست",
                          cancelText: "انصراف",
                        });
                        if (isConfirmed) {
                          resetRateLimit({ id });
                        }
                      }}
                    >
                      {isResettingThis ? (
                        <Loader2
                          className="animate-spin text-blue-600 dark:text-blue-400"
                          size={20}
                        />
                      ) : (
                        <RotateCcw
                          className="text-blue-600 dark:text-blue-400"
                          size={20}
                          strokeWidth={2.2}
                        />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>ریست محدودیت</p>
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
      records,
      blockUser,
      isBlocking,
      blockingVars,
      unblockUser,
      isUnblocking,
      unblockingVars,
      resetRateLimit,
      isResetting,
      resettingVars,
    ]
  );
};
