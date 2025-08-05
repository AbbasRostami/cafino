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

moment.loadPersian({ dialect: "persian-modern" });
const data = [
  {
    id: 1,
    houseTitle: "ملک شماره 1",
    createdAt: "2025-01-01",
    price: 1000000,
    status: "confirmed",
    actions: "actions",
  },
  {
    id: 2,
    houseTitle: "ملک شماره 2",
    createdAt: "2025-01-01",
    price: 1000000,
    status: "confirmed",
    actions: "actions",
  },
  {
    id: 3,
    houseTitle: "ملک شماره 3",
    createdAt: "2025-01-01",
    price: 1000000,
    status: "confirmed",
    actions: "actions",
  },
  {
    id: 4,
    houseTitle: "ملک شماره 4",
    createdAt: "2025-01-01",
    price: 1000000,
    status: "confirmed",
    actions: "actions",
  },
];
export default function Categories() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "id  ",
        header: "ردیف",
        cell: (info) => info.row.index + 1,
        enableSorting: true,
      },

      {
        header: "نام ملک",
        id: "houseTitle",
        accessorFn: (row) => row.houseTitle ?? "",
        cell: (info) => info.getValue(),
        enableSorting: true,
      },
      {
        header: "مسافران",
        accessorKey: "traveler_details",
        cell: ({ row }) => {
          const travelers = row.original.traveler_details;
          if (!travelers?.length) return "بدون مسافر";

          return <div className="flex flex-col gap-1"></div>;
        },
        enableSorting: false,
      },
      {
        accessorKey: "createdAt",
        header: "تاریخ رزرو",
        enableSorting: false,
        cell: (info) => {
          const date = info.getValue() as string;

          const formatted = moment(date).format("jYYYY/jMM/jDD - HH:mm");

          return <span> {formatted}</span>;
        },
      },
      {
        accessorKey: "price",
        header: "قیمت کل",
        cell: (info) => {
          const value = info.getValue();
          const numValue = typeof value === "number" ? value : Number(value);
          return `${numValue.toLocaleString("fa-IR")} تومان`;
        },
        enableSorting: true,
      },
      {
        accessorKey: "status",
        header: "وضعیت رزرو",
        cell: (info) => {
          const value = info.getValue() as string;

          const label =
            value === "confirmed"
              ? "تأیید شده"
              : value === "pending"
              ? "در انتظار"
              : value === "canceled"
              ? "لغو شده"
              : value;

          return (
            <span
              className={`text-sm px-2 py-1 rounded-xl font-normal ${
                value === "confirmed"
                  ? "bg-green-500 text-white"
                  : value === "pending"
                  ? "bg-yellow-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {label}
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
                  textValue="تایید رزرو"
                  color="success"
                  key="success"
                  onClick={() => {
                    console.log("info.row.original:", info.row.original.id);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <GiConfirmed size={20} />
                    تایید رزرو
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  textValue="لغو رزرو"
                  color="danger"
                  key="danger"
                  onClick={() => {
                    console.log("info.row.original:", info.row.original.id);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <SlBan size={20} />
                    لغو رزرو
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  textValue="جزئیات"
                  color="warning"
                  key="details"
                  onClick={() => {
                    // setSelectedRow(info.row.original);
                    // onOpen();
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
                  onClick={async () => {
                    const isConfirmed = await confirm({
                      title: "حذف رزرو",
                      description:
                        "آیا مطمئن هستید که می‌خواهید این رزرو را حذف کنید؟",
                      confirmText: "حذف",
                      cancelText: "انصراف",
                    });

                    if (isConfirmed) {
                      // deleteBooking(info.row.original.id);
                    }
                  }}
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
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  const [bookingSearch, setBookingSearch] = useState("");

  const currentPage = pagination.pageIndex + 1;
  const totalPages = Math.ceil(data.length / pagination.pageSize);

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
            لیست رزرو های مشتریان
          </span>
        </div>
        <div className="flex flex-col md:flex-row justify-end items-center mt-4 md:mt-0 gap-2 w-full md:w-1/3">
          <Input
            type="text"
            value={bookingSearch}
            onChange={(e: any) => {
              const value = e.target.value;
              setBookingSearch(value);
              table.getColumn("houseTitle")?.setFilterValue(value);
            }}
            placeholder="نام هتل مورد نظر را جستجو کنید..."
            className=" p-2 rounded-md border-2 border-amber-500 w-full md:w-2/3"
          />
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
            {/* {Array.from({ length: 5 }).map((_, i: number) => (
                <tr key={i}>
                  {Array.from({ length: columns.length }).map((_, j) => (
                    <td key={j} className="p-2">
                      <Skeleton className="h-10 w-full rounded-lg animate-pulse bg-gray-200 dark:bg-gray-700" />
                    </td>
                  ))}
                </tr>
              ))} */}
            {/* ) : table.getRowModel().rows.length === 0 ? (  */}
            {/* <tr>
              <td
                colSpan={columns.length}
                className="text-center py-12 text-gray-500 dark:text-gray-400"
              >
                <div className="flex flex-col items-center justify-center">
                  <PiSealWarningBold
                    size={80}
                    className=" text-amber-500 mb-4"
                  />
                  <p className="text-xl font-bold text-gray-700 dark:text-gray-300">
                    موردی یافت نشد
                  </p>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    هیچ کامنتی با مشخصات جستجو شده یافت نشد
                  </p>
                </div>
              </td>
            </tr> */}

            {table.getRowModel().rows.map((row: any, index: number) => (
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
            ))}
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
