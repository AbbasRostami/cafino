import { useQuery } from "@tanstack/react-query";

export const useGetProvinces = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["provinces"],
    queryFn: () =>
      fetch("https://iranplacesapi.liara.run/api/provinces").then((res) =>
        res.json()
      ),
    staleTime: 1000 * 60 * 60,
  });

  return { data, isLoading, isError };
};
