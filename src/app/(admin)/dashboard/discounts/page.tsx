"use client";

import { DataTable } from "@/app/(admin)/components/common/DataTable";
import { useState, useMemo } from "react";
import { ClipboardPlus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dynamic from "next/dynamic";
import { columns } from "./columns";
import {
  useDeleteDiscount,
  useGetDiscounts,
  useUpdateDiscountStatus,
} from "@/services";

const CreateDiscountModal = dynamic(() => import("./create-discount"), {
  ssr: false,
});

export default function Discounts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [isActiveFilter, setIsActiveFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("newest");

  const { discounts, isLoading, total } = useGetDiscounts({
    page: currentPage,
    limit: currentLimit,
    isActive: isActiveFilter === "" ? undefined : isActiveFilter === "true",
    sortBy: sortBy || undefined,
  });

  const {
    mutate: deleteDiscount,
    isPending: isPendingDiscount,
    variables: deletingVars,
  } = useDeleteDiscount();

  const {
    mutate: updateStatusDiscount,
    isPending: isPendingStatusUpdate,
    variables: updatingVars,
  } = useUpdateDiscountStatus();

  const handleIsActiveFilterChange = (newIsActive: string) => {
    setIsActiveFilter(newIsActive);
    setCurrentPage(1);
  };

  const handleSortByChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  const headerProps = useMemo(
    () => ({
      title: "لیست کد های تخفیف",
      icon: <ClipboardPlus size={30} />,
      showColumnVisibility: true,
      actions: (
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-2">
            <Select value={sortBy} onValueChange={handleSortByChange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="مرتب‌سازی" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">جدیدترین</SelectItem>
                <SelectItem value="oldest">قدیمی‌ترین</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={isActiveFilter}
              onValueChange={handleIsActiveFilterChange}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="وضعیت فعال" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">فعال</SelectItem>
                <SelectItem value="false">غیرفعال</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <CreateDiscountModal />
        </div>
      ),
    }),
    [sortBy, handleSortByChange, isActiveFilter, handleIsActiveFilterChange]
  );

  return (
    <DataTable
      data={discounts}
      columns={columns({
        currentPage,
        currentLimit,
        deleteDiscount,
        isPendingDiscount,
        deletingVars,
        updateStatusDiscount,
        isPendingStatusUpdate,
        updatingVars,
      })}
      isLoading={isLoading}
      headerProps={headerProps}
      emptyStateMessage="هیچ کد تخفیفی یافت نشد"
      emptyStateDescription="برای افزودن کد تخفیف، روی دکمه افزودن کلیک کنید"
      enablePagination={true}
      page={currentPage}
      limit={currentLimit}
      totalCount={total}
      onPageChange={setCurrentPage}
      onLimitChange={(limit) => {
        setCurrentLimit(limit);
        setCurrentPage(1);
      }}
      pageSizeOptions={[5, 10, 25, 50]}
      enableSearch={true}
      searchValue={searchValue}
      onSearchChange={setSearchValue}
    />
  );
}
