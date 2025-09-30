"use client";

import { useState, useEffect } from "react";
import { useCancelOrder, useGetOrders } from "@/services";
import { OrderSkeleton } from "@/components/skeleton";
import { GetOrdersParams } from "@/types/Profile";
import { OrderAdmin } from "@/types/admin";
import {
  OrdersHeader,
  EmptyState,
  OrdersPagination,
  OrderDetailsModal,
  OrderCard,
} from "@/components/profile/orders";
import { confirm } from "@/components/shared/ConfirmModal";

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<OrderAdmin | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<GetOrdersParams>({
    page: 1,
    limit: 4,
  });

  const handleFilterChange = (
    key: keyof GetOrdersParams,
    value?: string | number
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
      ...(key !== "page" ? { page: 1 } : {}),
    }));
  };

  const { data: orders, isLoading, total, page, limit } = useGetOrders(filters);

  const {
    mutate: CancelOrder,
    isPending,
    cancellingOrderId,
  } = useCancelOrder();

  const totalPages = Math?.max(1, Math?.ceil(total / limit));
  const currentPage = page;

  useEffect(() => {
    if (
      !isLoading &&
      orders?.orders?.length === 0 &&
      currentPage > 1 &&
      total > 0
    ) {
      handleFilterChange("page", currentPage - 1);
    }
  }, [orders, currentPage, total, isLoading]);

  const handleViewDetails = (order: OrderAdmin) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleCancelOrder = async (orderId: string) => {
    const confirmed = await confirm({
      title: "لغو سفارش",
      description: "آیا مطمئن هستید که می‌خواهید این سفارش را لغو کنید؟",
      confirmText: "لغو سفارش",
      cancelText: "انصراف",
    });

    if (confirmed) {
      CancelOrder(orderId);
    }
  };

  if (isLoading) {
    return <OrderSkeleton />;
  }

  if (orders?.orders?.length === 0 && total === 0) {
    return <EmptyState />;
  }

  return (
    <div className="container mx-auto px-2 py-8">
      <OrdersHeader />

      <div className="flex flex-col gap-4 p-4 bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-800 rounded-lg shadow-md">
        <OrderCard
          isPending={isPending}
          cancellingOrderId={cancellingOrderId}
          CancelOrder={handleCancelOrder}
          orders={orders?.orders || []}
          onViewDetails={handleViewDetails}
        />

        <OrdersPagination
          selectedLimit={limit}
          onLimitChange={(limit: number) => handleFilterChange("limit", limit)}
          totalItems={total}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page: number) => handleFilterChange("page", page)}
        />
      </div>

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
