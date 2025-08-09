import {
  useDelete,
  useGet,
  usePatch,
  usePost,
} from "@/hooks/useReactQueryHooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface AddressAdmin {
  id: string;
  province: string;
  city: string;
  address: string;
  created_at: string;
}

interface UserAdmin {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  birthday: string;
  image: string;
  phone: string;
  email: string;
  role: string;
  is_email_verified: boolean;
  status: string;
  created_at: string;
  updated_at: string;
  addressList: AddressAdmin[];
}

interface GetUserListAdminResponse {
  data: UserAdmin[];
  total: number;
  page: number;
  limit: number;
  statusCode: number;
}

interface UseGetBlacklistProps {
  page: number;
  limit: number;
}

interface UseGetUserListAdminProps {
  page: number;
  limit: number;
}
export const useGetUserListAdmin = ({
  page,
  limit,
}: UseGetUserListAdminProps) => {
  const { data, isLoading, error } = useGet<GetUserListAdminResponse>(
    `/v1/user/users-list?limit=${limit}&page=${page}`,
    {
      queryKey: ["user-list-admin", page, limit],
    }
  );

  return {
    users: data?.data || [],
    total: data?.total || 0,
    page: data?.page || 1,
    limit: data?.limit || limit,
    isLoading,
    error,
  };
};

export interface DeleteUserRequest {
  id: string;
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useDelete<DeleteUserRequest>(
    () => `/v1/user/`,
    {
      onSuccess: () => {
        toast.success("کاربر مورد نظر با موفقیت حذف شد.");
        queryClient.invalidateQueries({ queryKey: ["user-list-admin"] });
      },
      onError: () => {
        toast.error("خطا در حذف کاربر");
      },
    }
  );
  return { mutate, isPending, error };
};

export interface ChangeUserPermissionRequest {
  phone: string;
  role: string;
}

export const useChangeUserPermission = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = usePatch<ChangeUserPermissionRequest>(
    "/v1/user/permission",
    undefined,
    {
      onSuccess: () => {
        toast.success("نقش کاربر با موفقیت تغییر کرد.");
        queryClient.invalidateQueries({ queryKey: ["user-list-admin"] });
      },
      onError: () => {
        toast.error("خطا در تغییر نقش کاربر");
      },
    }
  );
  return { mutate, isPending, error };
};

export interface AddUserToBlacklistRequest {
  phone: string;
}

export const useAddUserToBlacklist = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = usePost<AddUserToBlacklistRequest>(
    "/v1/user/blacklist",
    undefined,
    {
      onSuccess: () => {
        toast.success("کاربر با موفقیت به لیست سیاه اضافه شد.");
        queryClient.invalidateQueries({ queryKey: ["user-list-admin"] });
        queryClient.invalidateQueries({ queryKey: ["blacklist"] });
      },
      onError: () => {
        toast.error("خطا در اضافه کردن کاربر به لیست سیاه");
      },
    }
  );
  return { mutate, isPending, error };
};

export interface UserBlacklist {
  id: string;
  username: string;
  first_name: string | null;
  last_name: string | null;
  birthday: string | null; // ISO date string
  image: string | null;
  imageUrl: string | null;
  phone: string;
  email: string | null;
  role: "user" | "admin" | string; // اگر رول‌های دیگه هم هست اضافه کن
  new_email: string | null;
  new_phone: string | null;
  is_email_verified: boolean;
  status: "normal" | "block" | string; // وضعیت‌های دیگه رو هم اضافه کن
  rt_hash: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

export interface BlacklistResponse {
  data: UserBlacklist[];
  total: number;
  page: number;
  limit: number;
  statusCode: number;
}
export const useGetBlacklist = ({ page, limit }: UseGetBlacklistProps) => {
  const { data, isLoading, error } = useGet<BlacklistResponse>(
    `/v1/user/blacklist?limit=${limit}&page=${page}`,
    {
      queryKey: ["blacklist", page, limit],
    }
  );

  return {
    blacklist: data?.data || [],
    total: data?.total || 0,
    page: data?.page || 1,
    limit: data?.limit || limit,
    isLoading,
    error,
  };
};

export interface RemoveUserFromBlacklistRequest {
  phone: string;
}

export const useRemoveUserFromBlacklist = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } =
    useDelete<RemoveUserFromBlacklistRequest>(() => `/v1/user/blacklist`, {
      onSuccess: () => {
        toast.success("کاربر مورد نظر با موفقیت از لیست سیاه حذف شد.");
        queryClient.invalidateQueries({ queryKey: ["blacklist"] });
        queryClient.invalidateQueries({ queryKey: ["user-list-admin"] });
      },
      onError: () => {
        toast.error("خطا در حذف کاربر از لیست سیاه");
      },
    });
  return { mutate, isPending, error };
};
