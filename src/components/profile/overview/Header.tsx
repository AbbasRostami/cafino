import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, CalendarHeart, CalendarArrowDown } from "lucide-react";
import { User } from "@/types/Profile";
import { formatJalaliDate } from "@/utils/formatters";

export const Header = ({ user }: { user?: User | null }) => {
  return (
    <Card className="border-none relative overflow-hidden bg-gradient-to-r from-rose-600 to-amber-500 dark:from-rose-800 dark:to-amber-700 rounded-4xl shadow-2xl p-6 sm:p-8 text-white">
      <div className="relative z-10 flex flex-col xl:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start text-center md:text-right">
          <h1 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold tracking-tight drop-shadow-md">
            داشبورد کاربری کافینو
          </h1>
          <p className="mt-2 text-rose-50 dark:text-amber-200 text-sm sm:text-base lg:text-lg">
            سلام {user?.first_name || "کاربر"} عزیز، به دنیای طعم و کیفیت خوش
            آمدید
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
          <div className="relative flex-shrink-0">
            <Avatar className="w-20 h-20 border-4 border-white/50 dark:border-gray-700/50 shadow-lg">
              <AvatarImage
                src={user?.imageUrl || user?.first_name?.charAt(0)}
                alt="Profile"
              />
              <AvatarFallback className="bg-white text-amber-600 text-3xl font-semibold">
                {user?.first_name ? user.first_name[0] : "U"}
              </AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white dark:border-gray-800 shadow-sm"></div>
          </div>
          <div className="text-center sm:text-right space-y-1">
            <p
              data-testid="user-name"
              className="font-semibold text-lg sm:text-xl"
            >
              {user?.first_name} {user?.last_name}
            </p>
            <p className="text-sm sm:text-base text-white dark:text-amber-200">
              {user?.role === "admin"
                ? "ادمین"
                : user?.role === "manager"
                ? "مدیر"
                : "کاربر عادی"}
            </p>
            <div className="flex flex-col items-center sm:items-start gap-1 mt-2">
              <div className="flex items-center gap-2 text-white dark:text-amber-200 text-sm">
                <Phone size={16} />
                <span
                  className="cursor-pointer"
                  onClick={() =>
                    navigator.clipboard.writeText(user?.phone || "")
                  }
                  data-testid="user-phone"
                >
                  {user?.phone || "شماره تلفن مشخص نیست"}
                </span>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-2 text-white dark:text-amber-200 text-sm">
                <p className="flex items-center gap-1">
                  <CalendarHeart size={16} />
                  <span>تاریخ تولد:</span>
                  <span>
                    {user?.birthday
                      ? formatJalaliDate(user?.birthday, "jYYYY/jMM/jDD")
                      : "مشخص نیست"}
                  </span>
                </p>
                <p className="flex items-center gap-1 md:hidden">
                  <CalendarArrowDown size={16} />
                  <span>تاریخ عضویت:</span>
                  <span>
                    {user?.created_at
                      ? formatJalaliDate(user?.created_at, "jYYYY/jMM/jDD")
                      : "مشخص نیست"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
