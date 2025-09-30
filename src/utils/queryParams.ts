export type MenuQueryParams = {
  category?: string;
  page: number;
  limit: number;
  sortBy?: string;
  minPrice?: string;
  maxPrice?: string;
  search?: string;
  availableOnly?: string;
};

export const convertSearchParamsToURLSearchParams = (searchParams: {
  [key: string]: string | string[] | undefined;
}): URLSearchParams => {
  const urlSearchParams = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach((v) => urlSearchParams.append(key, v));
      } else {
        urlSearchParams.set(key, value);
      }
    }
  });

  return urlSearchParams;
};

export const getMenuQueryParams = (
  searchParams: URLSearchParams
): {
  query: MenuQueryParams;
  queryString: string;
} => {
  const query: MenuQueryParams = {
    category: searchParams.get("category") || undefined,
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
    "category",
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
