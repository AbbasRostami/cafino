import { fetchWithServer } from "@/hooks/api/fetchApiWithCookies";
import { Items } from "@/types";

export async function useGetItemsDetailsServer(
  id: string,
  slug: string
): Promise<Items | null> {
  try {
    const res = await fetchWithServer(`/v1/item/item-${id}/${slug}`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    return data?.data as Items;
  } catch {
    return null;
  }
}
