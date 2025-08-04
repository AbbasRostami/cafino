export interface Item {
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

export interface ItemResponse {
  data: Item[];
  total?: number;
  page?: number;
  limit?: number;
}
