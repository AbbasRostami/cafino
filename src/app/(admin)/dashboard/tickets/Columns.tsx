"use client";

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { formatJalaliDate } from "@/utils/formatters";
import { Badge } from "@/components/ui/badge";
import { Ticket, TicketColumnsProps } from "@/types";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  CircleUserRound,
  Loader2,
  MessageCircleOff,
  Reply,
  Trash2,
} from "lucide-react";
import { confirm } from "@/components/shared/ConfirmModal";
import Image from "next/image";

export const columns = ({
  currentPage,
  currentLimit,
  tickets,
  deleteTicket,
  isDeletingTicket,
  deletingVars,
  closeTicket,
  isClosingTicket,
  closingVars,
  onOpenChat,
}: TicketColumnsProps) => {
  return useMemo<ColumnDef<Ticket>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ردیف",
        cell: (info) => (currentPage - 1) * currentLimit + info?.row?.index + 1,
        enableSorting: false,
      },
      {
        accessorKey: "user.imageUrl",
        header: "تصویر",
        cell: (info) => {
          const imageUrl = info.getValue() as string;
          return imageUrl ? (
            <>
              <div className="flex justify-center items-center gap-2">
                <Image
                  src={imageUrl}
                  alt="تصویر کاربر"
                  width={24}
                  height={24}
                  className="rounded-full object-cover"
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center items-center gap-2">
                <CircleUserRound
                  size={24}
                  className="text-gray-500 dark:text-gray-400 rounded-full object-cover"
                />
              </div>
            </>
          );
        },
        enableSorting: true,
      },
      {
        accessorKey: "user.username",
        header: "کاربر",
        cell: (info) => {
          const user = info.getValue() as any;
          return (
            <div className="flex items-center gap-2">
              <span className="text-gray-800 dark:text-gray-200">
                {user || "نامشخص"}
              </span>
            </div>
          );
        },
        enableSorting: true,
      },
      {
        accessorKey: "subject",
        header: "موضوع",
        cell: (info) => {
          const subject = info.getValue() as any;
          return (
            <span className="text-gray-800 dark:text-gray-200">
              {subject || "نامشخص"}
            </span>
          );
        },
        enableSorting: true,
      },

      {
        accessorKey: "status",
        header: "وضعیت",
        cell: (info) => {
          const status = info?.getValue() as string;
          return (
            <Badge
              variant={
                status === "open"
                  ? "pending"
                  : status === "answered"
                  ? "success"
                  : "destructive"
              }
            >
              {status === "open"
                ? "باز"
                : status === "answered"
                ? "پاسخ داده شده"
                : "بسته شده"}
            </Badge>
          );
        },
        enableSorting: true,
      },

      {
        accessorKey: "created_at",
        header: "تاریخ تیکت",
        cell: (info) => {
          const created_at = info.getValue() as string;
          return <div>{created_at ? formatJalaliDate(created_at) : "-"}</div>;
        },
        enableSorting: true,
      },
      {
        accessorKey: "actions",
        header: "عملیات",
        cell: (info) => {
          const id = info.row.original.id;
          const isDeletingThis = deletingVars?.id === id && isDeletingTicket;
          const isClosingThis = closingVars?.ticketId === id && isClosingTicket;
          const status = info.row.original.status;
          return (
            <TooltipProvider>
              <div className="flex justify-center items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full dark:bg-green-900/30 dark:hover:bg-green-900/50 transition-all duration-200 hover:scale-110"
                      onClick={() => onOpenChat(id)}
                    >
                      <Reply
                        className="text-green-600 dark:text-green-400"
                        size={20}
                        strokeWidth={2.2}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>پاسخ به تیکت</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      disabled={isClosingThis || status === "closed"}
                      variant="ghost"
                      size="icon"
                      className={`h-8 w-8 rounded-full dark:bg-blue-900/30 dark:hover:bg-blue-900/50 transition-all duration-200 hover:scale-110 ${
                        isClosingThis || status === "closed"
                          ? "opacity-60 cursor-not-allowed"
                          : "hover:scale-110"
                      }`}
                      onClick={async () => {
                        const isConfirmed = await confirm({
                          title: "بستن تیکت",
                          description: "آیا از بستن این تیکت اطمینان دارید؟",
                          confirmText: "بستن",
                          cancelText: "انصراف",
                        });
                        if (isConfirmed) closeTicket({ ticketId: id });
                      }}
                    >
                      {isClosingThis ? (
                        <Loader2
                          className="animate-spin text-blue-600 dark:text-blue-400"
                          size={20}
                        />
                      ) : (
                        <MessageCircleOff
                          className="text-blue-600 dark:text-blue-400"
                          size={20}
                          strokeWidth={2.2}
                        />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>بستن تیکت</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={isDeletingThis}
                      className={`
                        h-8 w-8 rounded-full
                        dark:bg-red-900/30 dark:hover:bg-red-900/50
                        transition-all duration-200
     ${!isDeletingThis ? "hover:scale-110" : "opacity-60 cursor-not-allowed"}
                      
                      `}
                      onClick={async () => {
                        const isConfirmed = await confirm({
                          title: "حذف تیکت",
                          description: "آیا از حذف این تیکت اطمینان دارید؟",
                          confirmText: "حذف",
                          cancelText: "انصراف",
                        });
                        if (isConfirmed) deleteTicket({ id });
                      }}
                    >
                      {isDeletingThis ? (
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
      tickets,
      deleteTicket,
      isDeletingTicket,
      deletingVars,
      closeTicket,
      isClosingTicket,
      closingVars,
      onOpenChat,
    ]
  );
};
