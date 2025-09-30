// shared types
export interface TicketUser {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  image: string;
  role: string;
  imageUrl: string;
}

export interface Ticket {
  id: string;
  subject: string;
  status: "open" | "answered" | "closed";
  created_at: string;
  user: TicketUser;
  length: number;
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

export interface GetTicketMessagesResponse {
  statusCode: number;
  message: string;
  data: {
    tickets: Ticket;
    messages: TicketMessage[];
    total: number;
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
