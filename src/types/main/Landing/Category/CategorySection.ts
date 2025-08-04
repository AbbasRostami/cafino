export interface Category {
  id: string;
  title: string;
  slug: string;
  image: string;
  imageUrl: string;
  show: boolean;
}
export interface CategorySectionClientProps {
  items: Category[];
  itemsPerSlide?: number;
  onItemClick?: (item: Category, index: number) => void;
}
