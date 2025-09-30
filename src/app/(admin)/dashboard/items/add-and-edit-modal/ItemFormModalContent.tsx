"use client";

import { MotionDiv, MotionForm } from "@/utils/MotionWrapper";

import { useItemForm } from "./useItemForm";
import { FormHeader } from "./FormHeader";
import { FormSections } from "./FormSections";
import { FormActions } from "./FormActions";
import { ItemsResponse } from "@/types/admin";

interface ItemFormModalContentProps {
  isOpen: boolean;
  onClose: () => void;
  item: ItemsResponse;
}

export function ItemFormModalContent({
  isOpen,
  onClose,
  item,
}: ItemFormModalContentProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    errors,
    isSubmitting,
    isEditing,

    ingredientFields,
    appendIngredient,
    removeIngredient,

    imagePreview,
    imageFiles,
    isCompressing,
    handleImageChange,
    removeImage,

    onSubmit,
    onError,
    handleClose,

    categories,
  } = useItemForm({ isOpen, onClose, item });

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <FormHeader isEditing={isEditing} onClose={handleClose} />

      <MotionForm
        onSubmit={handleSubmit(onSubmit, onError)}
        className="space-y-6"
        onFocus={(e: any) => e.preventDefault()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <FormSections
          register={register}
          watch={watch}
          setValue={setValue}
          errors={errors}
          control={control}
          ingredientFields={ingredientFields}
          appendIngredient={appendIngredient}
          removeIngredient={removeIngredient}
          imagePreview={imagePreview}
          imageFiles={imageFiles}
          isCompressing={isCompressing}
          handleImageChange={handleImageChange}
          removeImage={removeImage}
          categories={categories}
        />

        <FormActions
          isEditing={isEditing}
          isSubmitting={isSubmitting}
          onClose={handleClose}
        />
      </MotionForm>
    </MotionDiv>
  );
}
