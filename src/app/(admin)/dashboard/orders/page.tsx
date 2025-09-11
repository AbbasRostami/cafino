"use client";

import { DataTable } from "@/app/(admin)/components/common/DataTable";
import { useMemo, useState } from "react";
import { Package } from "lucide-react";
import { useGetOrdersAdmin, useChangeOrderStatus } from "@/services";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { columns } from "./Columns";
import { OrderAdmin } from "@/types/admin";

export default function Orders() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState<OrderAdmin | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("newest");

  const { orders, isLoading, total } = useGetOrdersAdmin({
    page: currentPage,
    limit: currentLimit,
    status: statusFilter || undefined,
    sortBy: sortBy || undefined,
  });

  const {
    mutate: changeStatus,
    isPending: isChangingStatus,
    variables: changeVars,
  } = useChangeOrderStatus();

  const handleStatusFilterChange = (newStatus: string) => {
    setStatusFilter(newStatus);
    setCurrentPage(1);
  };

  const handleSortByChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  const headerProps = useMemo(
    () => ({
      title: "لیست سفارشات",
      icon: <Package size={30} />,
      actions: (
        <div className="flex flex-col md:flex-row mt-2 md:mt-0 items-center gap-4">
          <div className="flex items-center gap-2">
            <Select value={sortBy} onValueChange={handleSortByChange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="مرتب‌سازی" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">جدیدترین</SelectItem>
                <SelectItem value="oldest">قدیمی‌ترین</SelectItem>
                <SelectItem value="total_amount">مبلغ سفارش</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={statusFilter}
              onValueChange={handleStatusFilterChange}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="فیلتر وضعیت‌ها" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">در انتظار تایید</SelectItem>
                <SelectItem value="processing">در حال پردازش</SelectItem>
                <SelectItem value="delivered">تحویل داده شده</SelectItem>
                <SelectItem value="done">تکمیل شده</SelectItem>
                <SelectItem value="failed">ناموفق</SelectItem>
                <SelectItem value="canceled">لغوشده</SelectItem>
                <SelectItem value="refunded">بازگشت وجه</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ),
      showColumnVisibility: true,
    }),
    [statusFilter, handleStatusFilterChange, sortBy, handleSortByChange]
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
        changeStatus,
        isChangingStatus,
        changeVars,
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
