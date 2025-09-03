import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterAndPaginationProps } from "@/types/Profile";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

export const FilterAndPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  selectedLimit,
  onLimitChange,
  totalItems,
}: FilterAndPaginationProps) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center mt-5 sm:mt-10 gap-4 p-2 sm:p-4 pb-8">
      <div className="text-sm text-gray-500 dark:text-gray-400">
        نمایش {selectedLimit} از
        {totalItems}
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4">
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
              <SelectItem value="6">۶</SelectItem>
              <SelectItem value="12">۱۲</SelectItem>
              <SelectItem value="18">۱۸</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

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
