export interface Item {
  item: any;
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
    id: string | null | undefined;
    image: string;
    imageUrl: string;
  }[];
  isFav: boolean;
}

export interface ItemResponse {
  data: {
    items: Item[];
    total?: number;
    page?: number;
    limit?: number;
  };
}

export interface ItemSectionClientProps {
  items: Item[];
}
