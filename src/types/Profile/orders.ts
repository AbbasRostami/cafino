// Order status types
export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "refunded"
  | "done"
  | "failed"
  | "canceled";

export type PaymentStatus = boolean;

// Order related types
export interface OrderAddress {
  id: string;
  province: string;
  city: string;
  address: string;
  created_at: string;
}

export interface OrderItem {
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
  };
}

export interface Payment {
  id: string;
  status: PaymentStatus;
  amount: number;
  invoice_number: string;
  authority: string;
  card_pan: string;
  card_hash: string;
  ref_id: number;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  payment_amount: number;
  discount_amount: number;
  total_amount: number;
  status: OrderStatus;
  description: string;
  address: OrderAddress;
  items: OrderItem[];
  payments: Payment[];
}

// API Response types
export interface OrdersResponse {
  data: Order[];
  total: number;
}

// Component props types
export interface OrderCardProps {
  orders: Order[];
  onViewDetails: (order: Order) => void;
  isPending: boolean;
  CancelOrder: (id: string) => void;
}
export interface OrderDetailsModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface OrdersFilterProps {
  selectedLimit: number;
  onLimitChange: (limit: number) => void;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Utility types
export interface OrderStats {
  totalAmount: number;
  itemCount: number;
  province: string;
  city: string;
  paymentStatus: boolean;
}
