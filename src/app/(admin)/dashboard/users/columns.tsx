"use client";

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2, ShieldUser, OctagonX } from "lucide-react";
import { formatJalaliDate } from "@/utils/formatters";
import { confirm } from "@/components/common/ConfirmModal/ConfirmModal";
import {
  useChangeUserPermission,
  useDeleteUser,
  useAddUserToBlacklist,
} from "@/services";
import {
  TooltipContent,
  Tooltip,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

export const columns = ({
  currentPage,
  currentLimit,
}: {
  currentPage: number;
  currentLimit: number;
}) =>
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
        cell: (info) => {
          const status = info.getValue() as string;
          return (
            <Badge variant={status === "normal" ? "success" : "destructive"}>
              {status === "normal" ? "عادی" : "مسدود"}
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
          return date ? formatJalaliDate(date, "jYYYY/jMM/jDD") : "-";
        },
        enableSorting: true,
      },
      {
        id: "actions",
        header: "عملیات",
        cell: ({ row }) => {
          const user = row?.original;
          const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();
          const { mutate: changePermission, isPending: isChangingPermission } =
            useChangeUserPermission();
          const { mutate: addToBlacklist, isPending: isAddingToBlacklist } =
            useAddUserToBlacklist();
          return (
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={isChangingPermission}
                      className="h-8 w-8 rounded-full dark:bg-blue-900/30 dark:hover:bg-blue-900/50 transition-all duration-200 hover:scale-110"
                      onClick={() => {
                        const newRole =
                          user.role === "admin" ? "user" : "admin";
                        changePermission({ phone: user?.phone, role: newRole });
                      }}
                    >
                      {isChangingPermission ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <ShieldUser
                          className="text-blue-600 dark:text-blue-400"
                          size={20}
                          strokeWidth={2.2}
                        />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {user.role === "admin"
                        ? "حذف دسترسی مدیر"
                        : "اعطای دسترسی مدیر"}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={isAddingToBlacklist || user?.status === "block"}
                      className="h-8 w-8 rounded-full dark:bg-orange-900/30 dark:hover:bg-orange-900/50 transition-all duration-200 hover:scale-110"
                      onClick={async () => {
                        const isConfirmed = await confirm({
                          title: "افزودن به لیست سیاه",
                          description:
                            "آیا از افزودن این کاربر به لیست سیاه اطمینان دارید؟",
                          confirmText: "افزودن",
                          cancelText: "انصراف",
                        });
                        if (isConfirmed) {
                          addToBlacklist({ phone: user?.phone });
                        }
                      }}
                    >
                      {isAddingToBlacklist ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <OctagonX
                          className="text-orange-600 dark:text-orange-400"
                          size={20}
                          strokeWidth={2.2}
                        />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>افزودن به لیست سیاه</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={isDeleting}
                      className="h-8 w-8 rounded-full dark:bg-red-900/30 dark:hover:bg-red-900/50 transition-all duration-200 hover:scale-110"
                      onClick={async () => {
                        const isConfirmed = await confirm({
                          title: "حذف کاربر",
                          description: "آیا از حذف این کاربر اطمینان دارید؟",
                          confirmText: "حذف",
                          cancelText: "انصراف",
                        });
                        if (isConfirmed) {
                          deleteUser({ phone: user?.phone });
                        }
                      }}
                    >
                      {isDeleting ? (
                        <Loader2 className="animate-spin" size={20} />
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
                    <p>حذف کاربر</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          );
        },
        enableSorting: false,
      },
    ],
    [currentPage, currentLimit]
  );
