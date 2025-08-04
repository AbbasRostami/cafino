"use client";
import { CartApiResponse, useCart } from "@/store/cartStore";
import CheckoutCart from "@/components/checkout/CheckoutCart";
import CheckoutSkeleton from "@/components/skeleton/main/checkout-cart/CheckoutSkeleton";

const CartPage = () => {
  const { cart, isCartLoading } = useCart();
  console.log("cart: ", cart);

  return (
    <>
      {isCartLoading ? (
        <CheckoutSkeleton />
      ) : (
        <CheckoutCart cart={cart as CartApiResponse} />
      )}
    </>
  );
};

export default CartPage;
