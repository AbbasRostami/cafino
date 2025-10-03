"use client";

import { DataTable } from "@/app/(admin)/components/common/DataTable";
import { useMemo, useState } from "react";
import { Package } from "lucide-react";
import { useCloseTicket, useDeleteTicket, useGetTickets } from "@/services";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dynamic from "next/dynamic";

import { columns } from "./columns";
import { TicketFilters } from "@/types/Profile";

const AdminTicketChatModal = dynamic(
  () => import("./AdminTicketChatModal").then((mod) => mod.default),
  { ssr: false }
);

export default function Tickets() {
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState<TicketFilters>({ page: 1, limit: 10 });
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  const handleFilterChange = (
    key: keyof TicketFilters,
    value?: string | number
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
      ...(key !== "page" ? { page: 1 } : {}),
    }));
  };

  const { tickets, isLoading, total } = useGetTickets({
    ...filters,
  });

  const {
    mutate: deleteTicket,
    isPending: isDeletingTicket,
    variables: deletingVars,
  } = useDeleteTicket();

  const {
    mutate: closeTicket,
    isPending: isClosingTicket,
    variables: closingVars,
  } = useCloseTicket();

  const headerProps = useMemo(
    () => ({
      title: "لیست تیکت ها",
      icon: <Package size={30} />,
      actions: (
        <div className="flex flex-col md:flex-row mt-2 md:mt-0 items-center gap-4">
          <div className="flex items-center gap-2">
            <Select
              value={filters.sortBy}
              onValueChange={(value) => handleFilterChange("sortBy", value)}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="مرتب سازی" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">جدیدترین</SelectItem>
                <SelectItem value="oldest">قدیمی‌ترین</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={filters.status}
              onValueChange={(value) => handleFilterChange("status", value)}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="فیلتر وضعیت‌ها" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">در انتظار تایید</SelectItem>
                <SelectItem value="answered">پاسخ داده شده</SelectItem>
                <SelectItem value="closed">بسته شده</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ),
      showColumnVisibility: true,
    }),
    [filters, handleFilterChange]
  );

  const pageSizeOptions = useMemo(() => [5, 10, 25, 50], []);

  const handleOpenChat = (ticketId: string) => {
    setSelectedTicketId(ticketId);
    setIsChatModalOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatModalOpen(false);
    setSelectedTicketId(null);
  };

  return (
    <>
      <DataTable
        data={tickets}
        columns={columns({
          // filters
          currentPage: filters.page || 1,
          currentLimit: filters.limit || 10,
          // tickets
          tickets,
          // delete ticket
          deleteTicket,
          isDeletingTicket,
          deletingVars,
          // close ticket
          closeTicket,
          isClosingTicket,
          closingVars,
          // chat modal
          onOpenChat: handleOpenChat,
        })}
        isLoading={isLoading}
        totalCount={total}
        headerProps={headerProps}
        emptyStateMessage="هیچ تیکتی یافت نشد"
        emptyStateDescription="تیکت های جدید در اینجا نمایش داده خواهند شد"
        enablePagination={true}
        page={filters.page}
        limit={filters.limit}
        onPageChange={(page) => handleFilterChange("page", page)}
        onLimitChange={(limit) => {
          handleFilterChange("limit", limit);
          handleFilterChange("page", 1);
        }}
        pageSizeOptions={pageSizeOptions}
        enableSearch={false}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />

      {/* Chat Modal */}
      <AdminTicketChatModal
        ticketId={selectedTicketId}
        isOpen={isChatModalOpen}
        onClose={handleCloseChat}
      />
    </>
  );
}
