export interface CartItemData {
  image: string;
  itemId: string;
  title: string;
  description: string;
  count: number;
  images: string[];
  price: number;
  discount: number;
  finalPrice: number;
  category: {
    title: string;
  };
  quantity: any;
  isFav?: boolean;
  isAvailable?: boolean;
}

export interface CartApiResponse {
  totalAmount: number;
  totalDiscount: number;
  paymentAmount: number;
  cartItems: CartItemData[];
  generalDiscount?: {
    title: string;
    amount: number;
  };
  statusCode?: number;
}

export interface CartSidebarState {
  isOpen: boolean;
  isAuthenticated: boolean;
  cartData: CartApiResponse | null;
  isCartLoading: boolean;
  cartError: any;
}

export interface CartSidebarItemsProps {
  cartData: CartApiResponse | null;
  isCartLoading: boolean;
}

export interface CartSidebarHeaderProps {
  cartData: CartApiResponse | null;
  onClearCart: () => void;
  isClearLoading: boolean;
}

export interface CartSidebarFooterProps {
  cartData: CartApiResponse | null;
  isAuthenticated: boolean;
  onClose: () => void;
}

export interface CartItemCardProps {
  item: CartItemData;
}

export interface CartSidebarTriggerProps {
  cartData: CartApiResponse | null;
  onOpen: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
