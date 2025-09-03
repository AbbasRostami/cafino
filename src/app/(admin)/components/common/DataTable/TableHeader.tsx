"use client";

import { Settings2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useReactTable } from "@tanstack/react-table";

export interface TableHeaderProps {
  table: ReturnType<typeof useReactTable<any>>;
  title?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  showColumnVisibility?: boolean;
}

export function DataTableHeader({
  table,
  title,
  icon,
  actions,
  showColumnVisibility = true,
}: TableHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-5 border-b border-dashed border-amber-500">
      <div className="flex items-center gap-3 w-full md:w-1/3">
        {icon}
        {title && (
          <span className="text-amber-700 dark:text-amber-300 text-xl font-bold">
            {title}
          </span>
        )}
      </div>
      <div className="flex flex-col md:flex-row-reverse justify-start items-center w-full md:w-2/3 gap-2">
        {showColumnVisibility && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-gray-800 dark:to-gray-700 border border-amber-300 dark:border-amber-600 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-gray-700 shadow-sm hover:shadow-md transition-all duration-300 group flex items-center gap-2"
              >
                <Settings2 className="w-4 h-4 text-amber-600 dark:text-amber-400 group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors" />
                <span>ستون‌های نمایشی</span>
                <ChevronDown className="w-4 h-4 text-amber-600 dark:text-amber-400 group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="bg-white/90 scrollbar-hide dark:bg-gray-800/95 backdrop-blur-sm border border-amber-200 dark:border-amber-800 rounded-xl shadow-xl overflow-hidden mt-2 w-48"
            >
              <div className="max-h-60 overflow-y-auto scrollbar-hide">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      dir="rtl"
                      key={column.id}
                      className="text-sm px-4 py-2 hover:bg-amber-50 dark:hover:bg-gray-700/50 transition-colors duration-200 flex items-center gap-3"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      <span className="text-gray-700 dark:text-gray-300">
                        {typeof column.columnDef.header === "string"
                          ? column.columnDef.header
                          : column.id}
                      </span>
                    </DropdownMenuCheckboxItem>
                  ))}
              </div>

              <div className="p-3 border-t border-amber-100 dark:border-amber-900 flex justify-between">
                <DropdownMenuItem
                  className="text-xs text-blue-800 dark:text-amber-400 hover:bg-transparent cursor-pointer"
                  onClick={() =>
                    table
                      .getAllColumns()
                      .forEach((column) => column.toggleVisibility(true))
                  }
                >
                  انتخاب همه
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-xs text-rose-600 dark:text-rose-400 hover:bg-transparent cursor-pointer"
                  onClick={() =>
                    table
                      .getAllColumns()
                      .forEach((column) => column.toggleVisibility(false))
                  }
                >
                  لغو همه
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {actions}
      </div>
    </div>
  );
}
