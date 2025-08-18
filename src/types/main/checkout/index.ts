import { CartApiResponse } from "@/store/cartStore";
import { Address } from "@/types/Profile";

// Cart Item Types
export interface CartItem {
  itemId: string;
  title: string;
  description: string;
  price: number;
  discount: number;
  quantity: number;
  image?: string;
  images?: string[];
}

// Discount Types
export interface DiscountFormValues {
  code: string;
}

export interface GeneralDiscount {
  code: string;
  discountAmount: number;
  percent?: number;
  amount?: number;
}

// Component Props Types
export interface CheckoutCartProps {
  cart: CartApiResponse;
}

export interface CheckoutHeaderProps {
  cart: CartApiResponse;
  onBackClick: () => void;
  onClearCart: () => void;
  clearLoading: boolean;
}

export interface CartItemCardProps {
  item: CartItem;
}

export interface DiscountSectionProps {
  cart: CartApiResponse;
  onSubmit: (data: DiscountFormValues) => void;
  onRemove: () => void;
  isDiscountApplied: boolean;
  addDiscountLoading: boolean;
  removeDiscountLoading: boolean;
  errors: any;
  register: any;
  handleSubmit: any;
}

export interface OrderSummaryProps {
  cart: CartApiResponse;
  isMobile?: boolean;
  selectedAddress?: Address | null;
  isAddressSelected?: boolean;
}

export interface EmptyCartProps {
  onBackToMenu: () => void;
}

// API Response Types
export interface DiscountResponse {
  success: boolean;
  message: string;
  discount?: GeneralDiscount;
}

export interface RemoveDiscountResponse {
  success: boolean;
  message: string;
}
