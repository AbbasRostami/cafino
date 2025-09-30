"use client";

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CircleUserRound, Loader2, OctagonX } from "lucide-react";
import { Trash2 } from "lucide-react";
import { formatJalaliDate } from "@/utils/formatters";
import { confirm } from "@/components/shared/ConfirmModal";
import {
  TooltipContent,
  Tooltip,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { ColumnsBlackListProps } from "@/types/admin";

export const columns = ({
  currentPage,
  currentLimit,
  removeFromBlacklist,
  isRemoving,
  removingVars,
}: ColumnsBlackListProps) =>
  useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ردیف",
        cell: (info) => (currentPage - 1) * currentLimit + info.row.index + 1,
        enableSorting: false,
      },
      {
        header: "نام کاربری",
        accessorKey: "username",
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
      },
      {
        header: "تاریخ تولد",
        accessorKey: "birthday",
        cell: (info) =>
          info.getValue()
            ? formatJalaliDate(info.getValue() as string, "jYYYY/jMM/jDD")
            : "-",
        enableSorting: true,
      },
      {
        header: "تصویر",
        accessorKey: "imageUrl",
        cell: (info) =>
          info.getValue() || (
            <div className="flex justify-center">
              <CircleUserRound
                size={24}
                className="text-gray-500 dark:text-gray-400"
              />
            </div>
          ),
        enableSorting: true,
      },
      {
        header: "ایمیل",
        accessorKey: "email",
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
      },
      {
        header: "تلفن همراه",
        accessorKey: "phone",
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
      },
      {
        header: "تایید ایمیل",
        accessorKey: "is_email_verified",
        cell: (info) => {
          const active = info.getValue() as boolean;
          return (
            <Badge variant={active ? "success" : "destructive"}>
              {active ? "تایید شده" : "تایید نشده"}
            </Badge>
          );
        },
        enableSorting: true,
      },
      {
        header: "نقش",
        accessorKey: "role",
        cell: (info) => {
          const role = info.getValue() as string;
          return (
            <Badge variant={role === "admin" ? "success" : "default"}>
              {role === "admin" ? "مدیر" : "کاربر"}
            </Badge>
          );
        },
        enableSorting: true,
      },
      {
        header: "وضعیت",
        accessorKey: "status",
        cell: () => {
          return (
            <Badge variant="destructive">
              <OctagonX size={16} className="ml-1" />
              مسدود
            </Badge>
          );
        },
        enableSorting: true,
      },
      {
        header: "تاریخ ثبت",
        accessorKey: "created_at",
        cell: (info) => {
          const date = info.getValue() as string;
          return date
            ? formatJalaliDate(date, "jYYYY/jMM/jDD" + " - " + "HH:MM")
            : "-";
        },
        enableSorting: true,
      },
      {
        id: "actions",
        header: "عملیات",
        cell: ({ row }) => {
          const user = row?.original;
          return (
            <div className="flex justify-center items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={
                        removingVars?.phone === user?.phone && isRemoving
                      }
                      className="h-8 w-8 rounded-full dark:bg-green-900/30 dark:hover:bg-green-900/50 transition-all duration-200 hover:scale-110"
                      onClick={async () => {
                        const isConfirmed = await confirm({
                          title: "حذف از لیست سیاه",
                          description:
                            "آیا از حذف این کاربر از لیست سیاه اطمینان دارید؟",
                          confirmText: "حذف",
                          cancelText: "انصراف",
                        });
                        if (isConfirmed) {
                          removeFromBlacklist({ phone: user?.phone });
                        }
                      }}
                    >
                      {removingVars?.phone === user?.phone && isRemoving ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <Trash2
                          className="text-red-600 dark:text-red-400"
                          size={24}
                          strokeWidth={2.2}
                        />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>حذف از لیست سیاه</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          );
        },
        enableSorting: false,
      },
    ],
    [currentPage, currentLimit, removeFromBlacklist, isRemoving, removingVars]
  );
