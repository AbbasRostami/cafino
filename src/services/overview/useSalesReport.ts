import { useGet } from "@/hooks/useReactQueryHooks";
import { SalesReportResponse } from "@/types/admin/overview";

interface UseSalesReportProps {
  start: string;
  end: string;
}

export const useSalesReport = ({ start, end }: UseSalesReportProps) => {
  const { data, isLoading, error } = useGet<SalesReportResponse>(
    `/v1/admin/overview/sales-report?start=${start}&end=${end}`,
    {
      queryKey: ["sales-report", start, end],
    }
  );

  return {
    data: data?.data,
    isLoading,
    error,
  };
};
