import { Plus, Minus, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { MotionDiv, MotionSpan } from "@/utils/MotionWrapper";
import { useAddToCartButtonLogic } from "@/hooks/business/AddToCartButton";

interface CheckoutItemControlsProps {
  itemId: string;
  disabled?: boolean;
  className?: string;
}

export const CheckoutItemControls: React.FC<CheckoutItemControlsProps> = ({
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
    handleDec,
    handleRemove,
  } = logic;

  if (count === 0) return null;

  return (
    <MotionDiv
      className={`w-fit flex justify-center items-center rounded-xl overflow-hidden border border-zinc-300 dark:border-zinc-700 bg-white/40 dark:bg-black/40 backdrop-blur-md divide-x divide-zinc-200 dark:divide-zinc-800 ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      {/* کاهش یا حذف */}
      {count === 1 ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                disabled={isCartLoading || removeLoading}
                variant="ghost"
                className="px-3 py-2 text-rose-600 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900 transition-colors"
                onClick={handleRemove}
              >
                <MotionDiv
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {removeLoading ? (
                    <Loader2 className="animate-spin" size={22} />
                  ) : (
                    <Trash2 size={22} />
                  )}
                </MotionDiv>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>حذف محصول</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <Button
          disabled={isCartLoading || decLoading}
          variant="ghost"
          className="px-3 py-2 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-100 dark:hover:bg-yellow-900 transition-colors"
          onClick={handleDec}
        >
          <MotionDiv
            whileHover={{ rotate: -12, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {decLoading ? (
              <Loader2 className="animate-spin" size={22} />
            ) : (
              <Minus size={22} />
            )}
          </MotionDiv>
        </Button>
      )}

      {/* عدد */}
      <MotionSpan
        key={count}
        className="px-5 py-1 text-base font-semibold text-gray-900 dark:text-white relative"
        initial={{ scale: 1.2, opacity: 0.4 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <span className="relative z-10">{count}</span>
        <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-yellow-400/70 rounded-full" />
      </MotionSpan>

      {/* افزایش */}
      <Button
        disabled={isCartLoading || incLoading}
        variant="ghost"
        className="px-3 py-2 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors"
        onClick={handleInc}
      >
        <MotionDiv
          whileHover={{ rotate: 12, scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {incLoading ? (
            <Loader2 className="animate-spin" size={30} />
          ) : (
            <Plus size={30} />
          )}
        </MotionDiv>
      </Button>
    </MotionDiv>
  );
};

export default CheckoutItemControls;
