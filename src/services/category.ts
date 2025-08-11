import { useDelete, useGet, usePost, usePut } from "@/hooks/useReactQueryHooks";
import { CategoryResponse } from "@/types/main/menu/menu";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetCategories = () => {
  return useGet<CategoryResponse>("/v1/category", {
    queryKey: ["categories"],
    staleTime: 0,
  });
};

export interface CategoryAdmin {
  id: string;
  title: string;
  slug: string;
  image: string;
  imageUrl: string;
  show: boolean;
}

export interface GetCategoriesResponseAdmin {
  data: CategoryAdmin[];
  total: number;
  page: number;
  limit: number;
  statusCode: number;
}

interface UseGetCategoriesAdminProps {
  page: number;
  limit: number;
}

export const useGetCategoriesAdmin = ({
  page,
  limit,
}: UseGetCategoriesAdminProps) => {
  const { data, isLoading, error } = useGet<GetCategoriesResponseAdmin>(
    `/v1/category/admin?limit=${limit}&page=${page}`,
    {
      queryKey: ["categories-admin", page, limit],
    }
  );

  return {
    categories: data?.data || [],
    total: data?.total || 0,
    page: data?.page || 1,
    limit: data?.limit || limit,
    isLoading,
    error,
  };
};

export interface DeleteCategoriesRequest {
  id: string;
}

export const useDeleteCategories = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useDelete<DeleteCategoriesRequest>(
    ({ id }) => `/v1/category/${id}`,
    {
      onSuccess: () => {
        toast.success("دسته بندی مورد نظر با موفقیت حذف شد.");
        queryClient.invalidateQueries({ queryKey: ["categories-admin"] });
      },
      onError: () => {
        toast.error("خطا در حذف دسته بندی");
      },
    }
  );
  return { mutate, isPending, error };
};

export interface UpdateCategoryFormData {
  id: string;
  formData: FormData;
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = usePut<any, UpdateCategoryFormData>(
    ({ id }) => `/v1/category/${id}`,
    ({ formData }) => formData,
    {
      onSuccess: () => {
        toast.success("دسته بندی مورد نظر با موفقیت ویرایش شد.");
        queryClient.invalidateQueries({ queryKey: ["categories-admin"] });
      },
      onError: () => {
        toast.error("خطا در ویرایش دسته بندی");
      },
    }
  );
  return { mutate, isPending, error };
};

export type CreateCategoryFormData = FormData;

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = usePost<any, CreateCategoryFormData>(
    "/v1/category",
    (fd) => fd,
    {
      onSuccess: () => {
        toast.success("دسته بندی جدید با موفقیت ایجاد شد.");
        queryClient.invalidateQueries({ queryKey: ["categories-admin"] });
      },
      onError: () => {
        toast.error("خطا در ایجاد دسته بندی");
      },
    }
  );
  return { mutate, isPending, error };
};
