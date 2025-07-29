"use client";
import { useState } from "react";
import { Star, Search, List, Grid, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import Image from "next/image";
import { FavoriteToggleButton } from "@/lib/FavoriteToggleButton";
import { MenuItemSkeleton } from "../skeleton/MenuItemSkeleton";
import dynamic from "next/dynamic";
import { AddToCartButtonStyled } from "@/lib/AddToCartButtonStyled";
const MenuFiltersSidebar = dynamic(
  () => import("@/components/menu/MenuFiltersSidebar"),
  {
    ssr: false,
  }
);
export default function Menus({ items, isLoading, page, limit, total }: any) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = decodeURIComponent(searchParams.get("search") || "");
  const selectedSortBy = searchParams.get("sortBy") || "newest";

  const pageParam = Number(page) || Number(searchParams.get("page")) || 1;
  const limitParam = Number(limit) || Number(searchParams.get("limit")) || 9;
  const totalParam = Number(total) || 0;
  const totalPages = Math.max(1, Math.ceil(totalParam / limitParam));
  const currentPage = pageParam;

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-[20%] w-40 h-40 bg-amber-400 opacity-30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-24 right-[15%] w-32 h-32 bg-pink-300 opacity-30 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-56 h-56 bg-orange-400 opacity-30 rounded-full blur-[100px] animate-pulse"></div>
      </div>
      <div className="relative w-full flex flex-col items-center gap-4 mb-12 animate-fade-in">
        <h1 className="text-center text-2xl sm:text-6xl font-extrabold bg-gradient-to-r from-amber-500 via-orange-400 to-red-400 bg-clip-text text-transparent drop-shadow-xl tracking-tight">
          منوی ویژه کافینو
        </h1>
        <p className="text-center text-sm sm:text-base text-gray-500 dark:text-gray-200 max-w-md">
          لذیذترین طعم‌ها را در منوی ما تجربه کنید
        </p>
      </div>

      {/* سرچ */}
      <div className="relative max-w-xl mx-auto mb-12 animate-fade-in">
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <Search size={20} className="text-gray-400 dark:text-white" />
        </div>
        <Input
          value={search}
          onChange={(e) => {
            const value = e.target.value;
            const params = new URLSearchParams(searchParams.toString());
            if (value.trim() === "") {
              params.delete("search");
            } else {
              params.set("search", value);
            }
            params.set("page", "1");
            router.push(`?${params.toString()}`);
          }}
          type="text"
          placeholder="چی میل دارید؟ مثلاً قهوه، پیتزا، دسر..."
          className="w-full pr-10 pl-5 py-6 rounded-full placeholder:text-gray-400 dark:placeholder:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-amber-500 focus:border-amber-400 bg-white/80 dark:bg-gray-800/60 text-gray-800 dark:text-gray-200 shadow-lg backdrop-blur-md"
        />
      </div>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-6">
        <div className="flex overflow-x-auto gap-3 justify-center md:justify-start">
          {[
            { value: "newest", label: "جدیدترین" },
            { value: "topRated", label: "بیشترین امتیاز" },
            { value: "highestDiscount", label: "بیشترین تخفیف" },
            { value: "highestPrice", label: "گران‌ترین" },
            { value: "lowestPrice", label: "ارزان‌ترین" },
          ].map((category: any) => (
            <button
              key={category.value}
              className={`px-3 sm:px-5 py-1 sm:py-2 text-sm font-medium cursor-pointer rounded-3xl shadow-sm transition-all duration-200 backdrop-blur-md border ${
                selectedSortBy === category.value
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-400"
                  : "bg-white/70 dark:bg-gray-800/40 border-gray-300 dark:border-gray-700 hover:bg-amber-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
              onClick={() => {
                const params = new URLSearchParams(searchParams.toString());
                params.set("sortBy", category.value);
                params.set("page", "1"); // ریست صفحه به ۱
                router.push(`?${params.toString()}`);
              }}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* کنترل نمایش */}
        <div className=" items-center gap-1 justify-center md:justify-end hidden md:flex ">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                onClick={() => setViewMode("grid")}
                className={`p-5 rounded-xl transition-all shadow-md cursor-pointer hover:scale-105 ${
                  viewMode === "grid"
                    ? "bg-gradient-to-tr from-amber-500 to-orange-500 text-white"
                    : "bg-white/70  dark:bg-gray-700/40 text-gray-700 dark:text-gray-200"
                }`}
              >
                <Grid size={30} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>حالت گرید</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                onClick={() => setViewMode("list")}
                className={`p-5 rounded-xl transition-all shadow-md cursor-pointer hover:scale-105 ${
                  viewMode === "list"
                    ? "bg-gradient-to-tr from-amber-500 to-orange-500 text-white"
                    : "bg-white/70 dark:bg-gray-700/40 text-gray-700 dark:text-gray-200"
                }`}
              >
                <List size={30} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>حالت لیست</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* سایدبار - فقط در دسکتاپ نمایش داده شود */}
        <div className="h-full shrink-0">
          <MenuFiltersSidebar />
        </div>
        {/* گرید منو */}
        <div
          className={`${
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
              : "grid grid-cols-1 sm:grid-cols-2 gap-7"
          }`}
        >
          {isLoading
            ? Array.from({ length: viewMode === "grid" ? 6 : 4 }).map(
                (_, idx) => <MenuItemSkeleton key={idx} viewMode={viewMode} />
              )
            : items?.map((item: any) => {
                const discount = item?.discount || 0;
                const originalPrice = item?.price;
                const finalPrice =
                  discount > 0
                    ? originalPrice - (originalPrice * discount) / 100
                    : originalPrice;

                const isOutOfStock = item?.quantity === 0;
                const isLowStock = item?.quantity > 0 && item?.quantity <= 3;
                const isMediumStock =
                  item?.quantity > 3 && item?.quantity <= 10;
                const isFavorite = item?.isFav;
                return (
                  <div
                    key={item?.id}
                    className={`group bg-white h-fit dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-transparent hover:border-amber-400 dark:hover:border-amber-600 ${
                      viewMode === "list" ? "flex flex-row" : ""
                    }`}
                  >
                    {/* تصویر محصول */}
                    <div
                      className={`relative overflow-hidden ${
                        viewMode === "list" ? "w-full sm:w-1/3 " : "h-64"
                      }`}
                    >
                      <Image
                        src={item?.images[0]?.imageUrl || ""}
                        alt={item?.title}
                        className="group-hover:scale-105 transition-all duration-600 object-cover w-full h-full"
                        width={100}
                        height={100}
                        priority
                      />
                      {discount > 0 && (
                        <div className="absolute bottom-4 left-4 bg-gradient-to-tr from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-20">
                          {Math.round(discount)}% تخفیف
                        </div>
                      )}
                      <FavoriteToggleButton
                        itemId={item?.id}
                        isFavorite={isFavorite}
                        iconSize={34}
                        className={`absolute top-4 left-4 z-10 p-2 rounded-full cursor-pointer shadow-md transition-all duration-300 hover:scale-110 ${
                          isFavorite
                            ? "text-amber-500 border-amber-500 fill-current"
                            : "text-white border-white"
                        }`}
                      />
                    </div>

                    {/* جزئیات محصول */}
                    <div
                      className={`p-4 flex flex-col gap-3 ${
                        viewMode === "list" ? "w-full sm:w-2/3" : ""
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-gray-800 dark:text-white line-clamp-1">
                            {item?.title}
                          </h3>
                          <span className="text-xs text-amber-600 dark:text-amber-400 mt-1 block">
                            {item?.category?.title}
                          </span>
                        </div>

                        {/* امتیاز */}
                        <div className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded-full">
                          <Star className="text-yellow-400 fill-current" />
                          <span className="text-xs font-medium text-amber-800 dark:text-amber-200">
                            {item?.rate.toFixed(1)}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 text-justify text-justify-center truncate">
                        {item?.description}
                      </p>

                      {/* مواد تشکیل دهنده */}
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item?.ingredients
                          .slice(0, 2)
                          .map((ingredient: any, index: number) => (
                            <span
                              key={index}
                              className="text-xs bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 px-2 py-1 rounded-full"
                            >
                              {ingredient}
                            </span>
                          ))}
                      </div>

                      {/* موجودی */}
                      <div className="mt-2">
                        <div className="relative flex items-center">
                          <div className="flex-1">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-500 dark:text-gray-400">
                                تعداد موجود
                              </span>
                              <span
                                className={`font-bold ${
                                  isOutOfStock
                                    ? "text-red-500"
                                    : isLowStock
                                    ? "text-amber-500"
                                    : isMediumStock
                                    ? "text-yellow-500"
                                    : "text-green-500"
                                }`}
                              >
                                {item?.quantity} عدد
                              </span>
                            </div>

                            <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className={`absolute top-0 left-0 h-2 rounded-full ${
                                  isOutOfStock
                                    ? "bg-red-300"
                                    : isLowStock
                                    ? "bg-gradient-to-r from-amber-400 to-amber-600"
                                    : isMediumStock
                                    ? "bg-gradient-to-r from-yellow-400 to-amber-400"
                                    : "bg-gradient-to-r from-green-400 to-teal-400"
                                }`}
                                style={{
                                  width: isOutOfStock
                                    ? "0%"
                                    : `${Math.min(
                                        100,
                                        (item?.quantity / 25) * 100
                                      )}%`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          className={`mt-2 text-sm px-4 py-2 rounded-2xl text-center ${
                            isOutOfStock
                              ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                              : isLowStock
                              ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                              : isMediumStock
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                              : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                          }`}
                        >
                          {isOutOfStock
                            ? "این محصول فعلاً موجود نیست."
                            : isLowStock
                            ? `فقط ${item?.quantity} عدد باقی مانده!`
                            : isMediumStock
                            ? `موجودی محدود! فقط ${item?.quantity} عدد در انبار`
                            : `موجودی کافی! ${item?.quantity} عدد آماده ارسال`}
                        </div>
                      </div>

                      {/* قیمت و دکمه افزودن */}
                      <div className="flex justify-center items-center gap-2">
                        <span className="text-lg font-bold text-amber-600 dark:text-amber-400">
                          {Math.round(finalPrice).toLocaleString("fa-IR")} تومان
                        </span>
                        {discount > 0 && (
                          <span className="text-sm text-gray-400 line-through">
                            {Math.round(originalPrice).toLocaleString("fa-IR")}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col  justify-center items-center w-full gap-2">
                        {/* دکمه جزئیات */}
                        <Button
                          variant="outline"
                          className="text-sm px-4 py-2 cursor-pointer border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700  w-full xl:w-1/2"
                          onClick={() => router.push(`/menu/${item?.id}`)}
                        >
                          <Eye size={20} />
                          مشاهده جزئیات
                        </Button>

                        {/* دکمه افزودن */}
                        <AddToCartButtonStyled
                          itemId={item?.id}
                          disabled={item?.quantity === 0}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>

      <Pagination dir="ltr" className="mt-6">
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious onClick={() => goToPage(currentPage - 1)} />
            </PaginationItem>
          )}

          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={page === currentPage}
                  onClick={() => goToPage(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext onClick={() => goToPage(currentPage + 1)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
