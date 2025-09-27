import { Ticket } from "@/types/Profile";

export interface DeleteTicketResponse {
  statusCode: number;
  message: string;
}

export interface CloseTicketResponse {
  statusCode: number;
  message: string;
}

export interface GetTicketsParams {
  limit?: number;
  page?: number;
  sortBy?: string;
  status?: string;
}

export interface GetTicketsResponse {
  statusCode: number;
  message: string;
  data: {
    total: number;
    tickets: Ticket[];
    page: number;
    limit: number;
  };
}

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
