import { MenuItemDetails } from "@/app/(main)/menu/[id]/page";
import { GetCommentsResponse, SortBy } from "@/services/Comments";

// Types for ItemsDetails component
export interface ItemImage {
  id?: string;
  imageUrl: string;
}

export interface ItemCategory {
  id: string;
  title: string;
}

export interface ItemUser {
  username: any;
  id: string;
  first_name: string;
  last_name: string;
}

// src/services/Comments.ts
export interface Comment {
  [x: string]: any;
  itemId: string;
  id: string;
  text: string;
  star?: number;
  created_at: string;
  user: ItemUser;
  children?: Comment[];
}

export interface CommentsData {
  comments: Comment[];
  total: number;
  page: number;
  lastPage: number;
}

export interface CommentsResponse {
  data: CommentsData;
}

export interface Item {
  id: string;
  title: string;
  description: string;
  price: number;
  discount: number;
  rate: number;
  quantity: number;
  isFav: boolean;
  images: ItemImage[];
  category: ItemCategory;
  ingredients: string[];
}

export interface ItemsDetailsProps {
  item: Item;
}

// Form types
export interface CommentFormData {
  itemId: string;
  text: string;
  star: number;
}

export interface ReplyFormData {
  text: string;
  itemId: string;
  parentId: string;
}

// Component props
export interface ImageGalleryProps {
  images: ItemImage[];
  activeImage: number;
  onImageChange: (index: number) => void;
}

export interface ItemInfoProps {
  item: Item;

  finalPrice: number;
  originalPrice: number;
  discount: number;
}

export interface PriceSectionProps {
  item: MenuItemDetails;
  finalPrice: number;
  originalPrice: number;
  discount: number;
}

export interface CommentsSectionProps {
  itemId: string;
  comments?: GetCommentsResponse | undefined;
  isLoading: boolean;
  limit: number;
  sortBy: SortBy;
  onLimitChange: (limit: number) => void;
  onSortChange: React.Dispatch<React.SetStateAction<SortBy>>;
}

export interface CommentFormProps {
  itemId: string;
  onSubmit: (data: CommentFormData) => void;
  isPending: boolean;
}

export interface CommentItemProps {
  comment: Comment;
  onReplyClick: (id: string) => void;
  activeReplyId: string | null;
  onReplySubmit: (data: ReplyFormData) => void;
}

export interface ReplyInputProps {
  parentId: string;
  onSubmit: (data: ReplyFormData) => void;
  isActive: boolean;
}
