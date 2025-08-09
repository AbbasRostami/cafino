"use client";
import { DataTable } from "@/components/common/DataTable";
import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Users, ShieldUser, OctagonX } from "lucide-react";
import { Trash2 } from "lucide-react";
import { formatJalaliDate } from "@/utils/formatters";
import { confirm } from "@/components/common/ConfirmModal/ConfirmModal";
import {
  useChangeUserPermission,
  useDeleteUser,
  useGetUserListAdmin,
  useAddUserToBlacklist,
  } from "@/services/userlist";
import {
  TooltipContent,
  Tooltip,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

export default function Discounts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);

  const { users, isLoading, total } = useGetUserListAdmin({
    page: currentPage,
    limit: currentLimit,
  });
  console.log(users);

  const columns = useMemo<ColumnDef<any>[]>(
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
            <Badge variant={status === "block" ? "destructive" : "success"}>
              {status === "block" ? "مسدود" : "فعال"}
            </Badge>
          );
        },
        enableSorting: true,
      },
      {
        header: "تاریخ ثبت نام",
        accessorKey: "created_at",
        cell: (info) => formatJalaliDate(info.getValue() as string),
        enableSorting: true,
      },

      {
        header: "آدرس‌ها",
        accessorKey: "addressList",
        cell: (info) => {
          const addresses = info.getValue() as any[];
          if (!addresses.length) return "-";

          return (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-pointer text-blue-600 hover:underline">
                    {addresses.length} آدرس
                  </span>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <ul className="space-y-1 text-sm leading-5">
                    {addresses.map((a) => (
                      <li key={a.id}>
                        {a.province}، {a.city}، {a.address}
                      </li>
                    ))}
                  </ul>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: "actions",
        header: "عملیات",
        cell: (info) => {
          const phone = info.row.original.phone;
          const role = info.row.original.role;
          const status = info.row.original.status;
          const { mutate: deleteUser, isPending: isDeletingUser } =
            useDeleteUser();
          const {
            mutate: changeUserPermission,
            isPending: isChangingPermission,
          } = useChangeUserPermission();
          const { mutate: addUserToBlacklist, isPending: isAddingUserToBlacklist } =
            useAddUserToBlacklist();
          return (
            <div className="flex justify-center gap-2">
              {/* change user role */}
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={isChangingPermission}
                      onClick={async () => {
                        const isConfirmed = await confirm({
                          title: "تغییر نقش کاربر",
                          description:
                            "آیا از تغییر نقش این کاربر اطمینان دارید؟",
                          confirmText: "تغییر",
                          cancelText: "انصراف",
                        });
                        if (isConfirmed) {
                          changeUserPermission({
                            phone: phone,
                            role: role === "admin" ? "user" : "admin",
                          });
                        }
                      }}
                      className={`h-7 w-7 rounded-full dark:bg-red-900/30 dark:hover:bg-red-900/50 transition-all duration-200 ${
                        !isChangingPermission
                          ? "hover:scale-110"
                          : "opacity-60 cursor-not-allowed"
                      }`}
                    >
                      {isChangingPermission ? (
                        <Loader2
                          className="animate-spin text-red-600 dark:text-gray-200"
                          size={20}
                        />
                      ) : (
                        <ShieldUser size={24} />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>تغییر نقش کاربر</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {/* add user to blacklist */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={isAddingUserToBlacklist ||  status === "block"}
                      onClick={async () => {
                        const isConfirmed = await confirm({
                          title: "اضافه کردن کاربر به لیست سیاه",
                          description:
                            "آیا از اضافه کردن این کاربر به لیست سیاه اطمینان دارید؟",
                          confirmText: "اضافه کردن",
                          cancelText: "انصراف",
                        });
                        if (isConfirmed) {
                          addUserToBlacklist({
                            phone: phone,
                          });
                        }
                      }}
                      className={`h-7 w-7 rounded-full dark:bg-red-900/30 dark:hover:bg-red-900/50 transition-all duration-200 ${
                        !isAddingUserToBlacklist
                          ? "hover:scale-110"
                          : "opacity-60 cursor-not-allowed"
                      }`}
                    >
                      {isAddingUserToBlacklist ? (
                        <Loader2
                          className="animate-spin text-red-600 dark:text-gray-200"
                          size={20}
                        />
                      ) : (
                        <OctagonX size={24} className="text-error-500 dark:text-error-400" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>اضافه کردن کاربر به لیست سیاه</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {/* delete user */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={isDeletingUser}
                      onClick={async () => {
                        const isConfirmed = await confirm({
                          title: "حذف کاربر",
                          description: "آیا از حذف این کاربر اطمینان دارید؟",
                          confirmText: "حذف",
                          cancelText: "انصراف",
                        });
                        if (isConfirmed) deleteUser({ phone: phone });
                      }}
                      className={`h-7 w-7 rounded-full dark:bg-red-900/30 dark:hover:bg-red-900/50 transition-all duration-200 ${
                        !isDeletingUser
                          ? "hover:scale-110"
                          : "opacity-60 cursor-not-allowed"
                      }`}
                    >
                      {isDeletingUser ? (
                        <Loader2
                          className="animate-spin text-red-600 dark:text-red-400"
                          size={20}
                        />
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

  const headerProps = useMemo(
    () => ({
      title: "لیست کاربران",
      icon: <Users size={30} />,
      showColumnVisibility: true,
    }),
    []
  );
  return (
    <DataTable
      data={users}
      columns={columns}
      isLoading={isLoading}
      headerProps={headerProps}
      emptyStateMessage="هیچ کاربری یافت نشد"
      emptyStateDescription="برای افزودن کاربر، روی دکمه افزودن کلیک کنید"
      enablePagination={true}
      page={currentPage}
      limit={currentLimit}
      totalCount={total}
      onPageChange={setCurrentPage}
      onLimitChange={(limit) => {
        setCurrentLimit(limit);
        setCurrentPage(1);
      }}
      pageSizeOptions={[5, 10, 25, 50]}
    />
  );
}
