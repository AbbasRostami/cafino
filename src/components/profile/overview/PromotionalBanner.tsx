import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const PromotionalBanner = () => {
  return (
    <Card className="bg-gradient-to-r from-rose-600 to-amber-500 dark:from-rose-800 dark:to-amber-700 text-white shadow-2xl rounded-3xl border-none overflow-hidden">
      <CardContent className="p-6 sm:p-8 text-center">
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3">
          تخفیف ویژه امروز!
        </h3>
        <p className="text-rose-100 dark:text-amber-200 text-sm sm:text-base mb-4">
          با سفارش بالای ۲۰۰,۰۰۰ تومان، ۱۰٪ تخفیف بگیرید
        </p>
        <Button className="bg-white text-rose-700 hover:bg-rose-100 rounded-full px-6 py-2 text-sm sm:text-base font-medium">
          <Link href="/menu">سفارش دهید</Link>
        </Button>
      </CardContent>
    </Card>
  );
};
