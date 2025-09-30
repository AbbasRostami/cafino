import { Button } from "@/components/ui/button";
import { Trash2, Star, Loader2, EyeOff } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { confirm } from "@/components/shared/ConfirmModal";
import AddToCartButtonStyled from "@/components/ui/AddToCartButtonStyled";
import { FavoriteCardProps } from "@/types/Profile";
import { MotionDiv } from "@/utils/MotionWrapper";
import { formatCurrency } from "@/utils/formatters";
import { useDeleteFromFavorite } from "@/services";

export const FavoriteCard = ({ favorite }: FavoriteCardProps) => {
  const { mutate: deleteFromFavorite, isPending } = useDeleteFromFavorite();
  const isAvailable = favorite?.isAvailable;
  const handleDelete = async () => {
    const isConfirmed = await confirm({
      title: "آیا از حذف از علاقه مندی مطمئن هستید؟",
      description:
        "این محصول از علاقه مندی ها حذف خواهد شد و دیگر در لیست علاقه مندی ها نمایش داده نخواهد شد",
      confirmText: "حذف",
      cancelText: "انصراف",
    });

    if (isConfirmed) {
      deleteFromFavorite({ itemId: favorite?.item?.id });
    }
  };

  return (
    <MotionDiv
      className="rounded-3xl group overflow-hidden shadow-lg border border-gray-200 hover:border-amber-200 dark:hover:border-red-800 dark:border-gray-800 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      layout
    >
      <div className="p-5 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-[17px] text-gray-800 dark:text-white leading-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-all duration-300">
            {favorite?.item?.title}
          </h3>
          <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 bg-amber-100/60 dark:bg-amber-500/10 px-2 py-1 rounded-full text-sm shadow-sm">
            <Star className="fill-current" size={14} />
            {favorite?.item?.rate}
          </div>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="text-sm leading-relaxed cursor-pointer">
                {favorite?.item?.description.slice(0, 35)}
                {favorite?.item?.description.length > 35 && "..."}
              </p>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm leading-relaxed">
                {favorite?.item?.description}
              </p>
            </TooltipContent>
          </Tooltip>
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
                  +{favorite?.item?.ingredients?.length - 2}
                </span>
              )}
            </div>
          </TooltipTrigger>

          <TooltipContent>
            <div className="max-w-[200px] text-xs">
              {favorite?.item?.ingredients?.join(", ")}
            </div>
          </TooltipContent>
        </Tooltip>

        <div className="flex flex-col items-start pt-3 border-t border-gray-200 dark:border-gray-700 gap-2">
          <span className="w-full text-lg font-extrabold text-amber-600 dark:text-amber-400">
            {formatCurrency(favorite?.item?.price)} تومان
          </span>

          <div className="w-full">
            <div className="relative flex items-center">
              <div className="flex-1">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500 dark:text-gray-400">
                    تعداد موجودی
                  </span>
                  <span
                    className={`font-bold ${
                      !favorite?.isAvailable || favorite?.item?.quantity === 0
                        ? "text-red-500"
                        : favorite?.item?.quantity < 5
                        ? "text-amber-500"
                        : favorite?.item?.quantity < 10
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {!favorite?.isAvailable ? 0 : favorite?.item?.quantity} عدد
                  </span>
                </div>

                <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`absolute top-0 left-0 h-2 rounded-full ${
                      !favorite?.isAvailable || favorite?.item?.quantity === 0
                        ? "bg-red-300"
                        : favorite?.item?.quantity < 5
                        ? "bg-gradient-to-r from-amber-400 to-amber-600"
                        : favorite?.item?.quantity < 10
                        ? "bg-gradient-to-r from-yellow-400 to-amber-400"
                        : "bg-gradient-to-r from-green-400 to-teal-400"
                    }`}
                    style={{
                      width:
                        !favorite?.isAvailable || favorite?.item?.quantity === 0
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
          <Button
            className="w-full rounded-lg bg-gradient-to-tr from-red-50 to-red-100 dark:from-red-900/30 dark:to-gray-800 py-2 px-4 shadow-md hover:shadow-lg text-red-600 dark:text-red-400 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            variant="outline"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <>
                <Trash2 size={18} className="stroke-[1.5]" />
                <span className="font-medium text-sm">حذف از علاقه‌مندی</span>
              </>
            )}
          </Button>
        </div>
        <div className="flex justify-center">
          {isAvailable ? (
            <AddToCartButtonStyled itemId={favorite?.item?.id} />
          ) : (
            <Button
              className="w-full bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg flex items-center justify-center gap-2"
              disabled
              variant="outline"
            >
              <EyeOff size={18} />
              <span className="font-medium text-sm">موجود نیست</span>
            </Button>
          )}
        </div>
      </div>
    </MotionDiv>
  );
};
