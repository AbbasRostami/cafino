import { MenuFilters } from "@/types";
import { parseAsString, parseAsInteger, createLoader } from "nuqs/server";

export const DEFAULT_MIN = 0;
export const DEFAULT_MAX = 10000000;

// Build query string from filters (for server-side only)
export const buildQueryString = (filters: MenuFilters) => {
  return new URLSearchParams(
    Object.entries(filters)
      .filter(([_, v]) => v != null && v !== "")
      .map(([k, v]) => [k, String(v)])
  ).toString();
};

const menuSearchParams = {
  search: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(6),
  category: parseAsString,
  sortBy: parseAsString,
  minPrice: parseAsInteger.withDefault(DEFAULT_MIN),
  maxPrice: parseAsInteger.withDefault(DEFAULT_MAX),
  availableOnly: parseAsString,
};

export const loadMenuSearchParams = createLoader(menuSearchParams);
