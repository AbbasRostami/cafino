"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { MenuPaginationProps } from "@/types/main";

export const MenuPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: MenuPaginationProps) => {
  return (
    <>
      <Pagination dir="ltr" className="mt-6">
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious
                className="!p-1"
                onClick={() => onPageChange(currentPage - 1)}
              />
            </PaginationItem>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => onPageChange(page)}
                className={`!px-3 !py-1 rounded-lg ${
                  page === currentPage
                    ? "bg-muted font-bold"
                    : "hover:bg-muted/50"
                }`}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext
                className="!p-1"
                onClick={() => onPageChange(currentPage + 1)}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </>
  );
};
