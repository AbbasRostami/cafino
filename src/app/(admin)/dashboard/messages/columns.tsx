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
import { Reply, Eye, Trash, Loader2 } from "lucide-react";
import { formatJalaliDate } from "@/utils/formatters";
import { Contact } from "@/types/admin";
import { confirm } from "@/components/shared/ConfirmModal";

export const columns = ({
  currentPage,
  currentLimit,
  onViewMessage,
  onReplyToMessage,
  deleteContact,
  isDeleting,
  deletingVars,
}: {
  currentPage: number;
  currentLimit: number;
  onViewMessage: (contact: Contact) => void;
  onReplyToMessage: (contact: Contact) => void;
  deleteContact: (data: { id: string }) => void;
  isDeleting: boolean;
  deletingVars: { id: string } | null | undefined;
}) =>
  useMemo<ColumnDef<Contact>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ردیف",
        cell: (info) => (currentPage - 1) * currentLimit + info.row.index + 1,
        enableSorting: true,
      },
      {
        header: "نام",
        accessorKey: "name",
        cell: (info) => info.getValue() as string,
        enableSorting: true,
      },
      {
        header: "ایمیل",
        accessorKey: "email",
        cell: (info) => info.getValue() as string,
        enableSorting: true,
      },
      {
        header: "شماره تلفن",
        accessorKey: "phone",
        cell: (info) => info.getValue() as string,
        enableSorting: true,
      },
      {
        header: "پیام",
        accessorKey: "message",
        cell: (info) => {
          const message = info.getValue() as string;
          return (
            <div className="max-w-xs">
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="block truncate max-w-[200px] cursor-pointer">
                    {message.length > 100
                      ? message.slice(0, 100) + "..."
                      : message}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{message}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: "created_at",
        header: "تاریخ ارسال",
        cell: (info) => {
          const date = info.getValue() as string;
          return <span>{formatJalaliDate(date)}</span>;
        },
        enableSorting: true,
      },
      {
        header: "وضعیت پاسخ",
        accessorKey: "replies",
        cell: (info) => {
          const replies = info.getValue() as any[];
          const hasReplies = replies && replies.length > 0;
          return (
            <Badge variant={hasReplies ? "success" : "destructive"}>
              {hasReplies ? "پاسخ داده شده" : "بدون پاسخ"}
            </Badge>
          );
        },
        enableSorting: true,
      },
      {
        accessorKey: "actions",
        header: "عملیات",
        cell: (info) => {
          const contact = info?.row?.original;
          return (
            <TooltipProvider>
              <div className="flex justify-center items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full dark:bg-blue-900/30 dark:hover:bg-blue-900/50 transition-all duration-200 hover:scale-110"
                      onClick={() => onViewMessage(contact)}
                    >
                      <Eye
                        className="text-blue-600 dark:text-blue-400"
                        size={20}
                        strokeWidth={2.2}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>مشاهده پیام</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full dark:bg-green-900/30 dark:hover:bg-green-900/50 transition-all duration-200 hover:scale-110"
                      onClick={() => onReplyToMessage(contact)}
                    >
                      <Reply
                        className="text-green-600 dark:text-green-400"
                        size={20}
                        strokeWidth={2.2}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>پاسخ به پیام</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full dark:bg-red-900/30 dark:hover:bg-red-900/50 transition-all duration-200 hover:scale-110"
                      onClick={async () => {
                        const isConfirmed = await confirm({
                          title: "حذف پیام",
                          description: "آیا از حذف این پیام اطمینان دارید؟",
                          confirmText: "حذف",
                          cancelText: "انصراف",
                        });
                        if (isConfirmed) deleteContact({ id: contact.id });
                      }}
                      disabled={isDeleting}
                    >
                      {isDeleting && deletingVars?.id === contact.id ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <Trash
                          className="text-red-600 dark:text-red-400"
                          size={20}
                          strokeWidth={2.2}
                        />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>حذف پیام</p>
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
      onViewMessage,
      onReplyToMessage,
      deleteContact,
      isDeleting,
      deletingVars,
    ]
  );
