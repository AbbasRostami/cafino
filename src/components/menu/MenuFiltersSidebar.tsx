"use client";
import { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import { useGet } from "@/hooks/useReactQueryHooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { SkeletonSidebar } from "../skeleton/SkeletonSidebar";
import MobileSheet from "./MobileSheet";
import DesktopSidebar from "./DesktopSidebar";

const MenuFiltersSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: categories, isLoading } = useGet<any>("/v1/category", {
    queryKey: ["categories"],
    staleTime: 0,
  });
  const searchParams = useSearchParams();
  const selectedCategoryId = searchParams.get("categoryId") || null;
  const router = useRouter();
  const DEFAULT_MIN = 0;
  const DEFAULT_MAX = 200000;
  const initialMinRaw = searchParams.get("minPrice");
  const initialMaxRaw = searchParams.get("maxPrice");
  const initialMin =
    initialMinRaw && Number(initialMinRaw) > DEFAULT_MIN
      ? Number(initialMinRaw)
      : DEFAULT_MIN;
  const initialMax =
    initialMaxRaw && Number(initialMaxRaw) > DEFAULT_MIN
      ? Number(initialMaxRaw)
      : DEFAULT_MAX;
  const [priceRange, setPriceRange] = useState<[number, number]>([
    initialMin,
    initialMax,
  ]);
  const [debouncedPriceRange] = useDebounce(priceRange, 500);
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedPriceRange[0] !== DEFAULT_MIN) {
      params.set("minPrice", String(debouncedPriceRange[0]));
    } else {
      params.delete("minPrice");
    }
    if (debouncedPriceRange[1] !== DEFAULT_MAX) {
      params.set("maxPrice", String(debouncedPriceRange[1]));
    } else {
      params.delete("maxPrice");
    }
    params.set("page", "1");
    router.push(`?${params.toString()}`, { scroll: false });
  }, [debouncedPriceRange]);
  const isAvailableOnly: boolean = searchParams.get("availableOnly") === "true";
  const hasActiveFilters =
    selectedCategoryId ||
    priceRange[0] !== DEFAULT_MIN ||
    priceRange[1] !== DEFAULT_MAX;
  const clearAllFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("categoryId");
    params.delete("minPrice");
    params.delete("maxPrice");
    params.set("page", "1");
    router.push(`?${params.toString()}`);
    setPriceRange([DEFAULT_MIN, DEFAULT_MAX]);
  };
  const [tempCategoryId, setTempCategoryId] = useState<string | null>(
    selectedCategoryId
  );
  const [tempPriceRange, setTempPriceRange] =
    useState<[number, number]>(priceRange);
  const [tempAvailableOnly, setTempAvailableOnly] =
    useState<boolean>(isAvailableOnly);
  useEffect(() => {
    setTempCategoryId(selectedCategoryId);
    setTempPriceRange(priceRange);
    setTempAvailableOnly(isAvailableOnly);
  }, [isOpen]);
  if (isLoading) return <SkeletonSidebar />;
  const FilterSectionHeader = ({ title }: { title: string }) => (
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white">
        <Filter size={18} />
      </div>
      <h3 className="text-lg font-bold text-gray-800 dark:text-white">
        {title}
      </h3>
    </div>
  );
  return (
    <>
      <DesktopSidebar
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        searchParams={searchParams}
        router={router}
        hasActiveFilters={Boolean(hasActiveFilters)}
        clearAllFilters={clearAllFilters}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        DEFAULT_MIN={DEFAULT_MIN}
        DEFAULT_MAX={DEFAULT_MAX}
        isAvailableOnly={isAvailableOnly}
      />
      <MobileSheet
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        tempCategoryId={tempCategoryId}
        setTempCategoryId={setTempCategoryId}
        tempPriceRange={tempPriceRange}
        setTempPriceRange={setTempPriceRange}
        tempAvailableOnly={tempAvailableOnly}
        setTempAvailableOnly={setTempAvailableOnly}
        categories={categories}
        FilterSectionHeader={FilterSectionHeader}
        DEFAULT_MIN={DEFAULT_MIN}
        DEFAULT_MAX={DEFAULT_MAX}
        searchParams={searchParams}
        router={router}
      />
    </>
  );
};

export default MenuFiltersSidebar;
