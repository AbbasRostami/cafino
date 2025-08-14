import { ItemFormData } from "@/schemas/admin/item";
import { MenuItem } from "@/types/main/menu/menu";
import {
  Control,
  UseFormSetValue,
  UseFormWatch,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";

export interface UseGetItemsAdminProps {
  page: number;
  limit: number;
  search: string;
}

export interface DeleteItemRequest {
  id: string;
}

export interface ItemImage {
  image: string;
  imageUrl: string;
}

export interface CategoryInfo {
  title: string;
}

export interface ItemResponse {
  id: string;
  title: string;
  ingredients: string[];
  description?: string;
  price: number;
  discount: number;
  quantity: number;
  rate: number;
  rate_count: number;
  createdAt: string;
  category: CategoryInfo;
  images: ItemImage[];
  show: boolean;
}

export interface CreateItemRequest {
  title: string;
  ingredients?: string[];
  description?: string;
  price: number;
  discount: number;
  quantity: number;
  images?: File[];
  category: string;
  show: boolean;
}

export interface UpdateItemRequest extends Partial<CreateItemRequest> {
  id: string;
}

export interface UpdateItemFormData {
  id: string;
  formData: FormData;
}

export interface ItemDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: ItemResponse;
}

export interface itemsColumnsProps {
  currentPage: number;
  currentLimit: number;
  setEditingItem: (item: MenuItem) => void;
  setIsModalOpen: (open: boolean) => void;
}

//add and edit modal
export interface FormActionsProps {
  isEditing: boolean;
  isSubmitting: boolean;
  onClose: () => void;
}

export interface FormHeaderProps {
  isEditing: boolean;
  onClose: () => void;
}

export interface FormSectionsProps {
  register: UseFormRegister<ItemFormData>;
  watch: UseFormWatch<ItemFormData>;
  setValue: UseFormSetValue<ItemFormData>;
  errors: FieldErrors<ItemFormData>;
  control: Control<ItemFormData>;
  ingredientFields: Array<{ id: string; [key: string]: any }>;
  appendIngredient: (value: string) => void;
  removeIngredient: (index: number) => void;
  imagePreview: string[];
  imageFiles: File[];
  isCompressing: boolean;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
  categories: any[];
}



export interface UseItemFormProps {
  isOpen: boolean;
  onClose: () => void;
  item: ItemResponse | null;
  }