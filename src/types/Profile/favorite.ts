// Product types
export interface Product {
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
}

// Favorite types
export interface FavoriteItem {
  id: string;
  item: Product;
}

// API Request/Response types
export interface FavoriteListResponse {
  data: FavoriteItem[];
  total: number;
  page: number;
  limit: number;
  statusCode: number;
}

export interface AddToFavoriteRequest {
  itemId: string;
}

export interface DeleteFromFavoriteRequest {
  itemId: string;
}

// Pagination types
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Filter types
export interface FilterProps {
  selectedLimit: number;
  onLimitChange: (limit: number) => void;
  totalItems: number;
}

// Empty state types
export interface EmptyStateProps {
  onViewProducts: () => void;
}
