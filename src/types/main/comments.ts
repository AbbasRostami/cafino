import { ItemUser } from "./items-details/items-details";

export interface UserComment {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
}

export interface Comment {
  itemId: string;
  id: string;
  text: string;
  star?: number;
  created_at: string;
  user: ItemUser;
  children?: Comment[];
}

export interface GetCommentsResponse {
  data: {
    comments: Comment[];
    total: number;
    page: number;
    lastPage: number;
  };
  statusCode: number;
}

export type SortBy = "lowestRated" | "highestRated" | "newest" | "oldest";

export interface UseGetCommentsItemsProps {
  itemId: string;
  page?: number;
  limit?: number;
  sortBy?: SortBy;
}

export interface AddCommentRequest {
  text: string;
  itemId: string;
  parentId?: string;
  star: number;
}
