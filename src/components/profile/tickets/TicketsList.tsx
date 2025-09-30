"use client";

import { TicketsListProps } from "@/types/Profile";
import { MotionDiv } from "@/utils/MotionWrapper";
import { formatJalaliDate } from "@/utils/formatters";
import { Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import TicketsPagination from "./TicketsPagination";
import { TicketsEmptyState, NoTicketsFoundState } from "./EmptyStates";
import {
  TooltipContent,
  Tooltip,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { TicketListSkeleton } from "../../skeleton/Profile/tickets";
import TicketFilter from "./TicketFilter";

const statusConfig: Record<
  string,
  { label: string; icon: React.ReactNode; className: string }
> = {
  open: {
    label: "در حال بررسی",
    icon: <AlertCircle size={16} />,
    className:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  },
  answered: {
    label: "بررسی و پاسخ داده شد",
    icon: <CheckCircle size={16} />,
    className:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  },
  closed: {
    label: "بسته شده",
    icon: <XCircle size={16} />,
    className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  },
};

export default function TicketsList({
  tickets,
  isLoading,
  newTicket,
  filters,
  onFilterChange,
  onTicketSelect,
  totalPages,
}: TicketsListProps) {
  if (isLoading) {
    return <TicketListSkeleton />;
  }

  if (tickets?.length === 0) {
    const hasActiveFilters = filters.status || filters.sortBy;

    if (hasActiveFilters) {
      return (
        <div className="space-y-6 bg-white dark:bg-gray-900 rounded-2xl p-6">
          <TicketFilter
            filters={filters}
            onFilterChange={onFilterChange}
            newTicket={newTicket}
          />
          <NoTicketsFoundState onAction={newTicket} actionText="تیکت جدید" />
        </div>
      );
    }

    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6">
        <TicketsEmptyState onAction={newTicket} actionText="تیکت جدید" />
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-white dark:bg-gray-900 rounded-2xl p-6">
      <TicketFilter
        filters={filters}
        onFilterChange={onFilterChange}
        newTicket={newTicket}
      />

      <div className="space-y-3">
        {tickets?.map((ticket: any, index: number) => (
          <MotionDiv
            key={ticket?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => onTicketSelect(ticket)}
            className="p-4 border border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:border-amber-300 dark:hover:border-amber-600 hover:shadow-lg transition-all"
          >
            <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
              <div className="flex-1 min-w-0 ">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="truncate max-w-[200px]  sm:max-w-fit font-semibold  text-gray-900 dark:text-gray-100 mb-1 line-clamp-2 cursor-default">
                        {ticket?.subject}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm text-justify line-clamp-2">
                        {ticket?.subject}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 m">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    {formatJalaliDate(ticket?.created_at)}
                  </div>
                </div>
              </div>
              <div className="w-full sm:w-auto flex justify-end sm:justify-start items-center gap-1">
                <Badge
                  className={`flex items-center gap-1 ${
                    statusConfig[ticket?.status].className
                  }`}
                >
                  {statusConfig[ticket?.status].icon}
                  {statusConfig[ticket?.status].label}
                </Badge>
              </div>
            </div>
          </MotionDiv>
        ))}
      </div>

      <TicketsPagination
        totalItems={totalPages}
        filters={filters}
        onFilterChange={onFilterChange}
      />
    </div>
  );
}
