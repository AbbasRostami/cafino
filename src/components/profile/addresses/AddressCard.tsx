import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { AddressCardProps } from "@/types/Profile";

export const AddressCard = ({
  address,
  onEdit,
  onDelete,
  isDeleting,
}: AddressCardProps) => {
  return (
    <div className="rounded-2xl p-5 border border-muted hover:border-amber-200 dark:hover:border-amber-500 hover:bg-muted/40 transition-all duration-200 shadow-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl">
      <div className="flex flex-col lg:flex-row gap-4 md:gap-8 justify-between items-start md:items-center">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-foreground">
            {address?.province} - {address?.city}
          </h3>
          <p className="text-sm text-muted-foreground">{address?.address}</p>
        </div>
        <div className="flex gap-2 flex-wrap justify-end md:justify-start">
          <Button
            size="sm"
            onClick={() => onEdit()}
            className="rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-medium gap-1"
          >
            <Pencil size={16} />
            ویرایش
          </Button>
          <Button
            size="sm"
            variant="destructive"
            disabled={isDeleting}
            onClick={() => onDelete()}
            className="rounded-lg gap-1"
          >
            <Trash2 size={16} />
            حذف
          </Button>
        </div>
      </div>
    </div>
  );
};
