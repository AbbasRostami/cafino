import { useGet } from "@/hooks/useReactQueryHooks";
import { GetUserListAdminResponse } from "@/types/admin";

export const useGetUserListAdmin = ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
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
