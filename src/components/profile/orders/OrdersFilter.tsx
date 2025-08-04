"use client";
import {
  Pagination,
  PaginationPrevious,
  PaginationLink,
  PaginationItem,
  PaginationContent,
  PaginationNext,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrdersFilterProps } from "@/types/Profile";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

export const OrdersFilter = ({
  selectedLimit,
  onLimitChange,
  totalItems,
  currentPage,
  totalPages,
  onPageChange,
}: OrdersFilterProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-0 sm:mt-10 gap-4 p-2 sm:p-0 pb-14">
      <div className="text-sm text-gray-500 dark:text-gray-400">
        نمایش {selectedLimit?.toLocaleString("fa-IR")} از
        {totalItems?.toLocaleString("fa-IR")}
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-5">
        <div className="flex items-center gap-2">
          <Select
            onValueChange={(value) => onLimitChange(Number(value))}
            defaultValue={selectedLimit?.toString()}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="تعداد آیتم‌ها">
                {selectedLimit?.toLocaleString("fa-IR")} نمایش
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="4">۴</SelectItem>
                <SelectItem value="10">۸</SelectItem>
                <SelectItem value="15">۱۲</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Pagination dir="ltr">
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationLink
                  className="!p-1"
                  onClick={() => onPageChange(1)}
                >
                  <ChevronsLeft />
                </PaginationLink>
              </PaginationItem>
            )}

            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  className="!p-1"
                  onClick={() => onPageChange(currentPage - 1)}
                />
              </PaginationItem>
            )}

            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={page === currentPage}
                    className={`${
                      page === currentPage
                        ? "bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-600"
                        : "bg-gradient-to-l from-gray-100 to-white dark:from-gray-700 dark:to-gray-800"
                    }`}
                    onClick={() => onPageChange(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext
                  className="!p-1"
                  onClick={() => onPageChange(currentPage + 1)}
                />
              </PaginationItem>
            )}

            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationLink
                  className="!p-1"
                  onClick={() => onPageChange(totalPages)}
                >
                  <ChevronsRight />
                </PaginationLink>
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
