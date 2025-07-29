"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPinCheck,
  MapPinHouse,
  Pencil,
  Plus,
  Trash2,
  MapPin,
  X,
  Truck,
  CheckCircle,
  Clock,
} from "lucide-react";
import {
  useAddAddress,
  useDeleteAddress,
  useGetAddresses,
  useGetCities,
  useGetProvinces,
  useUpdateAddress,
} from "@/services/address";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useQuery } from "@tanstack/react-query";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { AddressSkeleton } from "@/components/skeleton/AddressSkeleton";

interface AddressFormData {
  title: string;
  province: string;
  city: string;
}
interface Province {
  id: number;
  name: string;
}

interface City {
  id: number;
  name: string;
  province_id: number;
}

export default function AddressesPage() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const { data: addressesData, isLoading } = useGetAddresses();
  const { mutate: deleteAddress, isPending: isDeleting } = useDeleteAddress();
  const { mutate: updateAddress, isPending: isUpdating } = useUpdateAddress();
  const { mutate: addAddress, isPending: isAdding } = useAddAddress();
  const form = useForm({
    defaultValues: {
      title: "",
      province: "",
      city: "",
    },
  });

  const onSubmit = (data: AddressFormData) => {
    const id = editingId;

    if (id) {
      updateAddress({
        id,
        address: data?.title,
        province: data?.province,
        city: data?.city,
      });
    } else {
      addAddress({
        address: data?.title,
        province: data?.province,
        city: data?.city,
      });
    }

    form.reset({
      title: "",
      province: "",
      city: "",
    });
    setEditingId(null);
    setOpen(false);
  };

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);

  const { data: provincesData } = useGetProvinces();
  const { data: citiesData } = useGetCities();

  useEffect(() => {
    setProvinces(provincesData as unknown as Province[]);
    setCities(citiesData as unknown as City[]);
  }, [provincesData, citiesData]);

  useEffect(() => {
    const selectedProvince = form.watch("province");
    if (selectedProvince) {
      const matchedProvince = provinces?.find(
        (p) => p.name === selectedProvince
      );
      const result = cities?.filter(
        (city) => city.province_id === matchedProvince?.id
      );
      setFilteredCities(result);
      form.setValue("city", "");
    }
  }, [form.watch("province"), provinces, cities]);

  if (isLoading) {
    return <AddressSkeleton />;
  }

  return (
    <div className="space-y-6 ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white flex items-center justify-center gap-3">
          <MapPin size={32} className="text-amber-600" />
          آدرس‌های من
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          آدرس‌های خود را مدیریت و به‌روزرسانی کنید
        </p>
      </motion.div>

      <Card className="rounded-3xl shadow-md border border-muted bg-white/90 dark:bg-gray-900/90">
        <CardHeader className="flex justify-end">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger dir="rtl" className="cursor-pointer" asChild>
              <Button
                size="sm"
                className="rounded-md px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 hover:to-yellow-600 text-gray-900 font-semibold shadow-md transition-all gap-2"
              >
                <Plus size={20} className="text-gray-900" />
                افزودن آدرس
              </Button>
            </DialogTrigger>
            <DialogContent
              showCloseButton={false}
              dir="rtl"
              className="sm:max-w-md text-right rtl:text-right rtl:items-end backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border border-muted shadow-xl rounded-2xl"
            >
              <DialogHeader>
                <DialogClose asChild>
                  <button
                    className="absolute left-4 top-4 opacity-70 transition-opacity hover:opacity-100 focus:outline-none"
                    aria-label="بستن"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </DialogClose>
                <DialogTitle className="text-right flex items-center gap-2 text-lg font-bold">
                  <MapPinHouse size={20} />
                  {editingId ? "ویرایش آدرس" : "افزودن آدرس"}
                </DialogTitle>
              </DialogHeader>
              <form
                dir="rtl"
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-2 gap-6 pt-4"
              >
                <div className="col-span-2 space-y-1">
                  <Label htmlFor="title">عنوان آدرس</Label>
                  <Input
                    id="title"
                    {...form.register("title")}
                    placeholder="مثال: مازندران، ساری، خیابان امام، کوچه"
                    className="rounded-lg"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="province">استان</Label>
                  <Select
                    onValueChange={(value) => {
                      form.setValue("province", value);
                      form.setValue("city", "");
                    }}
                    value={form.watch("province")}
                  >
                    <SelectTrigger className="w-full rounded-lg">
                      <SelectValue placeholder="انتخاب استان" />
                    </SelectTrigger>
                    <SelectContent>
                      {provincesData?.map((province: Province) => (
                        <SelectItem key={province.id} value={province.name}>
                          {province.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="city">شهر</Label>
                  <Select
                    onValueChange={(value) => form.setValue("city", value)}
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
                </div>

                <div className="col-span-2 flex justify-end gap-3 pt-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-lg"
                    onClick={() => {
                      form.reset();
                      setEditingId(null);
                      setOpen(false);
                    }}
                  >
                    انصراف
                  </Button>
                  <Button
                    disabled={
                      !form.watch("title") ||
                      !form.watch("province") ||
                      !form.watch("city")
                    }
                    type="submit"
                    variant="default"
                    className="rounded-lg bg-gradient-to-r from-amber-400 to-yellow-500 hover:to-yellow-600 text-gray-900 font-semibold shadow-md transition-all gap-2"
                  >
                    {editingId ? "ذخیره تغییرات" : "افزودن آدرس"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent>
          <div className="space-y-4 md:pb-8 pb-16">
            {addressesData?.data?.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                {/* Illustration */}
                <div className="relative mb-10">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-800/20 rounded-full flex items-center justify-center shadow-lg">
                    <MapPin className="h-20 w-20 text-amber-500 dark:text-amber-400" />
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 -mr-6 -mt-6">
                    <div className="w-16 h-16 rounded-full bg-amber-200/50 dark:bg-amber-700/30 blur-xl"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 -mb-6 -ml-6">
                    <div className="w-16 h-16 rounded-full bg-amber-200/50 dark:bg-amber-700/30 blur-xl"></div>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
                  هنوز آدرسی ثبت نکرده‌اید!
                </h2>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                  برای اینکه سفارشات خود را سریعتر دریافت کنید، اولین آدرس خود
                  را اضافه کنید.
                </p>

                {/* Action Button */}
                <Button
                  size="lg"
                  onClick={() => setOpen(true)}
                  className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 dark:from-amber-500 dark:to-yellow-600 text-white dark:text-gray-900 shadow-lg shadow-amber-500/30 hover:shadow-amber-600/40 px-8 py-6 rounded-xl font-bold text-lg group transition-all duration-300 transform hover:-translate-y-1"
                >
                  <Plus className="h-6 w-6 mr-2 group-hover:rotate-90 transition-transform" />
                  افزودن اولین آدرس
                </Button>

                {/* Benefits section */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 w-full max-w-md mx-auto mb-14">
                  <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-4">
                    مزایای افزودن آدرس:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                      <Truck className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">
                          تحویل سریع‌تر
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          بدون نیاز به وارد کردن مکرر آدرس
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                      <CheckCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">
                          دقت بیشتر
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          اطمینان از صحت آدرس تحویل
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                      <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">
                          صرفه‌جویی در زمان
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          فرایند سریع‌تر ثبت سفارش
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                      <MapPinCheck className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-1" />
                      <div>

                        <h4 className="font-medium text-gray-800 dark:text-white">
                          مدیریت آسان
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          امکان ویرایش و حذف آدرس‌ها
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              addressesData?.data?.map((address) => (
                <div
                  key={address?.id}
                  className="rounded-2xl p-5 border border-muted hover:border-amber-200 dark:hover:border-amber-500 hover:bg-muted/40 transition-all duration-200 shadow-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl"
                >
                  <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-between items-start md:items-center ">
                    <div className="space-y-1">
                      <h3 className="text-base font-bold text-foreground">
                        {address?.province} - {address?.city}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {address?.address}
                      </p>
                    </div>
                    <div className="flex gap-2 flex-wrap justify-end md:justify-start">
                      <Button
                        size="sm"
                        onClick={() => {
                          setEditingId(address?.id);
                          form.reset({
                            title: address?.address,
                            province: address?.province,
                            city: address?.city,
                          });
                          setOpen(true);
                        }}
                        className="rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-medium gap-1"
                      >
                        <Pencil size={16} />
                        ویرایش
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={isDeleting}
                        onClick={() => deleteAddress({ id: address.id })}
                        className="rounded-lg gap-1"
                      >
                        <Trash2 size={16} />
                        حذف
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
