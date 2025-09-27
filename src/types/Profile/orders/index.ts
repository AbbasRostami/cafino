import { OrderAdmin } from "@/types/admin";

export type OrderStatus =
  | "pending"
  | "processing"
  | "delivered"
  | "cancelled"
  | "refunded"
  | "done"
  | "failed"
  | "canceled";

export interface OrderProfile {
  id: string;
  payment_amount: number;
  discount_amount: number;
  total_amount: number;
  status: OrderStatus;
  description: string;
  user: {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    birthday: string;
    image: string | null;
    imageUrl: string | null;
    phone: string;
    email: string;
    role: string;
    new_email: string | null;
    new_phone: string | null;
    is_email_verified: boolean;
    status: string;
    rt_hash: string;
    created_at: string;
    updated_at: string;
  };
  address: {
    id: string;
    province: string;
    city: string;
    address: string;
    created_at: string;
  } | null;
  items: {
    id: string;
    count: number;
    item: {
      id: string;
      title: string;
      ingredients: string[];
      description: string;
      price: number;
      discount: number;
      quantity: number;
      rate: number;
      rate_count: number;
      show: boolean;
      createdAt: string;
      images: {
        imageUrl: string;
      }[];
    };
  }[];
  payments: {
    id: string;
    status: boolean;
    amount: number;
    invoice_number: string;
    authority: string;
    card_pan: string;
    card_hash: string;
    ref_id: number;
    created_at: string;
    updated_at: string;
  }[];
}

export interface GetOrdersResponseProfile {
  length: number;
  orders?: OrderProfile[];
  total: number;
  page: number;
  limit: number;
}

export interface ChangeOrderStatusRequest {
  id: string;
  status: OrderStatus;
}

export interface OrderCardProps {
  orders: OrderProfile[];
  onViewDetails: (order: OrderAdmin) => void;
  isPending: boolean;
  cancellingOrderId: string | null;
  CancelOrder: (orderId: string) => void;
}

export interface OrderDetailsModalProps {
  order: OrderProfile;
  isOpen: boolean;
  onClose: () => void;
}

export interface GetOrdersParams {
  limit?: number;
  page?: number;
  sortBy?: string;
  status?: string;
}

export interface OrdersPaginationProps {
  selectedLimit: number;
  onLimitChange: (limit: number) => void;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
