export interface Categorys {
  id: string;
  title: string;
  slug: string;
  image: string;
  imageUrl: string;
  show: boolean;
}

export interface CategorySectionClientProps {
  categories: Categorys[];
}

export interface CategoryResponse {
  categories: Categorys[];
}
