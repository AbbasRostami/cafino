"use client";

import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { LayoutList, Loader2, SquarePen, Trash2 } from "lucide-react";
import { useDeleteItem } from "@/services";
import { confirm } from "@/components/shared/ConfirmModal";
import {
  TooltipContent,
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { formatJalaliDate, formatCurrency } from "@/utils/formatters";
import { Badge } from "@/components/ui/badge";
import { ItemDetailsModal } from "./Details";
import { MenuItem } from "@/types/main";
import { itemsColumnsProps, ItemsResponse } from "@/types/admin";
import { ImageDialog } from "../../components/common/ImageDialog";

export const columns = ({
  currentPage,
  currentLimit,
  setEditingItem,
  setIsModalOpen,
}: itemsColumnsProps) =>
  useMemo<ColumnDef<MenuItem>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ردیف",
        cell: (info) => (currentPage - 1) * currentLimit + info?.row?.index + 1,
        enableSorting: false,
      },
      {
        accessorKey: "images",
        header: "تصویر",
        cell: (info) => {
          const images = info.getValue() as { imageUrl: string }[];
          const url = images?.[0]?.imageUrl || "";

          if (!url) return "-";

          return (
            <>
              <div className="flex justify-center cursor-pointer">
                <ImageDialog src={url} alt="تصویر دسته‌بندی">
                  <Image
                    src={url}
                    alt="تصویر محصول"
                    className="w-16 h-16 rounded-md object-cover border hover:scale-105 transition"
                    width={64}
                    height={64}
                    loading="lazy"
                  />
                </ImageDialog>
              </div>
            </>
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: "title",
        header: "عنوان محصول",
        cell: (info) => info?.getValue() as string,
        enableSorting: true,
      },
      {
        accessorKey: "category.title",
        header: "دسته‌بندی",
        cell: (info) => info?.getValue() || "-",
        enableSorting: true,
      },
      {
        accessorKey: "price",
        header: "قیمت",
        cell: (info) => {
          const price = info?.getValue() as number;
          return price ? formatCurrency(price) + " تومان" : "-";
        },
        enableSorting: true,
      },

      {
        accessorKey: "discount",
        header: "تخفیف",
        cell: (info) => {
          const discount = info?.getValue() as number;
          return discount ? `${discount}%` : "-";
        },
        enableSorting: true,
      },
      {
        accessorKey: "quantity",
        header: "موجودی",
        cell: (info) => info?.getValue() ?? "-",
        enableSorting: true,
      },
      {
        accessorKey: "rate",
        header: "امتیاز",
        cell: (info) => {
          const rate = info?.getValue() as number;
          return rate ? `${rate} ⭐` : "-";
        },
        enableSorting: true,
      },
      {
        header: "مواد اولیه",
        accessorKey: "ingredients",
        cell: (info) => {
          const ingredients = info?.getValue() as any[];
          if (ingredients === null) return "-";

          return (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="cursor-pointer underline  decoration-dotted">
                    {ingredients.length} مواد اولیه
                  </p>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <ul className="space-y-1 text-sm leading-5">
                    {ingredients.map((i, index) => (
                      <li key={index}>{i + ","}</li>
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
        accessorKey: "rate_count",
        header: "تعداد رای",
        cell: (info) => info?.getValue() ?? "-",
        enableSorting: true,
      },
      {
        accessorKey: "show",
        header: "نمایش",
        cell: ({ row }) => {
          const value = row.getValue("show");
          const isActive = Boolean(value);

          return (
            <Badge variant={isActive ? "success" : "destructive"}>
              {isActive ? "فعال" : "غیرفعال"}
            </Badge>
          );
        },
        enableSorting: true,
      },
      {
        accessorKey: "created_at",
        header: "تاریخ ثبت",
        cell: (info) => {
          const date = info?.getValue() as string;
          return (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="cursor-pointer  hover:underline">
                    {formatJalaliDate(date)}
                  </p>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-sm leading-5">{formatJalaliDate(date)}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        },
        enableSorting: true,
      },
      {
        id: "actions",
        header: "عملیات",
        cell: ({ row }) => {
          const { mutate, isPending } = useDeleteItem();
          const item = row?.original || {};
          const [isDetailsOpen, setIsDetailsOpen] = useState(false);

          return (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsDetailsOpen(true)}
                      className="h-8 w-8 rounded-full dark:bg-blue-900/30 dark:hover:bg-blue-900/50 transition-all duration-200 hover:scale-110"
                    >
                      <LayoutList
                        className="text-blue-500"
                        size={30}
                        strokeWidth={2.2}
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>جزئیات محصول</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <ItemDetailsModal
                isOpen={isDetailsOpen}
                onClose={() => setIsDetailsOpen(false)}
                item={item as unknown as ItemsResponse}
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full dark:bg-blue-900/30 dark:hover:bg-blue-900/50 transition-all duration-200 hover:scale-110"
                      onClick={() => {
                        setEditingItem(item);
                        setIsModalOpen(true);
                      }}
                    >
                      <SquarePen size={30} strokeWidth={2.2} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>ویرایش محصول</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full dark:bg-red-900/30 dark:hover:bg-red-900/50 transition-all duration-200 hover:scale-110"
                      onClick={async () => {
                        const isConfirmed = await confirm({
                          title: "حذف محصول",
                          description: "آیا از حذف این محصول اطمینان دارید؟",
                          confirmText: "حذف",
                          cancelText: "انصراف",
                        });
                        if (isConfirmed) {
                          mutate({ id: item.id });
                        }
                      }}
                    >
                      {isPending ? (
                        <Loader2 className="animate-spin" size={30} />
                      ) : (
                        <Trash2
                          className="text-red-600 dark:text-red-400"
                          size={30}
                          strokeWidth={2.2}
                        />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>حذف محصول</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          );
        },
        enableSorting: false,
      },
    ],
    [currentPage, currentLimit]
  );
