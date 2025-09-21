import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TicketFilterProps } from "@/types";
import { Plus } from "lucide-react";

export default function TicketFilter({
  filters,
  onFilterChange,
  newTicket,
}: TicketFilterProps) {
  return (
    <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-4">
      <div className="flex items-center gap-2">
        <Select
          value={filters.sortBy}
          onValueChange={(value) =>
            onFilterChange("sortBy", value === "all" ? undefined : value)
          }
        >
          <SelectTrigger className="border-amber-600">
            <SelectValue placeholder="مرتب‌سازی" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">جدیدترین</SelectItem>
            <SelectItem value="oldest">قدیمی‌ترین</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.status}
          onValueChange={(value) =>
            onFilterChange("status", value === "all" ? undefined : value)
          }
        >
          <SelectTrigger className="border-amber-600">
            <SelectValue placeholder="وضعیت تیکت" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه</SelectItem>
            <SelectItem value="open">در حال بررسی</SelectItem>
            <SelectItem value="answered">پاسخ داده شده</SelectItem>
            <SelectItem value="closed">بسته شده</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button
        size="sm"
        onClick={() => newTicket()}
        className="flex items-center gap-2 !py-3 !px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 dark:from-gray-500 dark:to-gray-500 dark:hover:from-gray-600 dark:hover:to-gray-600 text-white shadow-lg hover:shadow-xl transition-all"
      >
        <Plus size={14} />
        تیکت جدید
      </Button>
    </div>
  );
}
