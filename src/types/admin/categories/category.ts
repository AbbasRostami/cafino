
export interface CategoryAdmin {
  id: string;
  title: string;
  slug: string;
  image: string;
  imageUrl: string;
  show: boolean;
}

export interface GetCategoriesResponseAdmin {
  data: {
    categories: CategoryAdmin[];
    total: number;
    page: number;
    limit: number;
  };
  total: number;
  page: number;
  limit: number;
  statusCode: number;
}

export interface DeleteCategoriesRequest {
  id: string;
}

export interface UpdateCategoryFormData {
  id: string;
  formData: FormData;
}

export type CreateCategoryFormData = FormData;

export type CategoryModalProps = {
  initialData?: CategoryData | null;
  trigger?: React.ReactNode;
};



export type CategoryData = {
  id?: string;
  title: string;
  slug: string;
  imageUrl?: string;
  show: boolean;
};

export interface ModalContentProps {
  initialData?: CategoryData | null;
  onClose: () => void;
}
