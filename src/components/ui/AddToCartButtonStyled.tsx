import { Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAddToCartButtonLogic } from "@/hooks/business/AddToCartButton";
import { CartItem } from "@/store/cartStore";
import {
  MotionDiv,
  MotionSpan,
  MotionAnimatePresence,
} from "@/utils/MotionWrapper";

interface AddToCartButtonStyledProps {
  itemId: string;
  itemData?: CartItem;
  disabled?: boolean;
  className?: string;
}

export const AddToCartButtonStyled: React.FC<AddToCartButtonStyledProps> = ({
  itemId,
  itemData,
  disabled = false,
  className = "",
}) => {
  const logic = useAddToCartButtonLogic({ itemId, itemData, disabled });
  const {
    count,
    isCartLoading,
    addLoading,
    incLoading,
    decLoading,
    removeLoading,
    handleAdd,
    handleInc,
    handleDec,
    disabled: isDisabled,
    isAuthenticated,
  } = logic;

  if (!isAuthenticated && !itemData) {
    return (
      <Button
        disabled={true}
        className="w-full py-5 bg-gray-300 text-gray-500 cursor-not-allowed"
      >
        اطلاعات محصول در دسترس نیست
      </Button>
    );
  }

  if (count === 0) {
    return (
      <MotionDiv
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full ${className}`}
      >
        <Button
          onClick={handleAdd}
          disabled={isCartLoading || isDisabled || addLoading}
          className="w-full py-5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-300/50 dark:shadow-amber-700/30 flex items-center gap-2 relative overflow-hidden"
        >
          <MotionAnimatePresence mode="wait">
            {addLoading ? (
              <MotionDiv
                key="loading-add"
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 180 }}
                className="w-6 h-6 rounded-full border-2 border-t-transparent border-white animate-spin"
              />
            ) : (
              <MotionDiv
                key="cart"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <ShoppingCart size={20} />
              </MotionDiv>
            )}
          </MotionAnimatePresence>

          <MotionSpan
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-base font-medium"
          >
            افزودن به سبد خرید
          </MotionSpan>
        </Button>
      </MotionDiv>
    );
  }

  // دکمه‌های + - حذف
  return (
    <MotionDiv
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-xl p-1 shadow-md border border-amber-100 dark:border-amber-800/30"
    >
      {/* دکمه کم کردن / حذف */}
      <MotionDiv whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={logic.handleDec}
          disabled={decLoading || removeLoading}
          variant={logic.count === 1 ? "destructive" : "outline"}
          size="icon"
          className={`w-10 h-10 rounded-xl ${
            logic.count === 1
              ? "bg-gradient-to-br from-red-500 to-red-600 text-white"
              : "border-amber-200 dark:border-amber-800/50 text-amber-600 dark:text-amber-400"
          }`}
        >
          <MotionAnimatePresence mode="wait">
            {decLoading || removeLoading ? (
              <MotionDiv
                key="loading-dec"
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 180 }}
                className="w-5 h-5 rounded-full border-2 border-t-transparent border-current animate-spin"
              />
            ) : logic.count === 1 ? (
              <MotionDiv
                key="trash"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Trash2 size={18} />
              </MotionDiv>
            ) : (
              <MotionDiv
                key="minus"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Minus size={18} />
              </MotionDiv>
            )}
          </MotionAnimatePresence>
        </Button>
      </MotionDiv>

      {/* نمایش تعداد */}
      <MotionSpan
        key={logic.count}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        className="font-bold min-w-[40px] text-center text-lg text-gray-800 dark:text-gray-200"
      >
        {logic.count}
      </MotionSpan>

      {/* دکمه افزایش */}
      <MotionDiv whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={logic.handleInc}
          disabled={incLoading}
          variant="outline"
          size="icon"
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-100 to-green-100 dark:from-amber-900/20 dark:to-orange-900/20 border-green-200 dark:border-amber-800/50 text-green-600 dark:text-amber-400"
        >
          <MotionAnimatePresence mode="wait">
            {incLoading ? (
              <MotionDiv
                key="loading-inc"
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 180 }}
                className="w-5 h-5 rounded-full border-2 border-t-transparent border-current animate-spin"
              />
            ) : (
              <MotionDiv
                key="plus"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Plus size={18} />
              </MotionDiv>
            )}
          </MotionAnimatePresence>
        </Button>
      </MotionDiv>
    </MotionDiv>
  );
};

export default AddToCartButtonStyled;
