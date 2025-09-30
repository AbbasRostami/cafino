import { useGet } from "@/hooks/api/useReactQueryHooks";
import { AddressResponse } from "@/types/Profile";

export const useGetAddresses = () => {
  const { data, isLoading, isError, isPending } = useGet<AddressResponse>(
    `/v1/profile/address`,
    {
      queryKey: ["addresses"],
    }
  );
  return {
    data: data?.data?.addresses,
    isLoading,
    isError,
    isPending,
  };
};
