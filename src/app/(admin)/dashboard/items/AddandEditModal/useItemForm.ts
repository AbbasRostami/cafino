import { useEffect, useState } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { itemFormSchema, ItemFormData } from "@/schemas/admin";
import { useGetCategoriesAdmin } from "@/services";
import { useCreateItem, useUpdateItem } from "@/services";
import { compressImage, validateImageFile } from "@/lib/imageUtils";
import { UseItemFormProps } from "@/types/admin";

export function useItemForm({ isOpen, onClose, item }: UseItemFormProps) {
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);

  const { categories } = useGetCategoriesAdmin({
    page: 1,
    limit: 100,
  });

  const { mutate: createItem, isPending: isCreating } = useCreateItem();
  const { mutate: updateItem, isPending: isUpdating } = useUpdateItem();
  const isSubmitting = isCreating || isUpdating;
  const isEditing = !!item;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    watch,
    setFocus,
    formState: { errors, dirtyFields },
  } = useForm<ItemFormData>({
    mode: "onTouched",
    resolver: zodResolver(itemFormSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      discount: 0,
      quantity: 0,
      category: "",
      ingredients: [""],
      images: [],
      show: true,
    },
    shouldUnregister: false,
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: "ingredients" as const,
  });

  useEffect(() => {
    if (!isOpen) return;
    if (!categories?.length) return;

    if (item) {
      reset({
        title: item?.title,
        description: item?.description || "",
        price: item?.price,
        discount: item?.discount,
        quantity: item?.quantity,
        category: "",
        ingredients: item?.ingredients.length ? item?.ingredients : [""],
        images: [],
        show: item?.show ?? true,
      });

      const categoryObj = categories.find(
        (cat) => cat?.title === item?.category?.title
      );
      if (categoryObj) {
        setValue("category", categoryObj.id);
      }
      setImagePreview(item.images?.map((img) => img.imageUrl) || []);
    } else {
      setImagePreview([]);
    }
    setImageFiles([]);
  }, [isOpen, item, categories, reset, setValue]);

  const onError = (errors: any) => {
    const firstErrorField = Object.keys(errors)[0];
    if (firstErrorField) {
      setFocus(firstErrorField as keyof ItemFormData);
    }
  };

  const handleClose = () => {
    reset();
    setImagePreview([]);
    setImageFiles([]);
    onClose();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    if (imageFiles.length + files.length > 5) {
      toast.error("حداکثر 5 تصویر مجاز است");
      return;
    }

    setIsCompressing(true);

    const compressed = await Promise.all(
      files.map(async (file) => {
        const err = validateImageFile(file);
        if (err) {
          toast.error(err);
          return null;
        }
        try {
          const compressedFile = await compressImage(file);
          toast.success(`تصویر ${file.name} فشرده شد`);
          return compressedFile;
        } catch {
          toast.error(`خطا در فشرده‌سازی ${file.name}`);
          return file;
        }
      })
    );

    const validFiles = compressed?.filter(Boolean) as File[];
    setImageFiles((prev) => [...prev, ...validFiles]);
    setImagePreview((prev) => [
      ...prev,
      ...validFiles?.map((f) => URL.createObjectURL(f)),
    ]);
    setValue("images", [...imageFiles, ...validFiles]);

    setIsCompressing(false);
  };

  const removeImage = (index: number) => {
    const newFiles = imageFiles?.filter((_, i) => i !== index);
    setImageFiles(newFiles);
    setImagePreview((prev) => prev.filter((_, i) => i !== index));
    setValue("images", newFiles);
  };

  const onSubmit: SubmitHandler<ItemFormData> = (data) => {
    const formData = new FormData();
    const appendField = (key: string, value: any) =>
      value !== undefined && value !== "" && formData.append(key, value);

    const appendCommonFields = () => {
      appendField("title", data.title);
      appendField("description", data.description || "");
      appendField("price", data.price.toString());
      appendField("discount", data.discount.toString());
      appendField("quantity", data.quantity.toString());
      appendField("category", data.category);
      appendField("show", data.show ? "true" : "false");

      if (data.ingredients?.length)
        appendField("ingredients", data.ingredients.join(","));

      imageFiles?.forEach((img) => formData.append("images", img));
    };

    if (isEditing && item) {
      const hasChanges =
        Object.keys(dirtyFields).length > 0 ||
        imageFiles?.length > 0 ||
        data.show !== item.show;

      if (!hasChanges) {
        toast.info("هیچ تغییری اعمال نشده است");
        return;
      }

      appendCommonFields();
      updateItem({ id: item?.id, formData }, { onSuccess: onClose });
    } else {
      appendCommonFields();
      createItem(formData, {
        onSuccess: () => {
          toast.success("محصول افزوده شد");
          onClose();
        },
      });
    }
  };

  return {
    // Form state
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    errors,
    isSubmitting,
    isEditing,

    // Form arrays
    ingredientFields,
    appendIngredient,
    removeIngredient,

    // Image handling
    imagePreview,
    imageFiles,
    isCompressing,
    handleImageChange,
    removeImage,

    // Actions
    onSubmit,
    onError,
    handleClose,

    // Data
    categories,
  };
}
