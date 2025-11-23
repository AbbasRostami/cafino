export interface TicketUser {
  id: string;
  username: string;
  first_name: string | null;
  last_name: string | null;
  imageUrl: string | null;
  role: "user" | "admin" | "manager";
}

export interface Ticket {
  id: string;
  subject: string;
  status: "open" | "answered" | "closed";
  created_at: string;
  user: TicketUser;
}

// Ticket message interface based on API response
export interface TicketMessage {
  id: string;
  message: string;
  created_at: string;
  sender: TicketUser;
}

// POST /v1/ticket - Create new ticket
export interface CreateTicketRequest {
  subject: string;
  message: string;
}

export interface CreateTicketResponse {
  statusCode: number;
  message: string;
  data?: {
    ticket: Ticket;
  };
}

// GET /v1/ticket - Get all tickets (Admin)
export interface GetTicketsParams {
  limit?: number;
  page?: number;
  sortBy?: string;
  status?: "open" | "answered" | "closed";
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

// GET /v1/ticket/user - Get user tickets
export interface GetUserTicketsResponse {
  statusCode: number;
  message: string;
  data: {
    total: number;
    tickets: Ticket[];
  };
}

// GET /v1/ticket/{id}/messages - Get ticket messages
export interface GetTicketMessagesResponse {
  statusCode: number;
  message: string;
  data: {
    total: number;
    ticket: Ticket;
    messages: TicketMessage[];
  };
}

// POST /v1/ticket/{id}/messages - Add message to ticket
export interface AddMessageRequest {
  message: string;
}

export interface AddMessageResponse {
  statusCode: number;
  message: string;
}

// PATCH /v1/ticket/{id}/close - Close ticket (Admin)
export interface CloseTicketResponse {
  statusCode: number;
  message: string;
}

// DELETE /v1/ticket/{id} - Delete ticket (Admin)
export interface DeleteTicketResponse {
  statusCode: number;
  message: string;
}

export interface TicketFilters {
  status?: "open" | "answered" | "closed";
  sortBy?: "newest" | "oldest";
  page?: number;
  limit?: number;
}

export interface TicketPaginationInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
