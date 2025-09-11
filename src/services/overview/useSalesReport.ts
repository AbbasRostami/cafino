import { useGet } from "@/hooks/useReactQueryHooks";
import { SalesReport } from "@/types/admin";

interface UseSalesReportProps {
  start: string;
  end: string;
}

export const useSalesReport = ({ start, end }: UseSalesReportProps) => {
  const { data, isLoading, error } = useGet<{ data: SalesReport }>(
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
