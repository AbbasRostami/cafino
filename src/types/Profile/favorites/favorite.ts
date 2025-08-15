export interface FavoriteItem {
  id: string;
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

export interface FavoriteListResponse {
  slice(arg0: number, arg1: number): unknown;
  length: number;
  data: FavoriteItem[];
  total?: number;
  page?: number;
  limit?: number;
  statusCode?: number;
}

export interface FavoriteCardProps {
  favorite: FavoriteItem;
  onDelete: (itemId: string) => void;
  isPending: boolean;
}
