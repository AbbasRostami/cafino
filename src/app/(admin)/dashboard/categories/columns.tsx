"use client";

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { useDeleteCategories } from "@/services/category";
import { confirm } from "@/components/common/ConfirmModal/ConfirmModal";
import { CategoryModal } from "./CategoryModal";
import { ImageDialog } from "../../components/common/ImageDialog";
import Image from "next/image";
import {
  TooltipContent,
  Tooltip,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

export const columns = (currentPage: number, currentLimit: number) => {
  return useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ردیف",
        cell: (info) => (currentPage - 1) * currentLimit + info.row.index + 1,
        enableSorting: false,
      },
      {
        accessorKey: "imageUrl",
        header: "تصویر",
        cell: (info) => {
          const url = info.getValue() as string;
          return (
            <div className="flex justify-center">
              <ImageDialog src={url} alt="تصویر دسته‌بندی">
                <Image
                  src={url}
                  alt="تصویر دسته‌بندی"
                  width={1000}
                  height={1000}
                  className="w-16 h-16 rounded-md object-cover border cursor-pointer hover:scale-105 transition-transform duration-200 shadow-md hover:shadow-lg"
                />
              </ImageDialog>
            </div>
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: "title",
        header: "عنوان دسته‌بندی",
        cell: (info) => info.getValue() as string,
        enableSorting: true,
      },
      {
        accessorKey: "slug",
        header: "اسلاگ",
        cell: (info) => info.getValue() as string,
        enableSorting: true,
      },
      {
        accessorKey: "show",
        header: "نمایش",
        cell: (info) => {
          const show = info.getValue() as boolean;
          return (
            <Badge variant={show ? "success" : "destructive"}>
              {show ? "قابل نمایش" : "مخفی"}
            </Badge>
          );
        },
        enableSorting: true,
      },
      {
        id: "actions",
        header: "عملیات",
        cell: ({ row }) => {
          const category = row?.original;
          const { mutate: deleteCategory, isPending: isDeleting } =
            useDeleteCategories();
          return (
            <>
              <div className="flex gap-2 justify-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CategoryModal
                        initialData={category}
                        trigger={
                          <Button
                            className="h-10 w-10 flex items-center justify-center rounded-full
                                     bg-blue-500/10 hover:bg-blue-500/20
                                     text-blue-600 dark:text-blue-400
                                     transition-all duration-200 hover:scale-110"
                          >
                            <Pencil className="w-5 h-5" />
                          </Button>
                        }
                      />
                    </TooltipTrigger>
                    <TooltipContent side="top">ویرایش دسته‌بندی</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        disabled={isDeleting}
                        className={`
                        h-10 w-10 flex items-center justify-center rounded-full
                        transition-all duration-200
                        ${
                          isDeleting
                            ? "opacity-60 cursor-not-allowed"
                            : "hover:scale-110"
                        }
                        bg-red-500/10 hover:bg-red-500/20
                        text-red-600 dark:text-red-400
                      `}
                        onClick={async () => {
                          const isConfirmed = await confirm({
                            title: "حذف دسته‌بندی",
                            description:
                              "آیا از حذف این دسته‌بندی اطمینان دارید؟",
                            confirmText: "حذف",
                            cancelText: "انصراف",
                          });
                          if (isConfirmed) {
                            deleteCategory({ id: category.id });
                          }
                        }}
                      >
                        {isDeleting ? (
                          <Loader2 className="animate-spin" size={20} />
                        ) : (
                          <Trash2 size={20} strokeWidth={2.2} />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">حذف دسته‌بندی</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </>
          );
        },
        enableSorting: false,
      },
    ],
    [currentPage, currentLimit]
  );
};
