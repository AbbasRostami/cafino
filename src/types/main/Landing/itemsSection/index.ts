export type Item = {
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
  category: Record<"title", string>;
  images: Record<"id" | "image" | "imageUrl", string>[];
  isFav: boolean;
};

export type ItemResponse = {
  data: {
    items: Item[];
    total?: number;
    page?: number;
    limit?: number;
  };
};

export interface ItemSectionClientProps {
  items: Item[];
}
