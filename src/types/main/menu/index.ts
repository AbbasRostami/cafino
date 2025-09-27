// Menu Item Types
export interface MenuItem {
  [x: string]: any;
  id: string;
  title: string;
  ingredients: string[];
  description: string;
  price: number;
  discount: number;
  quantity: number;
  rate: number;
  rate_count: number;
  createdAt: string | Date;
  category: {
    title: string;
  };
  images: {
    image: string;
    imageUrl: string;
  }[];
  isFav: boolean;
}
export interface MenuItemResponse {
  data: {
    items: MenuItem[];
    total: number;
    page: number;
    limit: number;
  };
}
// Category Types
export interface Category {
  id: string;
  title: string;
  image: string;
  imageUrl: string;
  show: boolean;
}

export interface CategoryResponseMenu {
  data: Category[];
  totalCount: number;
}

// Component Props Types
export interface MenusProps {
  items: MenuItem[];
  isLoading: boolean;
  page: number;
  limit: number;
  total: number;
}

export interface MenuItemCardProps {
  item: MenuItem;
  viewMode: "grid" | "list";
}

export interface SearchBarProps {
  input: string;
  setInput: (value: string) => void;
}

export interface MenuControlsProps {
  selectedSortBy: string;
  onSortChange: (value: string) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (value: "grid" | "list") => void;
  onClearFilters: () => void;
}

export interface MenuPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Filter Types
export interface FilterState {
  selectedCategoryId: string | null;
  priceRange: [number, number];
  isAvailableOnly: boolean;
}

export interface FilterSidebarProps {
  categories: Category[];
  selectedCategoryId: string | null;
  priceRange: [number, number];
  isAvailableOnly: boolean;
  onCategoryChange: (category: string | null) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  onAvailableOnlyChange: (value: boolean) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

// Stock Status Types
export interface StockStatus {
  isOutOfStock: boolean;
  isLowStock: boolean;
  isMediumStock: boolean;
  stockMessage: string;
  stockColor: string;
  progressColor: string;
  progressWidth: string;
}

// Price Calculation Types
export interface PriceInfo {
  originalPrice: number;
  finalPrice: number;
  discount: number;
  hasDiscount: boolean;
}

export interface MenuGridProps {
  items: MenuItem[];
  viewMode: "grid" | "list";
}

export interface MobileSheetProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  categories: any;
  FilterSectionHeader: React.FC<{ title: string }>;
  handleMinPriceInputChange: (value: number) => void;
  handleMaxPriceInputChange: (value: number) => void;
  DEFAULT_MIN: number;
  DEFAULT_MAX: number;
}

export interface DesktopSidebarProps {
  className?: string;
  categories: any;
  filters: any;
  updateFilter: (
    updates: Record<string, string | number | boolean | null>
  ) => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
  FilterSectionHeader: React.FC<{ title: string }>;
  DEFAULT_MIN: number;
  DEFAULT_MAX: number;
  handleMinPriceInputChange: (value: number) => void;
  handleMaxPriceInputChange: (value: number) => void;
}

// Price Inputs Types
export interface PriceInputsProps {
  minPrice: number;
  maxPrice: number;
  onMinPriceChange: (value: number) => void;
  onMaxPriceChange: (value: number) => void;
  defaultMin: number;
  defaultMax: number;
  className?: string;
}

// Metadata

export type GenerateProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ id: string; slug: string }>;
};

export type MenuPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: Promise<{ id: string }>;
};

export interface MenusWrapperProps {
  initialData?: MenuItemResponse;
  query: {
    page: number;
    limit: number;
  };
}
