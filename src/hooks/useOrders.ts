import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { OrderAdmin } from "@/types";

interface UseOrdersProps {
  initialLimit?: number;
}

export const useOrders = ({ initialLimit = 4 }: UseOrdersProps) => {
  const [selectedOrder, setSelectedOrder] = useState<OrderAdmin | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedLimit, setSelectedLimit] = useState(initialLimit);

  const handleLimitChange = (value: number) => {
    setSelectedLimit(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", value.toString());
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleViewDetails = (order: OrderAdmin) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const limitParam = Number(searchParams.get("limit")) || selectedLimit;
  const pageParam = Number(searchParams.get("page")) || 1;

  return {
    selectedOrder,
    isModalOpen,
    selectedLimit,
    limitParam,
    pageParam,
    handleLimitChange,
    goToPage,
    handleViewDetails,
    handleCloseModal,
  };
};
