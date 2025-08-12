"use client";

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Loader2, SquareCheck, SquareX } from "lucide-react";
import { confirm } from "@/components/common/ConfirmModal/ConfirmModal";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { formatJalaliDate } from "@/utils/formatters";
import { useAcceptComment } from "@/services/Comments";
import { useRejectComment } from "@/services/Comments";
type ColumnsCommentsProps = {
  currentPage: number;
  currentLimit: number;
};
export const columns = ({ currentPage, currentLimit }: ColumnsCommentsProps) =>
  useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ردیف",
        cell: (info) => (currentPage - 1) * currentLimit + info.row.index + 1,
        enableSorting: false,
      },
      {
        accessorKey: "text",
        header: "متن کامنت",
        cell: (info) => info.getValue() as string,
        enableSorting: false,
      },
      {
        accessorKey: "accept",
        header: "وضعیت تایید",
        cell: (info) => {
          const accepted = info.getValue() as boolean;
          return (
            <Badge variant={accepted ? "success" : "destructive"}>
              {accepted ? "تایید شده" : "تایید نشده"}
            </Badge>
          );
        },
        enableSorting: true,
      },
      {
        accessorKey: "is_reply",
        header: "ریپلای؟",
        cell: (info) => (info.getValue() ? "بله" : "خیر"),
        enableSorting: true,
      },
      {
        accessorKey: "created_at",
        header: "تاریخ ثبت",
        cell: (info) => {
          const date = new Date(info.getValue() as string);
          return formatJalaliDate(date, "jYYYY/jMM/jDD");
        },
        enableSorting: true,
      },
      {
        accessorKey: "user.username",
        header: "کاربر",
        cell: (info) => {
          const user = info.row.original.user;
          const username = user?.username || "-";

          return (
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="cursor-pointer underline decoration-dotted">
                  {username}
                </span>
              </TooltipTrigger>
              <TooltipContent className="text-sm">
                <div>ایمیل: {user?.email || "-"}</div>
                <div>شماره تلفن: {user?.phone || "-"}</div>
              </TooltipContent>
            </Tooltip>
          );
        },
        enableSorting: true,
      },
      {
        accessorKey: "item.title",
        header: "محصول",
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
      },
      {
        id: "accept/reject",
        header: "تایید / رد",
        cell: ({ row }) => {
          const commentId = row.original.id;
          const { mutate: acceptComment, isPending: isAcceptingComment } =
            useAcceptComment();
          const { mutate: rejectComment, isPending: isRejectingComment } =
            useRejectComment();
          return (
            <>
              <Button
                variant="ghost"
                size="icon"
                disabled={isAcceptingComment || row.original.accept === true}
                className={` rounded-full dark:bg-red-900/30 dark:hover:bg-red-900/50 transition-all duration-200 ${
                  !isAcceptingComment
                    ? "hover:scale-110"
                    : "opacity-60 cursor-not-allowed"
                }`}
                onClick={async () => {
                  const isConfirmed = await confirm({
                    title: "تایید کامنت",
                    description: "آیا از تایید این کامنت اطمینان دارید؟",
                    confirmText: "تایید",
                    cancelText: "انصراف",
                  });
                  if (isConfirmed) acceptComment({ id: commentId });
                }}
              >
                {isAcceptingComment ? (
                  <Loader2 className="!w-6 !h-6 animate-spin text-green-600 dark:text-green-400" />
                ) : (
                  <SquareCheck
                    className="!w-6 !h-6 text-green-600 dark:text-green-400"
                    strokeWidth={2.2}
                  />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                disabled={isRejectingComment || row.original.accept === false}
                className={` rounded-full dark:bg-red-900/30 dark:hover:bg-red-900/50 transition-all duration-200 ${
                  !isRejectingComment
                    ? "hover:scale-110"
                    : "opacity-60 cursor-not-allowed"
                }`}
                onClick={async () => {
                  const isConfirmed = await confirm({
                    title: "رد کامنت",
                    description: "آیا از رد این کامنت اطمینان دارید؟",
                    confirmText: "رد کردن",
                    cancelText: "انصراف",
                  });
                  if (isConfirmed) rejectComment({ id: commentId });
                }}
              >
                {isRejectingComment ? (
                  <Loader2 className="!w-6 !h-6 animate-spin text-red-600 dark:text-red-400" />
                ) : (
                  <SquareX
                    className="!w-6 !h-6 text-red-600 dark:text-red-400"
                    strokeWidth={2.2}
                  />
                )}
              </Button>
            </>
          );
        },
        enableSorting: false,
      },
    ],
    [currentPage, currentLimit]
  );
