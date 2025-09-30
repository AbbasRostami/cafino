import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

const DEFAULT_MIN = 0;
const DEFAULT_MAX = 10000000;

interface UseMenuFiltersProps {
  initialViewMode?: "grid" | "list";
}

export const useMenuFilters = ({
  initialViewMode = "grid",
}: UseMenuFiltersProps = {}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [viewMode, setViewMode] = useState<"grid" | "list">(initialViewMode);

  const initialSearch = decodeURIComponent(searchParams.get("search") || "");
  const [input, setInput] = useState(initialSearch);
  const [debouncedInput] = useDebounce(input, 500);

  const filters = useMemo(
    () => ({
      category: searchParams.get("category") || null,
      page: Number(searchParams.get("page") || 1),
      limit: Number(searchParams.get("limit") || 6),
      minPrice: Number(searchParams.get("minPrice") || DEFAULT_MIN),
      maxPrice: Number(searchParams.get("maxPrice") || DEFAULT_MAX),
      availableOnly: searchParams.get("availableOnly") === "true",
      sortBy: searchParams.get("sortBy") || "",
      search: decodeURIComponent(searchParams.get("search") || ""),
    }),
    [searchParams]
  );

  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    const decodedCurrentSearch = decodeURIComponent(currentSearch);

    if (debouncedInput.trim() !== decodedCurrentSearch.trim()) {
      const params = new URLSearchParams(searchParams.toString());
      if (debouncedInput.trim() === "") {
        params.delete("search");
      } else {
        params.set("search", debouncedInput.trim());
      }
      params.set("page", "1");

      router.push(`?${params.toString()}`);
    }
  }, [debouncedInput, router]);

  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    const decodedCurrentSearch = decodeURIComponent(currentSearch);

    if (decodedCurrentSearch !== input) {
      setInput(decodedCurrentSearch);
    }
  }, [searchParams]);

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", value);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const handleViewModeChange = (mode: "grid" | "list") => {
    setViewMode(mode);
  };

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const updateFilter = useCallback(
    (updates: Record<string, string | number | boolean | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([name, value]) => {
        if (
          value === null ||
          value === "" ||
          value === false ||
          (typeof value === "number" &&
            (value === DEFAULT_MIN || value === DEFAULT_MAX))
        ) {
          params.delete(name);
        } else {
          params.set(name, String(value));
        }
      });

      params.set("page", "1");
      router.push(`?${params.toString()}`);
    },
    [searchParams, router]
  );

  const resetFilters = useCallback(() => {
    setInput("");
    const params = new URLSearchParams();
    params.set("page", "1");
    params.set("limit", "6");
    router.push(`?${params.toString()}`);
  }, [router]);

  const handleMinPriceInputChange = useCallback((value: number) => {
    return value;
  }, []);

  const handleMaxPriceInputChange = useCallback((value: number) => {
    return value;
  }, []);

  return {
    DEFAULT_MIN,
    DEFAULT_MAX,
    input,
    setInput,
    filters,
    updateFilter,
    resetFilters,
    hasActiveFilters: Boolean(
      filters?.category ||
        filters?.search ||
        filters?.sortBy !== "" ||
        filters?.minPrice !== DEFAULT_MIN ||
        filters?.maxPrice !== DEFAULT_MAX ||
        filters?.availableOnly
    ),
    viewMode,
    search: filters?.search,
    selectedSortBy: filters?.sortBy,
    pageParam: filters?.page,
    limitParam: filters?.limit,
    handleSortChange,
    handleViewModeChange,
    goToPage,
    clearFilters: resetFilters,
    handleMinPriceInputChange,
    handleMaxPriceInputChange,
  };
};
