import ItemSectionClient from "./ItemSectionClient";
import Script from "next/script";
import {
  generateItemsSectionStructuredData,
  generateRestaurantStructuredData,
} from "@/lib/metadata/itemsSection";
import { getItemsServer } from "@/services/server/useGetItemsServer";
import { Item } from "@/types/main";

export default async function ItemSection() {
  const itemsResponse = await getItemsServer({
    queryString: "page=1&limit=15&sortBy=topRated",
  });

  const items = itemsResponse?.data?.items || [];

  const itemsStructuredData = generateItemsSectionStructuredData(
    items as Item[]
  );
  const restaurantStructuredData = generateRestaurantStructuredData();

  return (
    <>
      <Script
        id="items-section-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemsStructuredData).replace(/</g, "\u003c"),
        }}
      />
      <Script
        id="restaurant-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(restaurantStructuredData).replace(
            /</g,
            "\u003c"
          ),
        }}
      />
      <ItemSectionClient items={items as Item[]} />
    </>
  );
}
