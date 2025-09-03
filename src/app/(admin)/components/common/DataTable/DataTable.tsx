"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  VisibilityState,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import { MoveDown, MoveUp, Search } from "lucide-react";
import {
  Table,
  TableRow,
  TableHeader,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

import { Pagination } from "./Pagination";
import { TableSkeletonRows } from "@/components/skeleton/admin";
import EmptyState from "@/app/(admin)/components/common/EmptyState/EmptyState";
import { DataTableHeader, TableHeaderProps } from "./TableHeader";

export interface DataTableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  isLoading?: boolean;
  headerProps?: Omit<TableHeaderProps, "table">;
  emptyStateMessage?: string;
  emptyStateDescription?: string;
  enablePagination?: boolean;
  page?: number;
  limit?: number;
  totalCount?: number;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  pageSizeOptions?: number[];
  enableSearch?: boolean;
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  className?: string;
}

export function DataTable<TData, TValue>({
  data,
  columns,
  isLoading = false,
  headerProps,
  emptyStateMessage = "هیچ داده‌ای برای نمایش وجود ندارد",
  emptyStateDescription = "برای افزودن داده جدید، روی دکمه افزودن کلیک کنید",
  enablePagination = true,
  page: externalPage,
  limit: externalLimit,
  totalCount: externalTotalCount,
  onPageChange,
  onLimitChange,
  pageSizeOptions = [5, 10, 25, 50],
  enableSearch = false,
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "جستجو...",
  className = "",
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const [internalPage, setInternalPage] = useState(1);
  const [internalLimit, setInternalLimit] = useState(10);

  const currentPage = externalPage ?? internalPage;
  const selectedLimit = externalLimit ?? internalLimit;
  const totalItems = externalTotalCount ?? data.length;

  const table = useReactTable({
    data: data || [],
    columns,
    state: {
      sorting,
      columnVisibility,
      globalFilter: enableSearch ? searchValue : undefined,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: enableSearch ? getFilteredRowModel() : undefined,
    globalFilterFn: "includesString",
    enableColumnResizing: true,
  });

  const sortedRows = table.getRowModel().rows;
  const paginatedRows = sortedRows;

  const columnCount = table.getAllColumns().length;

  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    } else {
      setInternalPage(page);
    }
  };

  const handleLimitChange = (limit: number) => {
    if (onLimitChange) {
      onLimitChange(limit);
    } else {
      setInternalLimit(limit);
      setInternalPage(1);
    }
  };

  return (
    <div
      className={`space-y-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg p-5 rounded-2xl ${className}`}
    >
      {/* Custom Header */}
      {headerProps && <DataTableHeader table={table} {...headerProps} />}

      {/* Search Bar */}
      {enableSearch && (
        <div className="flex justify-start items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 text-right"
              dir="rtl"
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <Table className="min-w-full table-auto text-sm">
          <TableHeader className="bg-gradient-to-r from-amber-600 to-amber-500 dark:from-amber-800 dark:to-amber-700 text-amber-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className={`p-4 font-bold cursor-pointer select-none hover:bg-white/10 dark:hover:bg-amber-500/20 text-center
                ${header.column.id === "id" ? "w-12" : ""}`}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted() === "asc" && (
                      <MoveUp className="inline w-4 h-4 ml-1" />
                    )}
                    {header.column.getIsSorted() === "desc" && (
                      <MoveDown className="inline w-4 h-4 ml-1" />
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody className="divide-y divide-gray-200 dark:divide-gray-700">
            {isLoading ? (
              <TableSkeletonRows columnCount={columnCount} />
            ) : table.getRowModel().rows.length === 0 && !isLoading ? (
              <EmptyState
                message={emptyStateMessage}
                description={emptyStateDescription}
              />
            ) : (
              paginatedRows.map((row, index) => (
                <TableRow
                  key={row.id}
                  className={`transition-colors duration-200 text-center ${
                    index % 2 === 0
                      ? "bg-gray-50 dark:bg-gray-800"
                      : "bg-white dark:bg-gray-900"
                  } hover:bg-amber-50/60 dark:hover:bg-amber-500/10`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={`p-3 font-bold text-gray-700 dark:text-gray-200 whitespace-nowrap
                     ${cell.column.id === "id" ? "w-12" : ""}`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {enablePagination && (
        <Pagination
          page={currentPage}
          limit={selectedLimit}
          totalCount={totalItems}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
          pageSizeOptions={pageSizeOptions}
        />
      )}
    </div>
  );
}
