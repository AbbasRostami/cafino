"use client";
import { useGet } from "@/hooks/useReactQueryHooks";
import { CartApiResponse } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import CheckoutCart from "@/components/checkout/CheckoutCart";

const CartPage = () => {
  const { isAuthenticated } = useAuthStore();
  const {
    data: cart,
    isLoading,
    refetch: refetchCart,
  } = useGet<CartApiResponse>("/v1/cart", {
    queryKey: ["/v1/cart"],
    staleTime: 5000,
    enabled: isAuthenticated,
  });
  console.log("cart: ", cart);

  return (
    <CheckoutCart
      cart={cart as CartApiResponse}
      isLoading={isLoading}
      refetchCart={refetchCart}
      isAuthenticated={isAuthenticated}
    />
  );
};

export default CartPage;
