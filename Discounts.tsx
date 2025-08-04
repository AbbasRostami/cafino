"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { TiDeleteOutline } from "react-icons/ti";
import { PiWarningCircleBold } from "react-icons/pi";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaUsers } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";

import { SlBan } from "react-icons/sl";
import { GiConfirmed } from "react-icons/gi";
import { confirm } from "@/components/common/ConfirmModal";
import moment from "moment-jalaali";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetDiscounts, useDeleteDiscount } from "@/services/discounts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useCreateDiscount } from "@/services/discounts";

moment.loadPersian({ dialect: "persian-modern" });

export default function Discounts() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newDiscount, setNewDiscount] = useState({
    code: "",
    percent: "",
    amount: "",
    expires_in: "",
    limit: "",
  });

  const { discounts, isLoading, error } = useGetDiscounts();
  const deleteDiscount = useDeleteDiscount();
  const createDiscount = useCreateDiscount();

  console.log("discount: ", discounts);

  const handleDeleteDiscount = async (id: string) => {
    const isConfirmed = await confirm({
      title: "حذف کد تخفیف",
      description: "آیا مطمئن هستید که می‌خواهید این کد تخفیف را حذف کنید؟",
      confirmText: "حذف",
      cancelText: "انصراف",
    });

    if (isConfirmed) {
      deleteDiscount.mutate({ id });
    }
  };

  const handleCreateDiscount = () => {
    const discountData = {
      code: newDiscount.code,
      expires_in: parseInt(newDiscount.expires_in),
      limit: parseInt(newDiscount.limit),
      ...(newDiscount.percent ? { percent: parseInt(newDiscount.percent) } : {}),
      ...(newDiscount.amount ? { amount: parseInt(newDiscount.amount) } : {}),
    };

    createDiscount.mutate(discountData, {
      onSuccess: () => {
        setIsAddModalOpen(false);
        setNewDiscount({
          code: "",
          percent: "",
          amount: "",
          expires_in: "",
          limit: "",
        });
      },
    });
  };

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
        id: "code",
        accessorKey: "code",
        cell: (info) => info.getValue(),
        enableSorting: true,
      },
      {
        header: "نوع تخفیف",
        id: "discountType",
        cell: (info) => {
          const row = info.row.original;
          if (row.percent) {
            return `${row.percent}% تخفیف`;
          } else if (row.amount) {
            return `${row.amount.toLocaleString("fa-IR")} تومان تخفیف`;
          }
          return "نامشخص";
        },
        enableSorting: true,
      },
      {
        header: "محدودیت استفاده",
        accessorKey: "limit",
        cell: (info) => {
          const limit = info.getValue() as number;
          const usage = info.row.original.usage as number;
          return `${usage}/${limit}`;
        },
        enableSorting: true,
      },
      {
        accessorKey: "expires_in",
        header: "تاریخ انقضا",
        enableSorting: false,
        cell: (info) => {
          const date = info.getValue() as string;
          const formatted = moment(date).format("jYYYY/jMM/jDD - HH:mm");
          return <span>{formatted}</span>;
        },
      },
      {
        accessorKey: "active",
        header: "وضعیت",
        cell: (info) => {
          const value = info.getValue() as boolean;
          return (
            <span
              className={`text-sm px-2 py-1 rounded-xl font-normal ${
                value
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {value ? "فعال" : "غیرفعال"}
            </span>
          );
        },
        enableSorting: true,
      },
      {
        accessorKey: "actions",
        header: "عملیات",
        cell: (info) => {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost" className="w-10 h-10">
                  <HiDotsHorizontal size={20} />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuItem
                  textValue="جزئیات"
                  color="warning"
                  key="details"
                  onClick={() => {
                    console.log("Discount details:", info.row.original);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <PiWarningCircleBold size={20} />
                    جزئیات
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  textValue="حذف"
                  key="delete"
                  className="text-danger"
                  color="danger"
                  onClick={() => handleDeleteDiscount(info.row.original.id)}
                >
                  <div className="flex items-center gap-2">
                    <TiDeleteOutline size={20} />
                    حذف
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
        enableSorting: false,
      },
    ],
    []
  );

  const table = useReactTable({
    data: discounts || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  const [discountSearch, setDiscountSearch] = useState("");

  const currentPage = pagination.pageIndex + 1;
  const totalPages = Math.ceil((discounts?.length || 0) / pagination.pageSize);

  const goToPage = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: page - 1,
    }));
  };

  return (
    <div className="space-y-4 bg-white/90 shadow-2xl dark:bg-gray-800 p-4 rounded-2xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 pb-6 border-b-2 border-dashed border-amber-500">
        <div className="flex items-center gap-2  w-full md:w-1/3">
          <FaUsers className="text-amber-900 dark:text-amber-200" size={30} />
          <span className="text-amber-500 text-xl font-bold  dark:text-amber-200 pb-3 border-b-4 border-amber-500 relative group transition-all duration-300 ease-in-out">
            لیست کد تخفیف
          </span>
        </div>
        <div className="flex flex-col md:flex-row justify-end items-center mt-4 md:mt-0 gap-2 w-full md:w-2/3">
          <Input
            type="text"
            value={discountSearch}
            onChange={(e: any) => {
              const value = e.target.value;
              setDiscountSearch(value);
              table.getColumn("code")?.setFilterValue(value);
            }}
            placeholder="کد تخفیف مورد نظر را جستجو کنید..."
            className=" p-2 rounded-md border-2 border-amber-500 w-full md:w-2/3"
          />
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                <IoAdd size={20} className="ml-2" />
                افزودن کد تخفیف
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>افزودن کد تخفیف جدید</DialogTitle>
                <DialogDescription>
                  اطلاعات کد تخفیف جدید را وارد کنید
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="code" className="text-right">
                    کد تخفیف
                  </Label>
                  <Input
                    id="code"
                    value={newDiscount.code}
                    onChange={(e) =>
                      setNewDiscount({ ...newDiscount, code: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="percent" className="text-right">
                    درصد تخفیف
                  </Label>
                  <Input
                    id="percent"
                    type="number"
                    value={newDiscount.percent}
                    onChange={(e) =>
                      setNewDiscount({ ...newDiscount, percent: e.target.value })
                    }
                    className="col-span-3"
                    placeholder="مثال: 20"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    مبلغ تخفیف
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newDiscount.amount}
                    onChange={(e) =>
                      setNewDiscount({ ...newDiscount, amount: e.target.value })
                    }
                    className="col-span-3"
                    placeholder="مثال: 50000"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="expires_in" className="text-right">
                    مدت اعتبار (روز)
                  </Label>
                  <Input
                    id="expires_in"
                    type="number"
                    value={newDiscount.expires_in}
                    onChange={(e) =>
                      setNewDiscount({ ...newDiscount, expires_in: e.target.value })
                    }
                    className="col-span-3"
                    placeholder="مثال: 30"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="limit" className="text-right">
                    محدودیت استفاده
                  </Label>
                  <Input
                    id="limit"
                    type="number"
                    value={newDiscount.limit}
                    onChange={(e) =>
                      setNewDiscount({ ...newDiscount, limit: e.target.value })
                    }
                    className="col-span-3"
                    placeholder="مثال: 100"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={handleCreateDiscount}
                  disabled={createDiscount.isPending}
                  className="bg-amber-500 hover:bg-amber-600"
                >
                  {createDiscount.isPending ? "در حال ایجاد..." : "ایجاد کد تخفیف"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="overflow-x-auto  rounded-xl">
        <table className="min-w-full  table-auto text-sm">
          <thead className="bg-gradient-to-l from-[#915201] to-[#D27700] text-amber-50 dark:bg-gray-500 text-center">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="p-4  font-bold cursor-pointer text-center select-none"
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
            {isLoading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-12 text-gray-500 dark:text-gray-400"
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">
                      در حال بارگذاری...
                    </p>
                  </div>
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-12 text-gray-500 dark:text-gray-400"
                >
                  <div className="flex flex-col items-center justify-center">
                    <PiWarningCircleBold
                      size={80}
                      className=" text-amber-500 mb-4"
                    />
                    <p className="text-xl font-bold text-gray-700 dark:text-gray-300">
                      موردی یافت نشد
                    </p>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                      هیچ کد تخفیفی یافت نشد
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row: any, index: number) => (
                <tr
                  key={row.id}
                  className={`${
                    index % 2 === 0
                      ? "bg-[#ebebe9] dark:bg-gray-800/80"
                      : "bg-[#F8F8F8] dark:bg-gray-700/80"
                  } hover:bg-amber-100/70 dark:hover:bg-gray-600 transition-colors duration-200 text-center`}
                >
                  {row.getVisibleCells().map((cell: any) => (
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
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="w-full flex flex-col-reverse md:flex-row justify-between items-center gap-5 md:gap-2">
        <div className=" flex flex-col xl:flex-row items-center gap-3">
          <Select>
            <SelectTrigger className="w-28">
              <SelectValue placeholder="نمایش" />
            </SelectTrigger>
          </Select>
          <Pagination dir="ltr" className="mt-6 w-full">
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => goToPage(currentPage - 1)}
                  />
                </PaginationItem>
              )}

              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={page === currentPage}
                      onClick={() => goToPage(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext onClick={() => goToPage(currentPage + 1)} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}