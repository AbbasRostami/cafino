import { fetchWithServer } from "@/hooks/api/fetchApiWithCookies";
import { MenuItemResponse } from "@/types/main/menu";

type GetItemsParams = {
  queryString?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
};

export const getItemsServer = async ({
  queryString,
  page = 1,
  limit = 15,
  sortBy = "topRated",
}: GetItemsParams): Promise<MenuItemResponse> => {
  try {
    const qs =
      queryString ||
      new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sortBy,
      }).toString();

    const res = await fetchWithServer(`/v1/item?${qs}`);
    const data = await res.json();

    return {
      data: {
        items: data?.data?.items || [],
        total: data?.data?.total || 0,
        page: data?.data?.page || page,
        limit: data?.data?.limit || limit,
      },
    };
  } catch (error) {
    return { data: { items: [], total: 0, page, limit } };
  }
};
