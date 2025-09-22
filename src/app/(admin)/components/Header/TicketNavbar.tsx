"use client";

import { useState } from "react";
import { Bell, Ticket, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { useTicketsOverview } from "@/services";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/utils";

export default function Messages() {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useTicketsOverview();

  const unrepliedCount = data?.open || 0;
  const totalMessages = data?.total || 0;
  const router = useRouter();
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        className="border border-gray-300 dark:border-gray-600"
        asChild
      >
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "relative h-11 w-11 rounded-full transition-all duration-200 hover:bg-amber-100 dark:hover:bg-amber-900/30",
            isOpen && "bg-amber-100 dark:bg-amber-900/30"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Bell className="!h-6 !w-6 text-gray-700 dark:text-gray-300 transition-colors" />
          {unrepliedCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs font-bold flex items-center justify-center animate-pulse"
            >
              {unrepliedCount > 9 ? "9+" : unrepliedCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-80 p-0 border-none shadow-xl"
        align="end"
        side="bottom"
      >
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-950/50 dark:to-orange-950/50 rounded-lg">
          <div className="flex items-center justify-between p-4 border-b border-amber-200 dark:border-amber-800">
            <div className="flex items-center gap-3">
              <div className="p-2  rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 shadow-md">
                <Ticket className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 dark:text-gray-200">
                  تیکت ها
                </h3>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-amber-200 dark:hover:bg-amber-800"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/70 dark:bg-gray-800/70 rounded-lg p-3 border border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    کل تیکت ها
                  </span>
                </div>
                <p className="text-xl font-bold text-gray-800 dark:text-gray-200 mt-1">
                  {totalMessages}
                </p>
              </div>

              <div className="bg-white/70 dark:bg-gray-800/70 rounded-lg p-3 border border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    پاسخ داده نشده
                  </span>
                </div>
                <p className="text-xl font-bold text-red-600 dark:text-red-400 mt-1">
                  {unrepliedCount}
                </p>
              </div>
            </div>

            {unrepliedCount > 0 && (
              <Button
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold transition-all duration-200 shadow-lg hover:shadow-xl"
                onClick={() => {
                  router.push("/dashboard/tickets");
                  setIsOpen(false);
                }}
              >
                <Ticket className="h-4 w-4 ml-2" />
                مشاهده تیکت های جدید
              </Button>
            )}

            {unrepliedCount === 0 && (
              <div className="text-center py-6">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Ticket className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  همه تیکت ها پاسخ داده شده‌اند
                </p>
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
