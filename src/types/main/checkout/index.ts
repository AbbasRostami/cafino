import { CartApiResponse } from "@/store/cartStore";
import { Address } from "@/types/Profile";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

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
  isAvailable?: boolean;
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
  cart: CartApiResponse | null;
  onBackClick: () => void;
  onClearCart: () => void;
  clearLoading: boolean;
}

export interface OrderSummaryProps {
  cart: CartApiResponse | null;
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

export interface DiscountSectionProps {
  cart: CartApiResponse;
  onSubmit: (data: DiscountFormValues) => void;
  onRemove: () => void;
  isDiscountApplied: boolean;
  addDiscountLoading: boolean;
  removeDiscountLoading: boolean;
  errors: FieldErrors<DiscountFormValues>;
  register: UseFormRegister<DiscountFormValues>;
  handleSubmit: UseFormHandleSubmit<DiscountFormValues>;
}

// Address Section

export interface SelectedAddressDisplayProps {
  selectedAddress: Address | null;
  onEditAddress: () => void;
}

export interface AddAddressModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export interface AddressSelectorProps {
  addresses: Address[] | undefined;
  selectedAddressId: string | null;
  onAddressSelect: (addressId: string) => void;
  isLoading: boolean;
  onAddressAdded?: () => void;
}
