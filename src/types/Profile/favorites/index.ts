export interface FavoriteItem {
  id: string;
  isAvailable: boolean;
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
  data: {
    items: FavoriteItem[];
    total: number;
    page: number;
    limit: number;
  };
  statusCode?: number;
}

export interface FavoriteCardProps {
  favorite: FavoriteItem;
}

export interface GetFavoritesParams {
  limit?: number;
  page?: number;
  sortBy?: string;
}

export interface FilterAndPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  selectedLimit: number;
  onLimitChange: (limit: number) => void;
  totalItems: number;
}
