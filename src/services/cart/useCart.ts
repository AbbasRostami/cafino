import { useGet } from "@/hooks/api/useReactQueryHooks";
import { useAuthStore } from "@/store/authStore";

export const useCart = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const {
    data: cart,
    isLoading: isCartLoading,
    refetch,
    error: cartError,
  } = useGet<any>("/v1/cart", {
    queryKey: ["/v1/cart"],
    staleTime: 0,
    enabled: isAuthenticated,
  });

  return {
    cart: cart?.data,
    isCartLoading,
    refetch,
    cartError,
    isAuthenticated,
  };
};
