import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LogIn, User, LogOut } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { UserDropdownProps } from "@/types/main";



const UserDropdown: React.FC<UserDropdownProps> = ({
  user,
  isAuthenticated,
  onLoginClick,
}) => {
  const logout = useAuthStore((state) => state.logout);

  if (isAuthenticated && user) {
    return (
      <DropdownMenu dir="rtl">
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="hidden bg-gray-200 sm:inline-flex rounded-full gap-2 cursor-pointer px-4 py-5"
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
            <Link href="/profile/overview" className="font-bold">
              <User className="w-4 h-4" />
              پنل کاربری
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/checkout-cart" className="font-bold">
              <User className="w-4 h-4" />
              لیست سفارشات
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
    );
  }

  return (
    <Button
      variant="outline"
      className="hidden sm:inline-flex rounded-full gap-2 cursor-pointer"
      onClick={onLoginClick}
    >
      <LogIn className="w-4 h-4 cursor-pointer" />
      ورود / ثبت نام
    </Button>
  );
};

export default UserDropdown;
