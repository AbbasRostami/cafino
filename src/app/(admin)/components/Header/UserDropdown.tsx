"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserProfile } from "@/services/update";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Edit, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
export default function UserDropdown() {
  const { data: user, isLoading } = useUserProfile();
  const logout = useAuthStore((state) => state.logout);
  return (
    <>
      <DropdownMenu dir="rtl">
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className=" bg-gray-200 rounded-full gap-2 cursor-pointer px-4 py-5"
          >
            <Avatar>
              <AvatarImage
                src={user?.imageUrl || ""}
                alt={user?.username || "avatar"}
              />
              <AvatarFallback>
                {user?.first_name?.[0] || user?.username?.[0]}
              </AvatarFallback>
            </Avatar>
            <span className="max-w-[100px] truncate">
              {user?.first_name || user?.username}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end">
          <DropdownMenuLabel className="font-bold">
            {user?.first_name} {user?.last_name}
            <div className="text-xs text-muted-foreground font-bold">
              {user?.phone}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/dashboard/profile" className="font-bold">
              <Edit className="w-4 h-4" />
              ویرایش اطلاعات
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer font-bold"
            onClick={async () => {
              await logout();
            }}
            variant="destructive"
          >
            <LogOut className="w-4 h-4" />
            خروج از حساب کاربری
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
