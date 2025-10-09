// Import shared types
import type {
  TicketUser,
  Ticket,
  TicketMessage,
  CreateTicketRequest,
  CreateTicketResponse,
  AddMessageRequest,
  AddMessageResponse,
  GetTicketMessagesResponse,
  GetUserTicketsResponse,
  TicketFilters,
  TicketPaginationInfo,
} from "@/types/shared";

// Re-export shared types
export type {
  TicketUser,
  Ticket,
  TicketMessage,
  CreateTicketRequest,
  CreateTicketResponse,
  AddMessageRequest,
  AddMessageResponse,
  GetTicketMessagesResponse,
  GetUserTicketsResponse,
  TicketFilters,
  TicketPaginationInfo,
};

// Props

export interface TicketsPaginationProps {
  totalItems: number;
  filters: TicketFilters;
  onFilterChange: (key: keyof TicketFilters, value?: string | number) => void;
}

export interface TicketsListProps {
  tickets: any;
  newTicket: () => void;
  isLoading: boolean;
  onTicketSelect: (ticket: Ticket) => void;
  totalPages: number;
  filters: TicketFilters;
  onFilterChange: (key: keyof TicketFilters, value?: string | number) => void;
}

export interface TicketFilterProps {
  filters: TicketFilters;
  onFilterChange: (key: keyof TicketFilters, value?: string | number) => void;
  newTicket: () => void;
}

export interface TicketChatProps {
  ticket: string;
  onBack: () => void;
}

export interface NewTicketFormProps {
  onCancel: () => void;
  list?: () => void;
}
