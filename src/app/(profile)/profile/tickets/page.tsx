"use client";

import { useState } from "react";
import { useGetUserTickets } from "@/services";
import { Ticket, TicketFilters } from "@/types/Profile";
import {
  TicketsList,
  TicketChat,
  NewTicketForm,
} from "@/components/profile/tickets";

export default function TicketsPage() {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [view, setView] = useState<"list" | "chat" | "new">("list");
  const [filters, setFilters] = useState<TicketFilters>({ page: 1, limit: 5 });

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

  const { data: ticketsData, isLoading } = useGetUserTickets({
    ...filters,
  });

  const handleTicketSelect = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setView("chat");
  };

  const handleBackToList = () => {
    setView("list");
    setSelectedTicket(null);
  };

  return (
    <>
      <div className="h-full mb-12 ">
        {view === "list" && (
          <TicketsList
            totalPages={ticketsData?.data?.total || 0}
            filters={filters}
            onFilterChange={handleFilterChange}
            tickets={ticketsData?.data?.tickets as Ticket}
            isLoading={isLoading}
            newTicket={() => setView("new")}
            onTicketSelect={handleTicketSelect}
          />
        )}

        {view === "chat" && selectedTicket && (
          <div className="lg:static md:h-auto  fixed inset-0 z-50 ">
            <TicketChat ticket={selectedTicket?.id} onBack={handleBackToList} />
          </div>
        )}

        {view === "new" && (
          <NewTicketForm
            list={() => setView("list")}
            onCancel={handleBackToList}
          />
        )}
      </div>
    </>
  );
}
