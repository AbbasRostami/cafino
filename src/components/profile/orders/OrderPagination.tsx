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
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { OrdersPaginationProps } from "@/types/Profile";

export const OrdersPagination = ({
  selectedLimit,
  onLimitChange,
  totalItems,
  currentPage,
  totalPages,
  onPageChange,
}: OrdersPaginationProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-0 sm:mt-10 gap-4 p-2 sm:p-0 pb-14">
      <div className="text-sm space-x-1 text-gray-500 dark:text-gray-400">
        <span>نمایش</span>
        <span>{selectedLimit}</span>
        <span>از</span>
        <span>{totalItems}</span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-5">
        <div className="flex items-center gap-2">
          <Select
            onValueChange={(value) => onLimitChange(Number(value))}
            defaultValue={selectedLimit?.toString()}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="تعداد آیتم‌ها">
                {selectedLimit} نمایش
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="4">۴</SelectItem>
                <SelectItem value="8">۸</SelectItem>
                <SelectItem value="12">۱۲</SelectItem>
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

            {[1, 2].map((page) => (
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
            ))}

            {totalPages > 3 && currentPage > 3 && (
              <PaginationItem>
                <span className="px-3 py-2 text-gray-500">...</span>
              </PaginationItem>
            )}

            {currentPage > 2 && currentPage < totalPages - 1 && (
              <PaginationItem>
                <PaginationLink
                  isActive={true}
                  className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-600"
                  onClick={() => onPageChange(currentPage)}
                >
                  {currentPage}
                </PaginationLink>
              </PaginationItem>
            )}

            {totalPages > 3 && currentPage < totalPages - 2 && (
              <PaginationItem>
                <span className="px-3 py-2 text-gray-500">...</span>
              </PaginationItem>
            )}

            {totalPages > 2 && (
              <PaginationItem>
                <PaginationLink
                  isActive={totalPages === currentPage}
                  className={`${
                    totalPages === currentPage
                      ? "bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-600"
                      : "bg-gradient-to-l from-gray-100 to-white dark:from-gray-700 dark:to-gray-800"
                  }`}
                  onClick={() => onPageChange(totalPages)}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}

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
