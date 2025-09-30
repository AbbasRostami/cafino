import { OrderStatus } from "@/types/Profile";

export interface OrderAdmin {
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
      images: {
        imageUrl: string;
      }[];
      createdAt: string;
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

export interface GetOrdersResponse {
  statusCode: number;
  message: string;
  data: {
    total: number;
    limit: number;
    page: number;
    orders: OrderAdmin[];
  };
}

// Props

export interface OrderContentProps {
  order: OrderAdmin;
  isMobile: boolean;
}
export interface OrderColumnsProps {
  currentPage: number;
  currentLimit: number;
  orders: OrderAdmin[];
  setSelectedOrder: (order: OrderAdmin) => void;
  changeStatus: (data: { id: string; status: OrderStatus }) => void;
  isChangingStatus: boolean;
  changeVars?: {
    id: string;
    status: string;
  } | null;
}

export interface OrderDetailsProps {
  order: any;
  setSelectedOrder: (order: any) => void;
}
