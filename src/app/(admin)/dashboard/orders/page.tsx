"use client";

import { DataTable } from "@/app/(admin)/components/common/DataTable";
import { useMemo, useState } from "react";
import { Package } from "lucide-react";
import { useGetOrdersAdmin } from "@/services";

import { columns } from "./Columns";
import { OrderAdmin } from "@/types/admin";

export default function Orders() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState<OrderAdmin | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const { orders, isLoading, total } = useGetOrdersAdmin({
    page: currentPage,
    limit: currentLimit,
  });

  const headerProps = useMemo(
    () => ({
      title: "لیست سفارشات",
      icon: <Package size={30} />,
      showColumnVisibility: true,
    }),

    []
  );

  const pageSizeOptions = useMemo(() => [5, 10, 25, 50], []);

  return (
    <DataTable
      data={orders}
      columns={columns({
        currentPage,
        currentLimit,
        orders, 
        setSelectedOrder,
      })}
      isLoading={isLoading}
      totalCount={total}
      headerProps={headerProps}
      emptyStateMessage="هیچ سفارشی یافت نشد"
      emptyStateDescription="سفارشات جدید در اینجا نمایش داده خواهند شد"
      enablePagination={true}
      page={currentPage}
      limit={currentLimit}
      onPageChange={setCurrentPage}
      onLimitChange={(limit) => {
        setCurrentLimit(limit);
        setCurrentPage(1);
      }}
      pageSizeOptions={pageSizeOptions}
      enableSearch={false}
      searchValue={searchValue}
      onSearchChange={setSearchValue}
    />
  );
}
