import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FormActionsProps } from "@/types/admin";
import { MotionDiv } from "@/utils/MotionWrapper";

export function FormActions({
  isEditing,
  isSubmitting,
  onClose,
}: FormActionsProps) {
  return (
    <>
      <Separator className="my-8" />
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex justify-center md:justify-end gap-4"
      >
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={isSubmitting}
          className="py-2 px-6 text-base border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          انصراف
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="py-2 px-6 text-base bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              {isEditing ? "در حال ویرایش..." : "در حال افزودن..."}
            </>
          ) : (
            <>{isEditing ? "ویرایش محصول" : "افزودن محصول"}</>
          )}
        </Button>
      </MotionDiv>
    </>
  );
}
