"use client";
import { useGetDiscounts } from "@/services";
import { DataTable } from "@/app/(admin)/components/common/DataTable";
import { useState, useMemo } from "react";
import { ClipboardPlus } from "lucide-react";
import { CreateDiscountModal } from "./CreateDiscount/CreateDiscountModal";
import { columns } from "./columns";

export default function Discounts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [searchValue, setSearchValue] = useState("");

  const { discounts, isLoading, total } = useGetDiscounts({
    page: currentPage,
    limit: currentLimit,
  });

  const headerProps = useMemo(
    () => ({
      title: "لیست کد های تخفیف",
      icon: <ClipboardPlus size={30} />,
      showColumnVisibility: true,
      actions: <CreateDiscountModal />,
    }),
    []
  );

  return (
    <DataTable
      data={discounts}
      columns={columns({
        currentPage,
        currentLimit,
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
