"use client";
import { useState } from "react";
import { useGetCommentsItems, SortBy } from "@/services/Comments";
import { ImageGallery, ItemInfo, PriceSection, CommentsSection } from "./index";
import { MenuItemDetails } from "@/app/(main)/menu/[id]/page";

export default function ItemsDetails({ item }: { item: MenuItemDetails }) {
  const [activeImage, setActiveImage] = useState(0);
  const [limit, setLimit] = useState(2);
  const [sortBy, setSortBy] = useState<SortBy>("newest");

  // Calculate prices
  const originalPrice = item?.price;
  const discount = item?.discount;
  const finalPrice =
    discount > 0
      ? originalPrice - (originalPrice * discount) / 100
      : originalPrice;

  // Comments data
  const { data: comments, isLoading: isLoadingComments } = useGetCommentsItems({
    itemId: item?.id,
    limit,
    sortBy,
  });

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-28">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-[10%] left-[15%] w-96 h-96 bg-amber-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[15%] right-[20%] w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animation-delay-2000"></div>
        <div className="absolute top-1/3 left-1/2 w-64 h-64 bg-amber-300/15 rounded-full blur-2xl animation-delay-4000"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left side: Images */}
        <div className="space-y-8">
          <ImageGallery
            images={item?.images}
            activeImage={activeImage}
            onImageChange={setActiveImage}
          />
        </div>

        {/* Right side: Content */}
        <div className="space-y-8">
          {/* Item information */}
          <ItemInfo
            item={item}
            finalPrice={finalPrice}
            originalPrice={originalPrice}
            discount={discount}
          />

          {/* Price and add to cart */}
          <PriceSection
            item={item}
            finalPrice={finalPrice}
            originalPrice={originalPrice}
            discount={discount}
          />

          {/* Comments section */}
          <CommentsSection
            itemId={item?.id}
            comments={comments}
            isLoading={isLoadingComments}
            limit={limit}
            sortBy={sortBy}
            onLimitChange={setLimit}
            onSortChange={setSortBy}
          />
        </div>
      </div>
    </div>
  );
}
