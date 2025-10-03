"use client";
import { useCart } from "@/services/cart";
import CheckoutSkeleton from "@/components/skeleton/main/checkout-cart";
import CheckoutCart from "@/components/main/checkout/CheckoutCart";

const CartPage = () => {
  const { cart, isCartLoading } = useCart();

  return (
    <>{isCartLoading ? <CheckoutSkeleton /> : <CheckoutCart cart={cart} />}</>
  );
};

export default CartPage;
