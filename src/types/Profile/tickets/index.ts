// shared types
export interface TicketUser {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  image: string;
  role: string;
}

export interface Ticket {
  id: string;
  subject: string;
  status: "open" | "answered" | "closed";
  created_at: string;
  user: TicketUser;
}

export interface TicketMessage {
  id: string;
  message: string;
  created_at: string;
  sender: TicketUser;
}

export interface CreateTicketRequest {
  subject: string;
  message: string;
}

export interface AddMessageRequest {
  message: string;
}

export interface GetTicketsResponse {
  statusCode: number;
  message: string;
  data: {
    total: number;
    tickets: Ticket[];
  };
}

export interface GetTicketMessagesResponse {
  statusCode: number;
  message: string;
  data: {
    ticket: Ticket;
    messages: TicketMessage[];
  };
}

export interface CreateTicketResponse {
  statusCode: number;
  message: string;
  data?: {
    ticket: Ticket;
  };
}

export interface AddMessageResponse {
  statusCode: number;
  message: string;
}

export interface GetTicketsParams {
  limit?: number;
  page?: number;
  sortBy?: string;
  status?: string;
}

export interface TicketFilters {
  status?: "open" | "answered" | "closed";
  sortBy?: "newest" | "oldest";
  page?: number;
  limit?: number;
}

// Props

export interface TicketsPaginationProps {
  totalItems: number;
  filters: TicketFilters;
  onFilterChange: (key: keyof TicketFilters, value?: string | number) => void;
}

export interface TicketsListProps {
  tickets: Ticket[];
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
