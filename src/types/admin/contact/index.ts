  export interface ContactReply {
  id: string;
  subject: string;
  message: string;
  created_at: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
  replies: ContactReply[];
}

export interface GetContactsResponse {
  statusCode: number;
  message: string;
  data: {
    contacts: Contact[];
  };
}

export interface CreateContactRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface CreateContactResponse {
  statusCode: number;
  message: string;
  data: Contact;
}

export interface ReplyToContactRequest {
  subject: string;
  message: string;
}

export interface ReplyToContactResponse {
  statusCode: number;
  message: string;
  data: ContactReply;
}

export interface GetContactRepliesResponse {
  statusCode: number;
  message: string;
  data: {
    replies: ContactReply[];
  };
}


// Props

export interface UseGetContactsProps {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: string;
  name?: string;
  email?: string;
  phone?: string;
  hasReply?: boolean;
}

export interface UseReplyToContactProps {
  id: string;
  data: ReplyToContactRequest;
}

export interface UseGetContactRepliesProps {
  id: string;
}

export interface ColumnsContactProps {
  currentPage: number;
  currentLimit: number;
  onViewMessage: (contact: Contact) => void;
  onReplyToMessage: (contact: Contact) => void;
}

export interface ViewMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: Contact | null;
  onReply: () => void;
}

export interface ReplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: Contact | null;
}
