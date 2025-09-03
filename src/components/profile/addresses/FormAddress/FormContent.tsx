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
  AddressFormData,
  FormContentAddressProps,
  Province,
} from "@/types/Profile";
import { addressFormSchema } from "@/schemas/profile";
import { MotionForm } from "@/utils/MotionWrapper";

export const FormContent = ({
  onSubmit,
  editingId,
  provinces,
  filteredCities,
  formData,
  onFormDataChange,
  onCancel,
}: FormContentAddressProps) => {
  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: formData,
  });

  const handleSubmit = (data: AddressFormData) => {
    onSubmit(data);
    form.reset();
  };

  const handleProvinceChange = (value: string) => {
    form.setValue("province", value);
    form.setValue("city", "");
    onFormDataChange({ ...formData, province: value, city: "" });
  };

  const handleCityChange = (value: string) => {
    form.setValue("city", value);
    onFormDataChange({ ...formData, city: value });
  };

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
      <div className="col-span-2 space-y-1">
        <Label htmlFor="title">عنوان آدرس</Label>
        <Input
          id="title"
          {...form.register("address")}
          placeholder="مثال: مازندران، ساری، خیابان امام، کوچه"
          className="rounded-lg"
        />
        {form?.formState?.errors?.address && (
          <p className="text-sm text-red-500">
            {form?.formState?.errors?.address?.message}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="province">استان</Label>
        <Select
          onValueChange={handleProvinceChange}
          value={form.watch("province")}
        >
          <SelectTrigger className="w-full rounded-lg">
            <SelectValue placeholder="انتخاب استان" />
          </SelectTrigger>
          <SelectContent>
            {provinces?.map((province: Province) => (
              <SelectItem key={province.id} value={province.name}>
                {province.name}
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

      <div className="space-y-1">
        <Label htmlFor="city">شهر</Label>
        <Select
          onValueChange={handleCityChange}
          value={form.watch("city")}
          disabled={!form.watch("province")}
        >
          <SelectTrigger className="w-full rounded-lg">
            <SelectValue placeholder="انتخاب شهر" />
          </SelectTrigger>
          <SelectContent>
            {filteredCities?.map((city) => (
              <SelectItem key={city.id} value={city.name}>
                {city.name}
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
          disabled={
            !form.watch("address") ||
            !form.watch("province") ||
            !form.watch("city") ||
            form?.formState?.isSubmitting
          }
          type="submit"
          variant="default"
          className="rounded-lg bg-gradient-to-r from-amber-400 to-yellow-500 hover:to-yellow-600 text-gray-900 font-semibold shadow-md transition-all gap-2"
        >
          {editingId ? "ذخیره تغییرات" : "افزودن آدرس"}
        </Button>
      </div>
    </MotionForm>
  );
};
