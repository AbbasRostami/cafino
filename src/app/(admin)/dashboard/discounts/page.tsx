"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { confirm } from "@/components/common/ConfirmModal";
import moment from "moment-jalaali";
import { Button } from "@/components/ui/button";
import { CreateDiscountModal } from "./CreateDiscountModal";
import { Badge } from "@/components/ui/badge";
import { formatJalaliDate } from "@/components/common/formatters";
import { ClipboardPlus, Loader2, Trash2 } from "lucide-react";
import { useDeleteDiscount, useGetDiscounts } from "@/services/discounts";

moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

export default function Discounts() {


  const { discounts, isLoading, error } = useGetDiscounts();
  console.log("discounts", discounts);
  

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ردیف",
        cell: (info) => info.row.index + 1,
        enableSorting: true,
      },
      {
        header: "کد تخفیف",
        accessorKey: "code",
        cell: (info) => info.getValue(),
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
    const formatted = formatJalaliDate(date);
    return <span>{formatted}</span>;
  },
  enableSorting: true,
},
      {
        header: "محدودیت استفاده",
        accessorKey: "limit",
        cell: (info) => `${info.getValue()} بار`,
        enableSorting: true,
      },
      {
        header: "تعداد استفاده",
        accessorKey: "usage",
        cell: (info) => `${info.getValue()}`,
        enableSorting: true,
      },
      {
  header: "وضعیت",
  accessorKey: "active",
  cell: (info) => {
    const active = info.getValue();
    return (
      <Badge variant={active ? "success" : "destructive"}>
        {active ? "فعال" : "غیرفعال"}
      </Badge>
    );
  },
  enableSorting: true,
}
,
     {
  accessorKey: "actions",
  header: "حذف",
  cell: (info) => {
 const id = info.row.original.id;

      // هوک React Query مخصوص این ردیف
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
            ${!isPending ? "hover:scale-110" : "opacity-60 cursor-not-allowed"}
          `}
          onClick={async () => {
            const isConfirmed = await confirm({
              title: "حذف کد تخفیف",
              description: "آیا از حذف این کد تخفیف اطمینان دارید؟",
              confirmText: "حذف",
              cancelText: "انصراف",
            });

            if (isConfirmed) {
              deleteDiscount({ id });
            }
          }}
        >
          {isPending ? (
            <Loader2 className="animate-spin text-red-600 dark:text-red-400" size={20} />
          ) : (
            <Trash2 className="text-red-600 dark:text-red-400" size={24} strokeWidth={2.2} />
          )}
        </Button>
    );
  },
  enableSorting: false,
}
    ],
    []
  );

  const table = useReactTable({
    data: discounts || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });



  return (
    <div className="space-y-4 bg-white/90 shadow-2xl dark:bg-gray-800 p-4 rounded-2xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 pb-6 border-b-2 border-dashed border-amber-500">
        <div className="flex items-center gap-2 w-full md:w-1/3">
          <ClipboardPlus className="text-amber-900 dark:text-amber-200" size={30} />
          <span className="text-amber-500 text-xl font-bold dark:text-amber-200 relative group transition-all duration-300 ease-in-out">
            لیست کد تخفیف
          </span>
        </div>
        
        <div className="flex flex-col md:flex-row justify-end items-center mt-4 md:mt-0 gap-2 w-full md:w-2/3">

          <CreateDiscountModal   />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gradient-to-l from-[#915201] to-[#D27700] text-amber-50 dark:bg-gray-500 text-center">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="p-4 font-bold cursor-pointer text-center select-none"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted() === "asc" && (
                      <BsArrowUp className="inline w-4 h-4 ml-1" />
                    )}
                    {header.column.getIsSorted() === "desc" && (
                      <BsArrowDown className="inline w-4 h-4 ml-1" />
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                className={`${
                  index % 2 === 0
                    ? "bg-[#ebebe9] dark:bg-gray-800/80"
                    : "bg-[#F8F8F8] dark:bg-gray-700/80"
                } hover:bg-amber-100/70 dark:hover:bg-gray-600 transition-colors duration-200 text-center`}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="p-3 text-gray-700 dark:text-gray-300 whitespace-nowrap"
                  >
                    <span className="font-bold">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}