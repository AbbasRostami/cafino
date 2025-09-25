"use client";
import { useState } from "react";
import { useGetItemDetails } from "@/services/items";
import { useGetCommentsItems } from "@/services";
import { ImageGallery, ItemInfo, PriceSection, CommentsSection } from "./index";
import { Item, SortBy } from "@/types/main";

export default function ItemsDetails({
  id,
  slug,
  initialItem,
}: {
  id: string;
  slug: string;
  initialItem?: Item;
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [limit, setLimit] = useState(2);
  const [sortBy, setSortBy] = useState<SortBy>("newest");
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);

  const { data } = useGetItemDetails(id, slug, initialItem);

  const { data: CommentsItems, isLoading: isLoadingComments } =
    useGetCommentsItems({
      itemId: id,
      page: 1,
      limit,
      sortBy,
    });

  const originalPrice = data?.item?.price;
  const discount = data?.item?.discount;
  const finalPrice =
    discount > 0
      ? originalPrice - (originalPrice * discount) / 100
      : originalPrice;

  return (
    <div className="px-4 md:px-8 lg:px-8 xl:px-24">
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-[10%] left-[15%] w-96 h-96 bg-amber-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[15%] right-[20%] w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animation-delay-2000"></div>
        <div className="absolute top-1/3 left-1/2 w-64 h-64 bg-amber-300/15 rounded-full blur-2xl animation-delay-4000"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-8">
          <ImageGallery
            images={data?.item?.images}
            activeImage={activeImage}
            onImageChange={setActiveImage}
            discount={discount}
          />
        </div>

        <div className="space-y-8">
          <ItemInfo
            item={data?.item}
            finalPrice={finalPrice}
            originalPrice={originalPrice}
            discount={discount}
          />

          <PriceSection
            item={data?.item}
            finalPrice={finalPrice}
            originalPrice={originalPrice}
            discount={discount}
          />

          <CommentsSection
            itemId={id}
            comments={CommentsItems}
            isLoading={isLoadingComments}
            limit={limit}
            sortBy={sortBy}
            onLimitChange={setLimit}
            onSortChange={setSortBy}
            onReplyClick={setActiveReplyId}
            activeReplyId={activeReplyId}
          />
        </div>
      </div>
    </div>
  );
}
