import React from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useAddToCartButtonLogic } from "./AddToCartButton";

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
    <motion.div
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
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Trash2 size={18} />
                </motion.div>
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
          <motion.div
            whileHover={{ rotate: -12, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Minus size={18} />
          </motion.div>
        </Button>
      )}

      {/* عدد */}
      <motion.span
        key={count}
        className="px-5 py-1 text-base font-semibold text-gray-900 dark:text-white relative"
        initial={{ scale: 1.2, opacity: 0.4 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <span className="relative z-10">{count.toLocaleString("fa-IR")}</span>
        <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-yellow-400/70 rounded-full" />
      </motion.span>

      {/* افزایش */}
      <Button
        disabled={isCartLoading || incLoading}
        variant="ghost"
        className="px-3 py-2 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-colors"
        onClick={handleInc}
      >
        <motion.div
          whileHover={{ rotate: 12, scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={18} />
        </motion.div>
      </Button>
    </motion.div>
  );
};

export default CheckoutItemControls;
