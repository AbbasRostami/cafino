import { ProfileInfoProps } from "@/types/Profile";
import { formatJalaliDate } from "@/utils/formatters";

export const ProfileInfo = ({ user }: ProfileInfoProps) => {
  const profileItems = [
    { label: "نام", value: user?.first_name, icon: "🧑" },
    { label: "نام خانوادگی", value: user?.last_name, icon: "🧑‍🦱" },
    { label: "نام کاربری", value: user?.username, icon: "👤" },
    { label: "شماره تلفن", value: user?.phone, icon: "📞" },
    {
      label: "تاریخ تولد",
      value: user?.birthday
        ? formatJalaliDate(user.birthday, "jYYYY/jMM/jDD")
        : "---",
      icon: "🎂",
    },
    {
      label: "وضعیت",
      value: user?.status === "normal" ? "فعال" : "غیر فعال",
      icon: "⚙️",
    },
    {
      label: "تاریخ ثبت نام",
      value: user?.created_at
        ? formatJalaliDate(user.created_at, "jYYYY/jMM/jDD - HH:mm")
        : "---",
      icon: "🗓️",
    },
    {
      label: "تاریخ بروزرسانی",
      value: user?.updated_at
        ? formatJalaliDate(user.updated_at, "jYYYY/jMM/jDD - HH:mm")
        : "---",
      icon: "🕒",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-5">
      {profileItems?.map((item, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-xl border border-gray-100 bg-gray-50 p-5 transition-all hover:-translate-y-1 hover:border-indigo-100 hover:shadow-lg dark:border-gray-700/60 dark:bg-gray-800/50 dark:hover:border-indigo-900/50"
        >
          <div className="flex items-start gap-4">
            <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50/50 text-indigo-600 shadow-inner dark:bg-indigo-900/20 dark:text-indigo-300">
              <span className="text-xl">{item?.icon}</span>
            </div>

            <div className="flex-1">
              <h3 className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {item?.label}
              </h3>
              <div
                className={`relative pr-2 text-sm font-medium ${
                  item?.value
                    ? "text-gray-800 dark:text-gray-200"
                    : "text-gray-400 dark:text-gray-500"
                }`}
              >
                {item?.value || "---"}
                <div className="absolute -left-2 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-indigo-500/30 dark:bg-indigo-400/30" />
              </div>
            </div>
          </div>

          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-100/20 opacity-0 transition-all duration-300 group-hover:opacity-100 dark:bg-indigo-900/20" />
        </div>
      ))}
    </div>
  );
};
