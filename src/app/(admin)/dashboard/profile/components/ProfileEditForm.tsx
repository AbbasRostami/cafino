"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Form, useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

const ProfileEditForm = ({
  isEditing,
  setIsEditing,
}: {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}) => {
  const userData = {
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "09123456789",
    email: "john.doe@example.com",
    profilePicture: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  };

  if (true)
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-5">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-xl border border-gray-100 bg-white p-5 dark:border-gray-700/60 dark:bg-gray-800/50"
          >
            <div className="flex items-start gap-4">
              <Skeleton className="mt-1 h-10 w-10 rounded-lg bg-indigo-200 dark:bg-indigo-900/30" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-24 rounded-md" />
                <Skeleton className="h-4 w-32 rounded-md" />
              </div>
            </div>
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-100/20 dark:bg-indigo-900/20 opacity-30" />
          </div>
        ))}
      </div>
    );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      phoneNumber: userData.phoneNumber,
      email: userData.email,
      profilePicture: userData.profilePicture,
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div
      className={`transition-all duration-500 ease-in-out overflow-hidden ${
        isEditing ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      {isEditing && (
        <div className="w-full mt-6 mb-7 bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <Form onSubmit={handleSubmit(onSubmit) as any}>
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                  نام
                </label>
                <Input
                  type="text"
                  name="firstName"
                  className="form-input w-full"
                />
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstName?.message}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                  نام خانوادگی
                </label>
                <Input
                  type="text"
                  name="lastName"
                  className="form-input w-full"
                />
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastName?.message}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                  ایمیل
                </label>
                <Input
                  type="email"
                  name="email"
                  className="form-input w-full"
                />
                <p className="text-red-500 text-sm mt-1">
                  {errors.email?.message}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                  شماره تلفن
                </label>
                <Input
                  type="text"
                  name="phoneNumber"
                  className="form-input w-full"
                />
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber?.message}
                </p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                  لینک عکس پروفایل
                </label>
                <Input
                  type="text"
                  name="profilePicture"
                  className="form-input w-full"
                />
                <p className="text-red-500 text-sm mt-1">
                  {errors.profilePicture?.message}
                </p>
              </div>

              <div className="col-span-full">
                <button
                  type="submit"
                  disabled={true}
                  className="w-full bg-gradient-to-r from-[#e89300] to-[#ffe848] text-gray-900 font-bold py-5 rounded-lg hover:bg-gray-600 transition-all duration-300"
                >
                  {true ? (
                    <>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-gray-900 text-lg font-bold">
                          ذخیره تغییرات...
                        </span>
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-gray-900 text-lg font-bold">
                        ذخیره تغییرات
                      </span>
                    </div>
                  )}
                </button>
              </div>
            </Form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default ProfileEditForm;
