export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
}

export interface MenuItemResponse {
  data: {
    items: MenuItem[];
    total: number;
    page: number;
    limit: number;
  };
}
