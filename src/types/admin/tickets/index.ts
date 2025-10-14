import type {
  Ticket,
  TicketUser,
  TicketMessage,
  GetTicketsParams,
  GetTicketsResponse,
  DeleteTicketResponse,
  CloseTicketResponse,
  TicketFilters,
  TicketPaginationInfo,
} from "@/types/shared";

export type {
  Ticket,
  TicketUser,
  TicketMessage,
  GetTicketsParams,
  GetTicketsResponse,
  DeleteTicketResponse,
  CloseTicketResponse,
  TicketFilters,
  TicketPaginationInfo,
};

// Props
export interface TicketColumnsProps {
  currentPage: number;
  currentLimit: number;
  tickets: Ticket[];
  deleteTicket: (data: { id: string }) => void;
  isDeletingTicket: boolean;
  deletingVars: { id: string } | null | undefined;
  closeTicket: (data: { ticketId: string }) => void;
  isClosingTicket: boolean;
  closingVars: { ticketId: string } | null | undefined;
  onOpenChat: (ticketId: string) => void;
}
