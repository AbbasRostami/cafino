"use client";

import { useState, useEffect } from "react";
import {
  Pagination as PaginationUI,
  PaginationPrevious,
  PaginationLink,
  PaginationItem,
  PaginationContent,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  Select,
  SelectItem,
  SelectGroup,
  SelectContent,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";

export interface PaginationProps {
  page: number;
  limit: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  pageSizeOptions?: number[];
  className?: string;
  showInfo?: boolean;
  showPageSizeSelector?: boolean;
}

export function Pagination({
  page,
  limit,
  totalCount,
  onPageChange,
  onLimitChange,
  pageSizeOptions = [5, 10, 25, 50],
  className = "",
  showInfo = true,
  showPageSizeSelector = true,
}: PaginationProps) {
  const [totalPages, setTotalPages] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setTotalPages(Math.ceil(totalCount / limit));
  }, [totalCount, limit]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const siblings = isMobile ? 0 : 1;

  const showPages = () => {
    const pages = [];

    const startPage = Math.max(page - siblings, 2);
    const endPage = Math.min(page + siblings, totalPages - 1);

    pages.push(
      <PaginationItem key={1}>
        <PaginationLink onClick={() => onPageChange(1)} isActive={page === 1}>
          1
        </PaginationLink>
      </PaginationItem>
    );

    if (startPage > 2) {
      pages.push(<PaginationEllipsis key="start-ellipsis" />);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink isActive={i === page} onClick={() => onPageChange(i)}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages - 1) {
      pages.push(<PaginationEllipsis key="end-ellipsis" />);
    }

    if (totalPages > 1) {
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => onPageChange(totalPages)}
            isActive={page === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  if (totalPages === 0) return null;

  return (
    <div
      className={`flex flex-col lg:flex-row justify-between items-center mt-4 gap-4 p-2 ${className}`}
    >
      {showInfo && (
        <div className="text-sm text-gray-500 dark:text-gray-400">
          نمایش {limit} از {totalCount}
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center gap-4">
        {showPageSizeSelector && (
          <Select
            onValueChange={(value) => {
              onLimitChange(Number(value));
              onPageChange(1);
            }}
            value={limit.toString()}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue />
              <span>نمایش</span>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {pageSizeOptions.map((option) => (
                  <SelectItem key={option} value={option.toString()}>
                    {option}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}

        <PaginationUI dir="ltr">
          <PaginationContent className="overflow-x-auto whitespace-nowrap">
            {page > 1 && (
              <PaginationItem>
                <PaginationPrevious onClick={() => onPageChange(page - 1)} />
              </PaginationItem>
            )}

            {showPages()}

            {page < totalPages && (
              <PaginationItem>
                <PaginationNext onClick={() => onPageChange(page + 1)} />
              </PaginationItem>
            )}
          </PaginationContent>
        </PaginationUI>
      </div>
    </div>
  );
}
