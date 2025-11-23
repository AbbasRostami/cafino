"use client";

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Loader2, Repeat1, SquareCheck, SquareX } from "lucide-react";
import { confirm } from "@/components/shared/ConfirmModal";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { formatJalaliDate } from "@/utils/formatters";
import { ColumnsCommentsProps, CommentResponseAdmin } from "@/types/admin";
import { AddCommentModal } from "./add-comment";

export const columns = ({
  currentPage,
  currentLimit,
  acceptComment,
  isAcceptingComment,
  acceptingVars,
  rejectComment,
  isRejectingComment,
  rejectingVars,
}: ColumnsCommentsProps) =>
  useMemo<ColumnDef<CommentResponseAdmin>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ردیف",
        cell: (info) => (currentPage - 1) * currentLimit + info?.row?.index + 1,
        enableSorting: false,
      },
      {
        accessorKey: "user.username",
        header: "کاربر",
        cell: (info) => {
          const user = info?.row?.original?.user;
          const username = user?.username || "-";
          return <span>{username}</span>;
        },
        enableSorting: true,
      },
      {
        header: "نام و نام خانوادگی",
        accessorFn: (row) => `${row.user.first_name} ${row.user.last_name}`,
        cell: (info) => {
          const row = info?.row?.original;
          return row?.user?.first_name && row?.user?.last_name
            ? `${row?.user?.first_name} ${row?.user?.last_name}`
            : "-";
        },
        enableSorting: true,
      },
      {
        accessorKey: "text",
        header: "متن کامنت",
        cell: ({ row }) => {
          const value = row.getValue("text") as string;
          return (
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="block truncate max-w-[250px] cursor-pointer text-sm leading-relaxed">
                  {value.length > 130 ? value.slice(0, 130) + "..." : value}
                </span>
              </TooltipTrigger>
              <TooltipContent className="max-w-md">
                <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
                  {value}
                </p>
              </TooltipContent>
            </Tooltip>
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: "accept",
        header: "وضعیت تایید",
        cell: (info) => {
          const accepted = info?.getValue() as boolean;
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
          return formatJalaliDate(date);
        },
        enableSorting: true,
      },
      {
        accessorKey: "star",
        header: "امتیاز",
        cell: (info) => {
          return (info.getValue() as number) || "-";
        },
        enableSorting: true,
      },
      {
        accessorKey: "user.phone",
        header: "شماره تلفن",
        cell: (info) => info?.getValue() as string,
        enableSorting: true,
      },

      {
        accessorKey: "item.title",
        header: "محصول",
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
      },
      {
        id: "actions",
        header: "عملیات",
        cell: ({ row }) => {
          const commentId = row?.original?.id;
          const itemId = row?.original?.item?.id;
          const parent = row?.original?.id;
          return (
            <div className="flex items-center gap-2">
              <AddCommentModal
                trigger={
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg"
                  >
                    <Repeat1 className="w-4 h-4" />
                  </Button>
                }
                itemId={itemId}
                parentId={parent}
                parentComment={row?.original}
              />
              <Button
                variant="outline"
                size="icon"
                disabled={
                  (acceptingVars?.id === commentId && isAcceptingComment) ||
                  row?.original?.accept === true
                }
                className={`h-8 w-8 rounded-lg transition-all duration-200 ${
                  acceptingVars?.id !== commentId && !isAcceptingComment
                    ? "bg-green-50 hover:bg-green-100 border-green-200 hover:border-green-300 hover:scale-105"
                    : "opacity-60 cursor-not-allowed bg-gray-50"
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
                {acceptingVars?.id === commentId && isAcceptingComment ? (
                  <Loader2 className="w-4 h-4 animate-spin text-green-600" />
                ) : (
                  <SquareCheck
                    className="w-4 h-4 text-green-600"
                    strokeWidth={2.5}
                  />
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                disabled={
                  (rejectingVars?.id === commentId && isRejectingComment) ||
                  row?.original?.accept === false
                }
                className={`h-8 w-8 rounded-lg transition-all duration-200 ${
                  rejectingVars?.id !== commentId && !isRejectingComment
                    ? "bg-red-50 hover:bg-red-100 border-red-200 hover:border-red-300 hover:scale-105"
                    : "opacity-60 cursor-not-allowed bg-gray-50"
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
                {rejectingVars?.id === commentId && isRejectingComment ? (
                  <Loader2 className="w-4 h-4 animate-spin text-red-600" />
                ) : (
                  <SquareX className="w-4 h-4 text-red-600" strokeWidth={2.5} />
                )}
              </Button>
            </div>
          );
        },
        enableSorting: false,
      },
    ],
    [
      currentPage,
      currentLimit,
      acceptComment,
      isAcceptingComment,
      acceptingVars,
      rejectComment,
      isRejectingComment,
      rejectingVars,
    ]
  );
