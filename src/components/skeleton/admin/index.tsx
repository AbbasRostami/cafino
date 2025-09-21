import { Skeleton } from "@/components/ui/skeleton";
import { TableRow, TableCell } from "@/components/ui/table";

interface TableSkeletonRowsProps {
  rowCount?: number;
  columnCount: number;
}

export function TableSkeletonRows({
  rowCount = 5,
  columnCount,
}: TableSkeletonRowsProps) {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <TableRow
          key={`skeleton-${rowIndex}`}
          className={`transition-colors duration-200 text-center ${
            rowIndex % 2 === 0
              ? "bg-gray-50 dark:bg-gray-800"
              : "bg-white dark:bg-gray-900"
          }`}
        >
          {Array.from({ length: columnCount }).map((_, colIndex) => (
            <TableCell
              key={`skeleton-cell-${colIndex}`}
              className="p-5 font-bold text-gray-700 dark:text-gray-200 whitespace-nowrap"
            >
              <Skeleton className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

export {
  StatisticsSkeleton,
  UsersMetricsSkeleton,
  OrderMetricsSkeleton,
  RevenueMetricsSkeleton,
  ItemsMetricsSkeleton,
  CommentsMetricsSkeleton,
  LatestCommentsSkeleton,
} from "./overview";

export { AdminTicketChatSkeleton } from "./AdminTicketChatSkeleton";
