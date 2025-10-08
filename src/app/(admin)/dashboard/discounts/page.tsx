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
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    isActive: "",
    sortBy: "newest",
  });

  const { discounts, isLoading, total } = useGetDiscounts({
    page: filters.page,
    limit: filters.limit,
    isActive: filters.isActive === "" ? undefined : filters.isActive === "true",
    sortBy: filters.sortBy || undefined,
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
    setFilters({ ...filters, isActive: newIsActive });
  };

  const handleSortByChange = (newSortBy: string) => {
    setFilters({ ...filters, sortBy: newSortBy });
  };

  const headerProps = useMemo(
    () => ({
      title: "لیست کد های تخفیف",
      icon: <ClipboardPlus size={30} />,
      showColumnVisibility: true,
      actions: (
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-2">
            <Select value={filters.sortBy} onValueChange={handleSortByChange}>
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
              value={filters.isActive}
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
    [
      filters.sortBy,
      handleSortByChange,
      filters.isActive,
      handleIsActiveFilterChange,
    ]
  );

  return (
    <DataTable
      data={discounts}
      columns={columns({
        currentPage: filters.page,
        currentLimit: filters.limit,
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
      page={filters.page}
      limit={filters.limit}
      totalCount={total}
      onPageChange={(page) => setFilters({ ...filters, page })}
      onLimitChange={(limit) => {
        setFilters({ ...filters, limit, page: 1 });
      }}
      pageSizeOptions={[5, 10, 25, 50]}
      enableSearch={true}
      searchValue={filters.search}
      onSearchChange={(search) => setFilters({ ...filters, search })}
    />
  );
}
