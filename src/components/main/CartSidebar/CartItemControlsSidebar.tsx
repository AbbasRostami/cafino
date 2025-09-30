import { Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAddToCartButtonLogic } from "@/hooks/business/AddToCartButton";

interface CartItemControlsProps {
  itemId: string;
  disabled?: boolean;
  className?: string;
}

export const CartItemControlsSidebar: React.FC<CartItemControlsProps> = ({
  itemId,
  disabled = false,
  className = "",
}) => {
  const logic = useAddToCartButtonLogic({ itemId, disabled });
  const {
    count,
    isCartLoading,
    incLoading,
    decLoading,
    removeLoading,
    handleInc,
    handleRemove,
    handleDec,
  } = logic;

  if (count === 0) {
    return null;
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* دکمه کم کردن / حذف */}
      {count === 1 ? (
        <Button
          onClick={handleRemove}
          variant="ghost"
          disabled={isCartLoading || removeLoading}
          className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer bg-white dark:bg-neutral-800 border border-red-200 dark:border-red-900/50 text-red-500 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all duration-300 group/trash"
        >
          <Trash2 className="w-4 h-4 transition-transform duration-300 group-hover/trash:scale-125" />
        </Button>
      ) : (
        <Button
          onClick={handleDec}
          variant="ghost"
          disabled={isCartLoading || decLoading}
          className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer bg-white dark:bg-neutral-800 border-2 border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-gray-300 hover:border-red-300 dark:hover:border-red-500 hover:text-red-500 dark:hover:text-red-400 transition-all duration-300 group/minus"
        >
          <Minus className="w-4 h-4 transition-transform duration-300 group-hover/minus:scale-125" />
        </Button>
      )}

      {/* نمایش تعداد */}
      <div className="relative">
        <span className="text-sm font-medium min-w-[32px] text-center py-1 px-3 rounded-full bg-gray-50 dark:bg-neutral-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-neutral-700">
          {count}
        </span>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white dark:via-neutral-900 to-transparent opacity-30 pointer-events-none"></div>
      </div>

      {/* دکمه افزایش */}
      <Button
        onClick={handleInc}
        variant="ghost"
        disabled={isCartLoading || incLoading}
        className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer bg-white dark:bg-neutral-800 border-2 border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-gray-300 hover:border-green-400 dark:hover:border-green-500 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 group/plus"
      >
        <Plus className="w-4 h-4 transition-transform duration-300 group-hover/plus:scale-125" />
      </Button>
    </div>
  );
};

export default CartItemControlsSidebar;
