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
import { useUserProfile } from "@/services";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home, LogOut, User, ShoppingBag } from "lucide-react";
import { useLogout } from "@/services";

export default function UserDropdown() {
  const { data: user } = useUserProfile();
  const { logout, isPending } = useLogout();

  const handleLogout = async () => {
    await logout("/admin-login");
  };

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
            <span className="max-w-[100px] truncate font-semibold">
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
            <Link href="/dashboard/orders" className="font-bold">
              <ShoppingBag size={16} />
              مدیریت سفارشات
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/" className="font-bold">
              <Home size={16} />
              صفحه اصلی
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/profile/overview" className="font-bold">
              <User size={16} />
              پروفایل
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer font-bold"
            onClick={handleLogout}
            disabled={isPending}
            variant="destructive"
          >
            <LogOut size={16} />
            {isPending ? "در حال خروج..." : "خروج از پنل"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
