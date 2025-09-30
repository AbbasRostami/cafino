import { useGet } from "@/hooks/api/useReactQueryHooks";
import { GetContactsResponse, UseGetContactsProps } from "@/types/admin";

export const useGetContacts = ({
  page = 1,
  limit = 10,
  sortBy,
  order,
  name,
  email,
  phone,
  hasReply,
}: UseGetContactsProps = {}) => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (sortBy) queryParams.append("sortBy", sortBy);
  if (order) queryParams.append("order", order);
  if (name) queryParams.append("name", name);
  if (email) queryParams.append("email", email);
  if (phone) queryParams.append("phone", phone);
  if (hasReply !== undefined)
    queryParams.append("hasReply", hasReply.toString());

  const { data, isLoading, error } = useGet<GetContactsResponse>(
    `/v1/contact?${queryParams.toString()}`,
    {
      queryKey: [
        "contacts",
        page,
        limit,
        sortBy,
        order,
        name,
        email,
        phone,
        hasReply,
      ],
    }
  );

  return {
    contacts: data?.data?.contacts || [],
    isLoading,
    error,
  };
};
