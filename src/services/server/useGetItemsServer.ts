import { fetchWithServer } from "@/hooks/fetchApiWithCookies";
import { ItemResponse } from "@/types/main";

export const useGetItemsServer = async (
  page: number = 1,
  limit: number = 15,
  sortBy: string = "topRated"
): Promise<ItemResponse> => {
  try {
    const res = await fetchWithServer(
      `/v1/item?page=${page}&limit=${limit}&sortBy=${sortBy}`
    );
    const data = await res.json();
    return data?.data as ItemResponse;
  } catch (error) {
    return { data: { items: [] } };
  }
};
