import { fetchWithServer } from "@/hooks/fetchApiWithCookies";
import { Items } from "@/types";

export async function useGetItemsDetailsServer(
  id: string
): Promise<Items | null> {
  try {
    const res = await fetchWithServer(`/v1/item/${id}`);
    const data = await res.json();
    return data?.data as Items;
  } catch {
    return null;
  }
}
