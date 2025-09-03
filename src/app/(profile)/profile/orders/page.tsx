"use client";

import { useCancelOrder, useGetOrders } from "@/services";
import { OrderSkeleton } from "@/components/skeleton";
import {
  OrdersHeader,
  EmptyState,
  OrdersFilter,
  OrderDetailsModal,
  OrderCard,
} from "@/components/profile/orders";
import { useOrders } from "@/hooks/useOrders";
import { Suspense } from "react";

const OrdersPageClient = () => {
  const {
    selectedOrder,
    isModalOpen,
    limitParam,
    pageParam,
    handleLimitChange,
    goToPage,
    handleViewDetails,
    handleCloseModal,
  } = useOrders({ initialLimit: 4 });

  // Data fetching

  const { data: orders, isLoading } = useGetOrders(limitParam, pageParam);
  const { mutate: CancelOrder, isPending } = useCancelOrder();

  // Calculate pagination
  const totalParam = Number(orders?.total) || 0;
  const totalPages = Math.max(1, Math.ceil(totalParam / limitParam));
  const currentPage = pageParam;

  if (isLoading) {
    return <OrderSkeleton />;
  }

  if (orders?.orders?.length === 0) {
    return <EmptyState />;
  }

  console.log(orders);
  
  return (
    <div className="container mx-auto px-2 py-8">
      <OrdersHeader />

      <div className="flex flex-col gap-4 p-4 bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-800 rounded-lg shadow-md">
        <OrderCard
          isPending={isPending}
          CancelOrder={CancelOrder}
          orders={orders?.orders || []}
          onViewDetails={handleViewDetails}
        />

        <OrdersFilter
          selectedLimit={limitParam}
          onLimitChange={handleLimitChange}
          totalItems={totalParam}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
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
};

export default function OrdersPage() {
  return (
    <Suspense fallback={<div>Loading orders...</div>}>
      <OrdersPageClient />
    </Suspense>
  );
}
