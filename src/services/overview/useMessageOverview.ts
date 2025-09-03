import { useGet } from "@/hooks/useReactQueryHooks";
import { MessageOverviewResponse } from "@/types/admin/overview";

export const useMessageOverview = () => {
  const { data, isLoading, error } = useGet<MessageOverviewResponse>(
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
