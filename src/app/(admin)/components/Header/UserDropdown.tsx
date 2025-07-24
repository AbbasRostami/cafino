"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { FaBell, FaPlusCircle, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { confirm } from "@/components/common/ConfirmModal";
// import { useProfile } from "@/app/(admin)/services/Profile/getProfile";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export default function UserDropdown() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  if (true)
    return (
      <div className="flex items-center gap-3 w-fit px-2 py-1">
        <div>
          <Skeleton className="animate-pulse bg-gray-200 dark:bg-gray-700 w-10 h-10 rounded-full" />
        </div>

        <div className="flex flex-col gap-1">
          <Skeleton className="animate-pulse bg-gray-200 dark:bg-gray-700 h-4 w-24 rounded-md" />
          <Skeleton className="animate-pulse bg-gray-200 dark:bg-gray-700 h-3 w-16 rounded-md" />
        </div>
      </div>
    );

  if (true) return <div>Error: </div>;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" aria-label="User Actions">
          <DropdownMenuItem
            textValue="پروفایل"
            key="profile"
            className="h-14 gap-2"
          >
            <Avatar>
              <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuItem>

          <DropdownMenuItem key="settings" textValue="شارژ کردن کیف پول">
            <div className="flex items-center gap-2">
              <FaPlusCircle />
              شارژ کردن کیف پول
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsOpen(true)}
            key="team_settings"
            textValue="تنظیمات نوتیفیکیشن ها"
          >
            <div className="flex items-center gap-2">
              <FaBell />
              تنظیمات نوتیفیکیشن ها
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            key="system"
            onClick={() => router.push("/buyer/profile")}
            textValue="ویرایش اطلاعات کاربری"
          >
            <div className="flex items-center gap-2">
              <FaUser />
              ویرایش اطلاعات کاربری
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            textValue="خروج از حساب کاربری"
            key="logout"
            onClick={async () => {
              const isConfirmed = await confirm({
                title: "آیا از خروج از حساب کاربری مطمئن هستید؟",
                description: "آیا مطمئن هستید؟",
                confirmText: "خروج",
                cancelText: "انصراف",
              });

              if (isConfirmed) {
                // signOut({ callbackUrl: "/" });
              }
            }}
          >
            <div className="flex items-center gap-2">
              <FaSignOutAlt />
              خروج از حساب کاربری
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
