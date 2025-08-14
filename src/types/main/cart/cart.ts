export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CartResponse {
  data: CartItem[];
  total: number;
}
