import { useMemo, useState } from "react";
import { useQueryStates, debounce, parseAsInteger, parseAsString } from "nuqs";
import { DEFAULT_MIN, DEFAULT_MAX } from "@/utils/menuSearchParams";
export const useMenuFiltersNuqs = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Use query states to manage filters
  const [filters, setFilters] = useQueryStates(
    {
      search: parseAsString.withDefault("").withOptions({ shallow: false }),
      page: parseAsInteger.withDefault(1),
      limit: parseAsInteger.withDefault(6),
      category: parseAsString,
      sortBy: parseAsString,
      minPrice: parseAsInteger.withDefault(DEFAULT_MIN),
      maxPrice: parseAsInteger.withDefault(DEFAULT_MAX),
      availableOnly: parseAsString,
    },
    {
      clearOnDefault: true,
      shallow: false,
    }
  );

  // Build query string to use in useGetItems hook
  const queryString = useMemo(() => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value == null || value === "") return;

      if (key === "minPrice" && value === DEFAULT_MIN) return;
      if (key === "maxPrice" && value === DEFAULT_MAX) return;
      if (key === "page" && value === 1) return;
      if (key === "limit" && value === 6) return;

      params.set(key, String(value));
    });

    return params.toString();
  }, [filters]);

  const handleViewModeChange = (mode: "grid" | "list") => {
    setViewMode(mode);
  };

  // old way to clear filters

  // const clearFilters = () => {
  //   Object.keys(filters).forEach((key) => {
  //     setFilters({ [key]: null });
  //   });
  // };

  // new way to clear filters
  const clearFilters = () => {
    setFilters({
      category: null,
      sortBy: null,
      minPrice: null,
      maxPrice: null,
      availableOnly: null,
      search: "",
      page: 1,
      limit: 6,
    });
  };

  const handleSearchChange = (value: string) => {
    setFilters(
      { search: value },
      {
        limitUrlUpdates: value === "" ? undefined : debounce(500),
      }
    );
  };

  const hasActiveFilters = useMemo(() => {
    return Boolean(
      filters.category ||
        filters.search ||
        filters.sortBy ||
        (filters.minPrice !== null && filters.minPrice !== DEFAULT_MIN) ||
        (filters.maxPrice !== null && filters.maxPrice !== DEFAULT_MAX) ||
        filters.availableOnly
    );
  }, [filters]);

  return {
    filters,
    queryString,
    setFilters,

    viewMode,
    setViewMode,
    handleViewModeChange,

    clearFilters,

    handleSearchChange,

    hasActiveFilters,

    DEFAULT_MIN,
    DEFAULT_MAX,
  };
};
