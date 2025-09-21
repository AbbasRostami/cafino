"use client";

import { TicketsPaginationProps } from "@/types/Profile";
import {
  Pagination,
  PaginationLink,
  PaginationItem,
  PaginationContent,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";

export default function TicketsPagination({
  totalItems,
  filters,
  onFilterChange,
}: TicketsPaginationProps) {
  const totalPages = Math.ceil(totalItems / (filters.limit || 10));

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center mt-5 sm:mt-5 gap-4 p-2 sm:p-4 pb-8">
      <div className="text-sm text-gray-500 dark:text-gray-400">
        نمایش {filters.limit} از {totalItems}
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Select
          value={filters.limit?.toString() || "10"}
          onValueChange={(val) => onFilterChange("limit", val)}
        >
          <SelectTrigger className="w-[120px] border-gray-300 dark:border-gray-600">
            <SelectValue placeholder="تعداد آیتم‌ها">
              {filters.limit} نمایش
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="6">۶</SelectItem>
              <SelectItem value="12">۱۲</SelectItem>
              <SelectItem value="18">۱۸</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {totalPages > 1 && (
          <Pagination dir="ltr">
            <PaginationContent>
              {filters.page! > 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      onFilterChange("page", (filters.page || 1) - 1)
                    }
                    className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  />
                </PaginationItem>
              )}

              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                const isActive = page === filters.page;
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={isActive}
                      className={`transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-600"
                          : "bg-gradient-to-l from-gray-100 to-white dark:from-gray-700 dark:to-gray-800"
                      }`}
                      onClick={() => onFilterChange("page", page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              {filters.page! < totalPages && (
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      onFilterChange("page", (filters.page || 1) + 1)
                    }
                    className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
