import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger } from "@/components/ui/popover";

import { AddressFormData, FormContentAddressProps } from "@/types/Profile";
import { addressFormSchema } from "@/schemas/profile";
import { MotionForm } from "@/utils/MotionWrapper";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//   Command,
//   CommandItem,
//   CommandGroup,
//   CommandEmpty,
//   CommandList,
//   CommandInput,
// } from "@/components/ui/command";
import { ChevronsUpDown, Info, Save } from "lucide-react";
import { cn } from "@/utils/utils";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
// import { useState } from "react";

export const FormContent = ({
  onSubmit,
  // provinces,
  // filteredCities,
  // formData,
  onFormDataChange,
  onCancel,
  isAdding,
}: FormContentAddressProps) => {
  // const [provinceOpen, setProvinceOpen] = useState(false);
  // const [cityOpen, setCityOpen] = useState(false);
  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      address: "",
      province: "گیلان",
      city: "رشت",
    },
  });

  const handleSubmit = (data: AddressFormData) => {
    onSubmit(data);
    form.reset();
  };

  // const handleProvinceChange = (value: string) => {
  //   form.setValue("province", value);
  //   form.setValue("city", "");
  //   onFormDataChange({ ...formData, province: value, city: "" });
  // };

  // const handleCityChange = (value: string) => {
  //   form.setValue("city", value);
  //   onFormDataChange({ ...formData, city: value });
  // };

  const handleCancel = () => {
    form.reset();
    onFormDataChange({ address: "", province: "", city: "" });
    onCancel();
  };

  return (
    <MotionForm
      dir="rtl"
      onSubmit={form.handleSubmit(handleSubmit)}
      className="grid grid-cols-2 gap-6 pt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <p className="col-span-2 text-sm bg-amber-100 dark:bg-amber-700/50 text-gray-800 dark:text-gray-200 text-center border border-amber-200 dark:border-amber-600 rounded-lg p-2 flex items-center gap-2 justify-start">
        <Info className="w-4 h-4 text-amber-700 dark:text-amber-400" />
        <span className="text-xs text-right ">
          در حاضر امکان سفارش فقط از شعبه گیلان، رشت وجود دارد.
        </span>
      </p>
      <div className="col-span-2 space-y-1">
        <Label htmlFor="title">عنوان آدرس</Label>
        <Textarea
          id="title"
          {...form.register("address")}
          placeholder="مثال: گیلان، رشت، خیابان امام، کوچه"
          className="rounded-lg max-h-[100px] overflow-y-auto scrollbar-hide"
          rows={3}
          maxLength={200}
          style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 text-left">
          {form.watch("address")?.length || 0}/200 کاراکتر باقی مانده
        </p>
        {form?.formState?.errors?.address && (
          <p className="text-sm text-red-500">
            {form?.formState?.errors?.address?.message}
          </p>
        )}
      </div>

      <div className="space-y-2 col-span-2 md:col-span-1">
        <Label htmlFor="province">استان</Label>
        <Popover open={false}>
          {/* <Popover open={provinceOpen} onOpenChange={setProvinceOpen}> */}
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              disabled
              className={cn(
                "w-full justify-between rounded-lg",
                !form.watch("province") && "text-muted-foreground"
              )}
            >
              {/* {form.watch("province") || "انتخاب استان"}  */}
              {"گیلان"}
              <ChevronsUpDown className="opacity-50 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          {/* <PopoverContent className="w-full p-0 border-none">
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
          </PopoverContent> */}
        </Popover>
        {form?.formState?.errors?.province && (
          <p className="text-sm text-red-500">
            {form?.formState?.errors?.province?.message}
          </p>
        )}
      </div>

      <div className="space-y-2 col-span-2 md:col-span-1">
        <Label htmlFor="city">شهر</Label>
        <Popover open={false}>
          {/* <Popover open={cityOpen} onOpenChange={setCityOpen}> */}
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              // disabled={!form.watch("province")}
              disabled
              className={cn(
                "w-full justify-between rounded-lg",
                !form.watch("city") && "text-muted-foreground"
              )}
            >
              {/* {form.watch("city") || "ابتدا استان را انتخاب کنید"} */}
              {"رشت"}
              <ChevronsUpDown className="opacity-50 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          {/* <PopoverContent className="w-full p-0 border-none">
            <Command>
              <CommandInput placeholder="جستجوی شهر..." className="h-9" />
              <CommandList className="max-h-56 overflow-y-auto">
                <CommandEmpty>شهری پیدا نشد.</CommandEmpty>
                <CommandGroup>
                  {filteredCities?.map((city) => (
                    <CommandItem
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
          </PopoverContent> */}
        </Popover>
        {form?.formState?.errors?.city && (
          <p className="text-sm text-red-500">
            {form?.formState?.errors?.city?.message}
          </p>
        )}
      </div>

      <div className="col-span-2 flex justify-end gap-3 pt-3">
        <Button
          type="button"
          variant="outline"
          className="rounded-lg"
          onClick={handleCancel}
        >
          انصراف
        </Button>
        <Button
          disabled={isAdding}
          type="submit"
          variant="default"
          className="rounded-lg bg-gradient-to-r from-amber-400 to-yellow-500 hover:to-yellow-600 text-gray-900 font-semibold shadow-md transition-all gap-2"
        >
          {isAdding ? (
            <>
              <Spinner />
              <span>در حال ذخیره...</span>
            </>
          ) : (
            <>
              <Save />
              <span>افزودن آدرس</span>
            </>
          )}
        </Button>
      </div>
    </MotionForm>
  );
};
