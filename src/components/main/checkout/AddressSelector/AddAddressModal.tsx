"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { X, MapPin, Loader2, ChevronsUpDown, Info } from "lucide-react";
// import { Check } from "lucide-react"; // Maybe needed later
import { AddressFormData } from "@/schemas/profile";
import { addressFormSchema } from "@/schemas/profile";
import { MotionForm } from "@/utils/MotionWrapper";
import { useAddAddress, useGetCities, useGetProvinces } from "@/services";
import { useIsMobile } from "@/hooks/ui/useMediaQuery";
import { useAddressForm } from "@/hooks/business/useAddressForm";
import { AddAddressModalProps } from "@/types/main";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
// import { PopoverContent } from "@/components/ui/popover"; // Maybe needed later
// import {
//   Command,
//   CommandInput,
//   CommandList,
//   CommandEmpty,
//   CommandGroup,
//   CommandItem,
// } from "@/components/ui/command"; // Maybe needed later
import { cn } from "@/utils/utils";
// import { useState } from "react"; // Maybe needed later
import { Textarea } from "@/components/ui/textarea";

export default function AddAddressModal({
  open,
  onOpenChange,
  onSuccess,
}: AddAddressModalProps) {
  const isMobile = useIsMobile();

  // Maybe needed later for opening/closing popovers
  // const [provinceOpen, setProvinceOpen] = useState(false);
  // const [cityOpen, setCityOpen] = useState(false);

  const { data: provincesData } = useGetProvinces();
  const { data: citiesData } = useGetCities();
  const addAddressMutation = useAddAddress();

  // Maybe needed later for filtering cities
  const { formData, updateFormData, resetFormData } = useAddressForm({
    provincesData: provincesData,
    citiesData: citiesData,
  });
  // const { provinces, filteredCities, formData, updateFormData, resetFormData } = useAddressForm({
  //   provincesData: provincesData,
  //   citiesData: citiesData,
  // });

  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      province: "گیلان",
      city: "رشت",
      address: "",
    },
  });
  const address = form.watch("address");
  const addressLength = address?.length || 0;
  const addressRemaining = 200 - addressLength;
  const handleSubmit = (data: AddressFormData) => {
    addAddressMutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        resetFormData();
        onSuccess();
        onOpenChange(false);
      },
    });
  };

  // Maybe needed later for handling province/city changes
  // const handleProvinceChange = (value: string) => {
  //   form.setValue("province", value);
  //   form.setValue("city", "");
  //   updateFormData({ province: value, city: "" });
  // };

  // const handleCityChange = (value: string) => {
  //   form.setValue("city", value);
  //   updateFormData({ city: value });
  // };

  const handleCancel = () => {
    form.reset();
    resetFormData();
    onOpenChange(false);
  };

  const FormContent = (
    <MotionForm
      dir="rtl"
      onSubmit={form.handleSubmit(handleSubmit)}
      className="space-y-6 pt-4 overflow-x-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <p className="text-sm bg-amber-100 dark:bg-amber-700/50 text-gray-800 dark:text-gray-200 text-center border border-amber-200 dark:border-amber-600 rounded-lg p-2 flex items-center gap-2 justify-start">
        <Info className="w-4 h-4 text-amber-700 dark:text-amber-400" />
        در حاضر امکان سفارش فقط از شعبه گیلان، رشت وجود دارد.
      </p>
      <div className="space-y-2">
        <Label htmlFor="province">استان</Label>
        <Popover open={false}>
          {/* <Popover open={provinceOpen} onOpenChange={setProvinceOpen}> */}
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              disabled
              className={cn(
                "w-full justify-between rounded-lg cursor-not-allowed opacity-60"
              )}
            >
              {"گیلان"}
              {/* {form.watch("province") || "انتخاب استان"} */}
              <ChevronsUpDown className="opacity-50 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          {/*
          <PopoverContent className="w-full p-0 border-none">
            <Command>
              <CommandInput placeholder="جستجوی استان..." className="h-9" />
              <CommandList className="max-h-56 overflow-y-auto">
                <CommandEmpty>استانی پیدا نشد.</CommandEmpty>
                <CommandGroup>
                  {provinces?.map((province) => (
                    <CommandItem
                      key={province?.id}
                      value={province?.name}
                      onSelect={() => {
                        handleProvinceChange(province?.name);
                        setProvinceOpen(false);
                      }}
                    >
                      {province?.name}
                      <Check
                        className={cn(
                          "ml-auto",
                          province?.name === form.watch("province")
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
          */}
        </Popover>
        {form.formState.errors?.province && (
          <p className="text-sm text-red-500">
            {form.formState.errors.province.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="city">شهر</Label>
        <Popover open={false}>
          {/* <Popover open={cityOpen} onOpenChange={setCityOpen}> */}
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              disabled
              className={cn(
                "w-full justify-between rounded-lg cursor-not-allowed opacity-60"
              )}
            >
              {"رشت"}
              {/* {form.watch("city") || "ابتدا استان را انتخاب کنید"} */}
              <ChevronsUpDown className="opacity-50 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          {/* 
          <PopoverContent className="w-full p-0 border-none">
            <Command>
              <CommandInput placeholder="جستجوی شهر..." className="h-9" />
              <CommandList className="max-h-56 overflow-y-auto">
                <CommandEmpty>شهری پیدا نشد.</CommandEmpty>
                <CommandGroup>
                  {filteredCities?.map((city) => (
                    <CommandItem
                      disabled={true}
                      key={city?.id}
                      value={city?.name}
                      onSelect={() => {
                        handleCityChange(city?.name);
                        setCityOpen(false);
                      }}
                    >
                      {city?.name}
                      <Check
                        className={cn(
                          "ml-auto",
                          city?.name === form.watch("city")
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
          */}
        </Popover>
        {form.formState.errors?.city && (
          <p className="text-sm text-red-500">
            {form.formState.errors.city.message}
          </p>
        )}
      </div>

      <div className="space-y-2 ">
        <Label htmlFor="address">جزئیات آدرس</Label>
        <Textarea
          id="address"
          {...form.register("address")}
          placeholder="مثال:  گیلان، رشت، خیابان گلسار، کوچه یک، پلاک ۱۲۳"
          className="rounded-lg resize-none w-full max-w-full overflow-x-hidden break-words overflow-y-auto max-h-[100px]"
          rows={3}
          maxLength={200}
          style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 text-left">
          {addressRemaining} کاراکتر باقی مانده
        </p>
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
        <DrawerContent className="rounded-t-2xl border-none max-h-[90vh] scrollbar-hide">
          <DrawerHeader className="text-center">
            <DrawerTitle className="flex items-center justify-center gap-2 text-gray-800 dark:text-white">
              <MapPin
                className="text-amber-600 dark:text-amber-400"
                size={20}
              />
              افزودن آدرس جدید
            </DrawerTitle>
          </DrawerHeader>
          <div className="px-6 pb-6 overflow-x-hidden scrollbar-hide">
            {FormContent}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="max-w-md border-none">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gray-800 dark:text-white">
            <MapPin className="text-amber-600 dark:text-amber-400" size={20} />
            افزودن آدرس جدید
          </DialogTitle>
          <VisuallyHidden asChild>
            <DialogDescription>افزدون آدرس</DialogDescription>
          </VisuallyHidden>
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
        <div className="overflow-x-hidden">{FormContent}</div>
      </DialogContent>
    </Dialog>
  );
}
