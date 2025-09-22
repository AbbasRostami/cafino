"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { HomeIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/utils/utils";

const routeMap: { [key: string]: string } = {
  overview: "داشبورد",
  users: "مدیریت کاربران",
  categories: "دسته‌بندی‌ها",
  items: "مدیریت منو",
  orders: "سفارشات",
  discounts: "تخفیف‌ها",
  blacklist: "لیست سیاه",
  comments: "کامنت ها",
  messages: "مدیریت پیام کاربران",
  tickets: "تیکت ها مدیریت",
  "rate-limit": "مدیریت محدودیت ها",
};

export default function DashboardBreadcrumbs() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  const dashboardIndex = paths.indexOf("dashboard");
  if (dashboardIndex !== -1) {
    paths.splice(dashboardIndex, 1);
  }

  return (
    <div className="w-full mb-6">
      <div className="flex items-center gap-2 text-sm">
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-1 p-2 rounded-lg transition-all",
            "text-gray-600 hover:text-primary hover:bg-gray-100",
            "dark:text-gray-300 dark:hover:text-primary-300 dark:hover:bg-gray-800"
          )}
        >
          <HomeIcon size={16} />
        </Link>

        {paths.map((path, index) => {
          const href = `/${paths.slice(0, index + 1).join("/")}`;
          const label = routeMap[path] || path;
          const isLast = index === paths.length - 1;

          return (
            <div key={path} className="flex items-center">
              <ChevronRightIcon
                size={16}
                className={cn("mx-1 text-gray-400", "dark:text-gray-500")}
              />
              {isLast ? (
                <span
                  className={cn(
                    "font-medium px-2 py-1 rounded-md",
                    "text-primary bg-primary/10",
                    "dark:text-primary-300 dark:bg-primary/20"
                  )}
                >
                  {label}
                </span>
              ) : (
                <Link
                  href={href}
                  className={cn(
                    "px-2 py-1 rounded-md transition-all",
                    "text-gray-700 hover:text-primary hover:bg-gray-100",
                    "dark:text-gray-300 dark:hover:text-primary-300 dark:hover:bg-gray-800"
                  )}
                >
                  {label}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
