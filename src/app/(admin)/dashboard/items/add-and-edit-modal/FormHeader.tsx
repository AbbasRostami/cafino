import { X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MotionDiv } from "@/utils/MotionWrapper";
import { FormHeaderProps } from "@/types/admin";

export function FormHeader({ isEditing, onClose }: FormHeaderProps) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between mb-6"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
          <ImageIcon className="w-4 h-4 md:w-6 md:h-6 text-white" />
        </div>
        <div>
          <h2 className="text-sm md:text-2xl font-bold text-right bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            {isEditing ? "ویرایش محصول" : "افزودن محصول جدید"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-right">
            {isEditing
              ? "اطلاعات محصول را ویرایش کنید"
              : "اطلاعات محصول جدید را وارد کنید"}
          </p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <X size={20} />
      </Button>
    </MotionDiv>
  );
}
