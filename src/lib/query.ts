export type MenuQueryParams = {
  categoryId?: string;
  page: number;
  limit: number;
  sortBy?: string;
  minPrice?: string;
  maxPrice?: string;
  search?: string;
  availableOnly?: string;
};

export const getMenuQueryParams = (
  searchParams: URLSearchParams
): {
  query: MenuQueryParams;
  queryString: string;
} => {
  const query: MenuQueryParams = {
    categoryId: searchParams.get("categoryId") || undefined,
    page: Number(searchParams.get("page") || 1),
    limit: Number(searchParams.get("limit") || 6),
    sortBy: searchParams.get("sortBy") || undefined,
    minPrice: searchParams.get("minPrice") || undefined,
    maxPrice: searchParams.get("maxPrice") || undefined,
    search: searchParams.get("search") || undefined,
    availableOnly: searchParams.get("availableOnly") || undefined,
  };

  const params = new URLSearchParams();
  params.set("page", query.page.toString());
  params.set("limit", query.limit.toString());

  const optionalKeys: (keyof MenuQueryParams)[] = [
    "categoryId",
    "sortBy",
    "minPrice",
    "maxPrice",
    "search",
    "availableOnly",
  ];

  for (const key of optionalKeys) {
    const val = query[key];
    if (val !== undefined) {
      params.set(key as string, val.toString());
    }
  }

  return {
    query,
    queryString: params.toString(),
  };
};
