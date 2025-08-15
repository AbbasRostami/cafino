import { useQuery } from "@tanstack/react-query";

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
