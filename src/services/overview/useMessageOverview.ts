import { useGet } from "@/hooks/api/useReactQueryHooks";
import { MessageOverview } from "@/types/admin";

export const useMessageOverview = () => {
  const { data, isLoading, error } = useGet<{ data: MessageOverview }>(
    "/v1/admin/overview/messages",
    {
      queryKey: ["message-overview"],
    }
  );

  return {
    data: data?.data,
    isLoading,
    error,
  };
};
