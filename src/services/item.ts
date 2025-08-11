import { useDelete, useGet, usePost, usePut } from "@/hooks/useReactQueryHooks";
import { MenuItemResponse } from "@/types/main/menu/menu";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetItems = (queryString: string) => {
  const endpoint = `/v1/item?${queryString}`;

  return useGet<MenuItemResponse>(endpoint, {
    queryKey: ["items", queryString],
    staleTime: 10 * 1000,
  });
};

interface UseGetItemsAdminProps {
  page: number;
  limit: number;
  search: string;
}

export const useGetItemsAdmin = ({
  page,
  limit,
  search,
}: UseGetItemsAdminProps) => {
  const { data, isLoading, error } = useGet<MenuItemResponse>(
    `/v1/item/admin?page=${page}&limit=${limit}&search=${search}`,
    {
      queryKey: ["items-admin", page, limit, search],
    }
  );
  return {
    items: data?.data || [],
    total: data?.total || 0,
    page: data?.page || 1,
    limit: data?.limit || limit,
    isLoading,
    error,
  };
};

export interface DeleteItemRequest {
  id: string;
}

export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useDelete<DeleteItemRequest>(
    ({ id }) => `/v1/item/${id}`,
    {
      onSuccess: () => {
        toast.success("محصول حذف شد");
        queryClient.invalidateQueries({ queryKey: ["items-admin"] });
      },
      onError: () => {
        toast.error("خطا در حذف محصول");
      },
    }
  );
  return { mutate, isPending, error };
};

//

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

export const useCreateItem = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = usePost<ItemResponse, FormData>(
    "/v1/item",
    (formData) => formData,
    {
      onSuccess: () => {
        toast.success("محصول با موفقیت ایجاد شد");
        queryClient.invalidateQueries({ queryKey: ["items-admin"] });
      },
      onError: () => {
        toast.error("خطا در ایجاد محصول");
      },
    }
  );

  return { mutate, isPending, error };
};

export interface UpdateItemFormData {
  id: string;
  formData: FormData;
}

export const useUpdateItem = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = usePut<any, UpdateItemFormData>(
    ({ id }) => `/v1/item/${id}`,
    ({ formData }) => formData,
    {
      onSuccess: () => {
        toast.success("محصول با موفقیت ویرایش شد");
        queryClient.invalidateQueries({ queryKey: ["items-admin"] });
      },
      onError: () => {
        toast.error("خطا در ویرایش محصول");
      },
    }
  );
  return { mutate, isPending, error };
};
