"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Trash2,
  Plus,
  ShoppingBag,
  Star,
  X,
  Filter,
  MapPin,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import Image from "next/image";
import { useDeleteFromFavorite, useGetFavorites } from "@/services/Favorite";
import AddToCartButtonStyled from "@/lib/AddToCartButtonStyled";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FavoritesSkeleton } from "@/components/skeleton/FavoritesSkeleton";
import { confirm } from "@/components/common/ConfirmModal";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedLimit, setSelectedLimit] = useState(6);
  const { mutate: deleteFromFavorite } = useDeleteFromFavorite();
  const handleChange = (value: string) => {
    setSelectedLimit(Number(value));
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", value);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const limitParam = Number(searchParams.get("limit")) || selectedLimit;
  const pageParam = Number(searchParams.get("page")) || 1;
  const { data: favoritesData, isLoading } = useGetFavorites(
    limitParam,
    pageParam
  );
  console.log("data", favoritesData);

  const totalParam = Number(favoritesData?.total) || 0;
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
  if (isLoading) {
    return <FavoritesSkeleton />;
  }
  if (favoritesData?.data?.length === 0) {
    return (
      <motion.div
        className="text-center py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="relative inline-block">
          <div className="bg-gradient-to-r from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart
              className="text-rose-500 dark:text-rose-400"
              size={48}
              fill="currentColor"
            />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 flex items-center justify-center">
            <X className="text-white" size={16} />
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
          لیست علاقه‌مندی‌های شما خالی است
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
          هنوز هیچ محصولی را به لیست علاقه‌مندی‌های خود اضافه نکرده‌اید. از منوی
          محصولات دیدن کنید و موارد دلخواه خود را اضافه کنید.
        </p>
        <motion.button
          className="mt-6 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full flex items-center gap-2 mx-auto font-medium shadow-lg"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 5px 15px rgba(236, 72, 153, 0.4)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          مشاهده محصولات
          <Plus size={18} />
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-2 py-8 rounded-xl">
      {/* هدر صفحه */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white flex items-center justify-center gap-3">
          <Heart size={32} className="text-rose-500" />
          لیست علاقه‌مندی‌های شما
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          تمام محصولات و غذاهای مورد علاقه‌تان در یکجا جمع‌آوری شده‌اند. هر زمان
          که خواستید می‌توانید به راحتی آنها را سفارش دهید.
        </p>
      </motion.div>

      <div className="bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-800 p-4 shadow-xl rounded-2xl">
        {/* لیست علاقه‌مندی‌ها */}
        <AnimatePresence>
          <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {favoritesData?.data?.map((favorite: any) => (
              <motion.div
                key={favorite?.id}
                className="rounded-3xl group overflow-hidden shadow-lg border border-gray-200 hover:border-amber-200 dark:hover:border-red-800 dark:border-gray-800 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl "
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                layout
              >
                {/* محتوا */}
                <div className="p-5 space-y-4 ">
                  {/* عنوان و امتیاز */}
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-[17px] text-gray-800 dark:text-white leading-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-all duration-300">
                      {favorite?.item?.title}
                    </h3>
                    <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 bg-amber-100/60 dark:bg-amber-500/10 px-2 py-1 rounded-full text-sm shadow-sm">
                      <Star className="fill-current" size={14} />
                      {favorite?.item?.rate}
                    </div>
                  </div>

                  {/* توضیحات */}
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                    {favorite?.item?.description}
                  </p>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex flex-wrap gap-1 text-xs max-h-[50px] overflow-hidden">
                        {favorite?.item?.ingredients
                          ?.slice(0, 2)
                          .map((ing: string, i: number) => (
                            <span
                              key={i}
                              className="bg-muted px-2 py-0.5 rounded-full text-xs text-muted-foreground truncate max-w-[100px]"
                            >
                              {ing}
                            </span>
                          ))}

                        {favorite?.item?.ingredients?.length > 2 && (
                          <span className="bg-muted px-2 py-0.5 rounded-full text-xs text-muted-foreground">
                            +{favorite.item.ingredients.length - 2}
                          </span>
                        )}
                      </div>
                    </TooltipTrigger>

                    <TooltipContent>
                      <div className="max-w-[200px] text-xs">
                        {favorite?.item?.ingredients?.join("، ")}
                      </div>
                    </TooltipContent>
                  </Tooltip>

                  {/* قیمت و افزودن به سبد */}
                  <div className="flex flex-col items-start pt-3 border-t border-gray-200 dark:border-gray-700 gap-2">
                    <span className="w-full text-lg font-extrabold text-amber-600 dark:text-amber-400">
                      {favorite?.item?.price?.toLocaleString("fa-IR")} تومان
                    </span>
                    {/* موجودی */}
                    <div className="w-full">
                      <div className="relative flex items-center">
                        <div className="flex-1">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-500 dark:text-gray-400">
                              تعداد موجودی
                            </span>
                            <span
                              className={`font-bold ${
                                favorite?.item?.quantity === 0
                                  ? "text-red-500"
                                  : favorite?.item?.quantity < 5
                                  ? "text-amber-500"
                                  : favorite?.item?.quantity < 10
                                  ? "text-yellow-500"
                                  : "text-green-500"
                              }`}
                            >
                              {favorite?.item?.quantity} عدد
                            </span>
                          </div>

                          <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className={`absolute top-0 left-0 h-2 rounded-full ${
                                favorite?.item?.quantity === 0
                                  ? "bg-red-300"
                                  : favorite?.item?.quantity < 5
                                  ? "bg-gradient-to-r from-amber-400 to-amber-600"
                                  : favorite?.item?.quantity < 10
                                  ? "bg-gradient-to-r from-yellow-400 to-amber-400"
                                  : "bg-gradient-to-r from-green-400 to-teal-400"
                              }`}
                              style={{
                                width:
                                  favorite?.item?.quantity === 0
                                    ? "0%"
                                    : `${Math.min(
                                        100,
                                        (favorite?.item?.quantity / 25) * 100
                                      )}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 justify-center">
                    {/* دکمه حذف */}
                    <Button
                      className="w-full rounded-lg bg-gradient-to-tr from-red-50 to-red-100 dark:from-red-900/30 dark:to-gray-800 py-2 px-4 shadow-md hover:shadow-lg text-red-600 dark:text-red-400 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                      variant="outline"
                      onClick={async () => {
                        const isConfirmed = await confirm({
                          title: "آیا از حذف از علاقه مندی مطمئن هستید؟",
                          description:
                            "این محصول از علاقه مندی ها حذف خواهد شد و دیگر در لیست علاقه مندی ها نمایش داده نخواهد شد",
                          confirmText: "حذف",
                          cancelText: "انصراف",
                        });

                        if (isConfirmed) {
                          deleteFromFavorite({
                            itemId: favorite?.item?.id,
                          });
                        }
                      }}
                    >
                      <Trash2 size={18} className="stroke-[1.5]" />
                      <span className="font-medium text-sm">
                        حذف از علاقه‌مندی
                      </span>
                    </Button>

                    {/* دکمه افزودن به سبد */}
                  </div>
                  <div className="flex justify-center">
                    <AddToCartButtonStyled itemId={favorite?.item?.id} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        <div className="flex flex-col lg:flex-row justify-between items-center mt-5 sm:mt-10 gap-4 p-2 sm:p-4 pb-8">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            نمایش {limitParam.toLocaleString("fa-IR")} از{" "}
            {totalParam.toLocaleString("fa-IR")}
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Select
              onValueChange={handleChange}
              defaultValue={limitParam.toString()}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="تعداد آیتم‌ها">
                  {limitParam.toLocaleString("fa-IR")} نمایش
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="6">۶</SelectItem>
                  <SelectItem value="12">۱۲</SelectItem>
                  <SelectItem value="18">۱۸</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Pagination dir="ltr">
              <PaginationContent>
                {/* دکمه رفتن به اولین صفحه */}
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationLink
                      className="!p-1"
                      onClick={() => goToPage(1)}
                    >
                      <ChevronsLeft />
                    </PaginationLink>
                  </PaginationItem>
                )}

                {/* دکمه قبلی */}
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious
                      className="!p-1"
                      onClick={() => goToPage(currentPage - 1)}
                    />
                  </PaginationItem>
                )}

                {/* شماره صفحات */}
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={page === currentPage}
                        className={`${
                          page === currentPage
                            ? "bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-600"
                            : "bg-gradient-to-l from-gray-100 to-white dark:from-gray-700 dark:to-gray-800"
                        }`}
                        onClick={() => goToPage(page)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                {/* دکمه بعدی */}
                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext
                      className="!p-1"
                      onClick={() => goToPage(currentPage + 1)}
                    />
                  </PaginationItem>
                )}

                {/* دکمه رفتن به آخرین صفحه */}
                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationLink
                      className="!p-1"
                      onClick={() => goToPage(totalPages)}
                    >
                      <ChevronsRight />
                    </PaginationLink>
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        </div>

        {/* پاورقی صفحه */}
        <motion.div
          className="pt-4 border-t border-gray-200 dark:border-gray-800 text-center pb-10 sm:pb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm max-w-2xl mx-auto">
            شما می‌توانید حداکثر ۵۰ مورد را در لیست علاقه‌مندی‌های خود ذخیره
            کنید. و هر زمان که به راحتی سفارش دهید.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default FavoritesPage;
