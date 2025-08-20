"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { X, MapPin, Loader2 } from "lucide-react";
import { AddressFormData } from "@/schemas/profile";
import { addressFormSchema } from "@/schemas/profile";
import { MotionForm } from "@/utils/MotionWrapper";
import { useAddAddress, useGetCities, useGetProvinces } from "@/services";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useAddressForm } from "@/hooks/useAddressForm";
import { toast } from "sonner";
import { AddAddressModalProps } from "@/types/main";

export default function AddAddressModal({
  open,
  onOpenChange,
  onSuccess,
}: AddAddressModalProps) {
  const isMobile = useIsMobile();

  const { data: provincesData } = useGetProvinces();
  const { data: citiesData } = useGetCities();
  const addAddressMutation = useAddAddress();

  const { provinces, filteredCities, formData, updateFormData, resetFormData } =
    useAddressForm({
      provincesData: provincesData,
      citiesData: citiesData,
    });

  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: formData,
  });

  const handleSubmit = (data: AddressFormData) => {
    addAddressMutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        resetFormData();
        onSuccess();
        onOpenChange(false);
      },
      onError: () => {
        toast.error("خطا در افزودن آدرس");
      },
    });
  };

  const handleProvinceChange = (value: string) => {
    form.setValue("province", value);
    form.setValue("city", "");
    updateFormData({ province: value, city: "" });
  };

  const handleCityChange = (value: string) => {
    form.setValue("city", value);
    updateFormData({ city: value });
  };

  const handleCancel = () => {
    form.reset();
    resetFormData();
    onOpenChange(false);
  };

  const FormContent = (
    <MotionForm
      dir="rtl"
      onSubmit={form.handleSubmit(handleSubmit)}
      className="space-y-6 pt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="space-y-2">
        <Label htmlFor="province">استان</Label>
        <Select
          onValueChange={handleProvinceChange}
          value={form.watch("province")}
        >
          <SelectTrigger className="w-full rounded-lg">
            <SelectValue placeholder="انتخاب استان" />
          </SelectTrigger>
          <SelectContent>
            {provinces?.map((province) => (
              <SelectItem key={province?.id} value={province?.name}>
                {province?.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {form?.formState?.errors?.province && (
          <p className="text-sm text-red-500">
            {form?.formState?.errors?.province?.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="city">شهر</Label>
        <Select
          onValueChange={handleCityChange}
          value={form.watch("city")}
          disabled={!form.watch("province")}
        >
          <SelectTrigger className="w-full rounded-lg">
            <SelectValue placeholder="ابتدا استان را انتخاب کنید" />
          </SelectTrigger>
          <SelectContent>
            {filteredCities?.map((city) => (
              <SelectItem key={city?.id} value={city?.name}>
                {city?.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {form?.formState?.errors?.city && (
          <p className="text-sm text-red-500">
            {form?.formState?.errors?.city?.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">جزئیات آدرس</Label>
        <Input
          id="address"
          {...form.register("address")}
          placeholder="خیابان، کوچه، پلاک، واحد"
          className="rounded-lg"
        />
        {form?.formState?.errors?.address && (
          <p className="text-sm text-red-500">
            {form?.formState?.errors?.address?.message}
          </p>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          className="flex-1"
          disabled={addAddressMutation?.isPending}
        >
          انصراف
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
          disabled={addAddressMutation?.isPending}
        >
          {addAddressMutation?.isPending ? (
            <>
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              در حال افزودن...
            </>
          ) : (
            <>
              <MapPin className="ml-2 h-4 w-4" />
              افزودن آدرس
            </>
          )}
        </Button>
      </div>
    </MotionForm>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="rounded-t-2xl max-h-[90vh]">
          <DrawerHeader className="text-center">
            <DrawerTitle className="flex items-center justify-center gap-2 text-gray-800 dark:text-white">
              <MapPin
                className="text-amber-600 dark:text-amber-400"
                size={20}
              />
              افزودن آدرس جدید
            </DrawerTitle>
          </DrawerHeader>
          <div className="px-6 pb-6">{FormContent}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gray-800 dark:text-white">
            <MapPin className="text-amber-600 dark:text-amber-400" size={20} />
            افزودن آدرس جدید
          </DialogTitle>
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="بستن"
              className="absolute left-4 top-4 text-gray-500 dark:text-gray-400"
            >
              <X size={18} />
            </Button>
          </DialogClose>
        </DialogHeader>
        <div className="">{FormContent}</div>
      </DialogContent>
    </Dialog>
  );
}
