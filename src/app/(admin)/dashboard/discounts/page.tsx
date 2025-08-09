"use client";
import { useGetDiscounts } from "@/services/discounts";
import { DataTable } from "@/components/common/DataTable";
import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, ClipboardPlus } from "lucide-react";
import { Trash2 } from "lucide-react";
import { useDeleteDiscount } from "@/services/discounts";
import { formatJalaliDate } from "@/utils/formatters";
import { confirm } from "@/components/common/ConfirmModal/ConfirmModal";
import { CreateDiscountModal } from "./CreateDiscountModal";

export default function Discounts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);

  const { discounts, isLoading, total } = useGetDiscounts({
    page: currentPage,
    limit: currentLimit,
  });
  console.log(discounts);

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ردیف",
        cell: (info) => (currentPage - 1) * currentLimit + info.row.index + 1,
        enableSorting: true,
      },
      {
        header: "کد تخفیف",
        accessorKey: "code",
        cell: (info) => info.getValue() as string,
        enableSorting: true,
      },
      {
        header: "مقدار تخفیف",
        accessorKey: "amount",
        cell: (info) => {
          const row = info.row.original;
          if (row.percent) {
            return `${row.percent}%`;
          }
          if (row.amount) {
            return `${row.amount.toLocaleString("fa-IR")} تومان`;
          }
          return "-";
        },
        enableSorting: true,
      },
      {
        accessorKey: "expires_in",
        header: "تاریخ انقضا",
        cell: (info) => {
          const date = info.getValue() as string;
          return <span>{formatJalaliDate(date)}</span>;
        },
        enableSorting: true,
      },
      {
        header: "محدودیت استفاده",
        accessorKey: "limit",
        cell: (info) => `${info.getValue() as number} بار`,
        enableSorting: true,
      },
      {
        header: "تعداد استفاده",
        accessorKey: "usage",
        cell: (info) => `${info.getValue() as number}`,
        enableSorting: true,
      },
      {
        header: "وضعیت",
        accessorKey: "active",
        cell: (info) => {
          const active = info.getValue() as boolean;
          return (
            <Badge variant={active ? "success" : "destructive"}>
              {active ? "فعال" : "غیرفعال"}
            </Badge>
          );
        },
        enableSorting: true,
      },
      {
        accessorKey: "actions",
        header: "حذف",
        cell: (info) => {
          const id = info.row.original.id;
          const { mutate: deleteDiscount, isPending } = useDeleteDiscount();

          return (
            <Button
              variant="ghost"
              size="icon"
              disabled={isPending}
              className={`
                h-10 w-10 rounded-full
                dark:bg-red-900/30 dark:hover:bg-red-900/50
                transition-all duration-200
                ${
                  !isPending
                    ? "hover:scale-110"
                    : "opacity-60 cursor-not-allowed"
                }
              `}
              onClick={async () => {
                const isConfirmed = await confirm({
                  title: "حذف کد تخفیف",
                  description: "آیا از حذف این کد تخفیف اطمینان دارید؟",
                  confirmText: "حذف",
                  cancelText: "انصراف",
                });
                if (isConfirmed) deleteDiscount({ id });
              }}
            >
              {isPending ? (
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
          );
        },
        enableSorting: false,
      },
    ],
    [currentPage, currentLimit]
  );
  const headerProps = useMemo(
    () => ({
      title: "لیست کد های تخفیف",
      icon: <ClipboardPlus size={30} />,
      showColumnVisibility: true,
      actions: <CreateDiscountModal />,
    }),
    []
  );
  return (
    <DataTable
      data={discounts}
      columns={columns}
      isLoading={isLoading}
      headerProps={headerProps}
      emptyStateMessage="هیچ کد تخفیفی یافت نشد"
      emptyStateDescription="برای افزودن کد تخفیف، روی دکمه افزودن کلیک کنید"
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
