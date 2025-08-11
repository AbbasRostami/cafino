import { useDelete, useGet, usePost, usePut } from "@/hooks/useReactQueryHooks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  AddressResponse,
  AddressRequest,
  DeleteAddressRequest,
  UpdateAddressRequest,
} from "@/types/Profile";

export const useGetAddresses = () => {
  const { data, isLoading, isError } = useGet<AddressResponse>(
    `/v1/profile/address`,
    {
      queryKey: ["addresses"],
    }
  );
  return {
    data,
    isLoading,
    isError,
  };
};

export const useAddAddress = () => {
  const queryClient = useQueryClient();

  return usePost<AddressRequest>(() => `/v1/profile/address`, undefined, {
    onSuccess: () => {
      toast.success("آدرس با موفقیت اضافه شد");
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
    onError: () => {
      toast.error("خطا در اضافه کردن آدرس");
    },
  });
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useDelete<unknown, DeleteAddressRequest>(
    (data) => `/v1/profile/address/${data?.id}`,
    {
      onSuccess: () => {
        toast.success("آدرس با موفقیت حذف شد");
        queryClient.invalidateQueries({ queryKey: ["addresses"] });
      },
      onError: () => {
        toast.error("خطا در حذف آدرس");
      },
    }
  );
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();

  return usePut<UpdateAddressRequest>(
    (data) => `/v1/profile/address/${data.id}`,
    (data) => {
      const { id, ...body } = data;
      return body;
    },
    {
      onSuccess: () => {
        toast.success("آدرس با موفقیت ویرایش شد");
        queryClient.invalidateQueries({ queryKey: ["addresses"] });
      },
      onError: () => {
        toast.error("خطا در ویرایش آدرس");
      },
    }
  );
};

export const useGetProvinces = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["provinces"],
    queryFn: () =>
      fetch("https://iranplacesapi.liara.run/api/provinces").then((res) =>
        res.json()
      ),
    staleTime: 1000 * 60 * 60, // 1 ساعت
  });

  return { data, isLoading, isError };
};

export const useGetCities = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cities"],
    queryFn: () =>
      fetch("https://iranplacesapi.liara.run/api/cities").then((res) =>
        res.json()
      ),
    staleTime: 1000 * 60 * 60,
  });

  return { data, isLoading, isError };
};
