"use client";

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader2, OctagonX, CircleUserRound, ChevronDown } from "lucide-react";
import { formatJalaliDate } from "@/utils/formatters";
import { confirm } from "@/components/shared/ConfirmModal";
import {
  TooltipContent,
  Tooltip,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  AddressAdmin,
  UserAdmin,
  UserColumnsProps,
  UserRole,
} from "@/types/admin";
import Image from "next/image";

const getRoleInfo = (role: UserRole) => {
  switch (role) {
    case "admin":
      return { label: "ادمین", variant: "pending" as const };
    case "manager":
      return { label: "مدیر", variant: "success" as const };
    case "user":
    default:
      return { label: "کاربر", variant: "default" as const };
  }
};
const availableRoles: { value: UserRole; label: string }[] = [
  { value: "user", label: "کاربر" },
  { value: "admin", label: "ادمین" },
  { value: "manager", label: "مدیر" },
];

export const columns = ({
  currentPage,
  currentLimit,
  changePermission,
  isChangingPermission,
  addToBlacklist,
  isAddingToBlacklist,
  addToBlacklistVars,
}: UserColumnsProps) =>
  useMemo<ColumnDef<UserAdmin>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ردیف",
        cell: (info) => (currentPage - 1) * currentLimit + info?.row?.index + 1,
        enableSorting: false,
      },
      {
        header: "نام کاربری",
        accessorKey: "username",
        cell: (info) => info?.getValue() || "-",
        enableSorting: true,
      },
      {
        accessorKey: "imageUrl",
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
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center items-center gap-2">
                <CircleUserRound
                  size={24}
                  className="text-gray-500 dark:text-gray-400 w-8 h-8 rounded-full object-cover"
                />
              </div>
            </>
          );
        },
        enableSorting: true,
      },
      {
        header: "تاریخ تولد",
        accessorKey: "birthday",
        cell: (info) =>
          info?.getValue()
            ? formatJalaliDate(info.getValue() as string, "jYYYY/jMM/jDD")
            : "-",
        enableSorting: true,
      },
      {
        header: "ایمیل",
        accessorKey: "email",
        cell: (info) => info?.getValue() || "-",
        enableSorting: true,
      },
      {
        header: "آدرس",
        accessorKey: "addressList",
        cell: ({ row }) => {
          const addresses = row?.original?.addressList || [];
          if (!addresses?.length) return "-";
          return (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="cursor-pointer underline decoration-dotted">
                  {addresses?.length} آدرس
                </TooltipTrigger>
                <TooltipContent className="max-w-xs text-sm">
                  <ul className="list-disc ps-4 space-y-1">
                    {addresses?.map((addr: AddressAdmin) => (
                      <li key={addr?.id}>
                        {addr?.province}، {addr?.city} - {addr?.address}
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
        header: "تلفن همراه",
        accessorKey: "phone",
        cell: (info) => info.getValue() || "-",
        enableSorting: true,
      },

      {
        header: "تاریخ ایجاد",
        accessorKey: "created_at",
        cell: (info) => {
          return info?.getValue()
            ? formatJalaliDate(info?.getValue() as string, "jYYYY/jMM/jDD")
            : "-";
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
        id: "actions",
        header: "عملیات/نقش",
        cell: ({ row }) => {
          const user = row?.original;

          const isCurrentUserAddingToBlacklist =
            addToBlacklistVars?.phone === user?.phone && isAddingToBlacklist;

          return (
            <div className="flex justify-center items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={isChangingPermission}
                    className="h-8 min-w-[120px] border-none shadow-none justify-between text-xs hover:bg-transparent"
                  >
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={getRoleInfo(user?.role).variant}
                        className="text-xs"
                      >
                        {getRoleInfo(user?.role).label}
                      </Badge>
                    </div>
                    <ChevronDown className="h-3 w-3 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 border-none shadow-none">
                  <DropdownMenuLabel className="text-right">
                    تغییر نقش کاربر
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={user?.role}
                    onValueChange={(newRole: string) => {
                      const role = newRole as UserRole;
                      if (role !== user?.role) {
                        changePermission({ phone: user?.phone, role });
                      }
                    }}
                  >
                    {availableRoles.map((role) => (
                      <DropdownMenuRadioItem
                        key={role?.value}
                        value={role?.value}
                        className="text-right justify-end"
                      >
                        <div className="flex items-center gap-2 justify-end w-full">
                          <Badge
                            variant={getRoleInfo(role?.value).variant}
                            className="text-xs"
                          >
                            {role?.label}
                          </Badge>
                        </div>
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

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
                      {isCurrentUserAddingToBlacklist ? (
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
            </div>
          );
        },
        enableSorting: false,
      },
    ],
    [
      currentPage,
      currentLimit,
      changePermission,
      isChangingPermission,
      addToBlacklist,
      addToBlacklistVars,
      isAddingToBlacklist,
    ]
  );
