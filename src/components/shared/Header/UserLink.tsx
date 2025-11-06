import { Button } from "@/components/ui/button";
import { useUserProfile } from "@/services";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { UserDropdownProps } from "@/types/main";
import { Skeleton } from "@/components/ui/skeleton";

const UserDropdown: React.FC<UserDropdownProps> = ({
  isAuthenticated,
  onLoginClick,
}) => {
  const { data: user, isLoading } = useUserProfile();

  if (isLoading) {
    return (
      <div
        className="
          hidden sm:inline-flex 
          items-center gap-2 
         bg-gray-200 dark:bg-gray-800 
          rounded-full px-3 py-1 
          w-[130px] h-[38px]
        "
      >
        <Skeleton className="h-6 w-8 rounded-full bg-gray-300 dark:bg-gray-700" />
        <Skeleton className="h-4 w-[80px] rounded-md bg-gray-300 dark:bg-gray-700" />
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <Link
        href="/profile/overview"
        data-testid="user-dropdown"
        className="
          relative group overflow-hidden
          hidden sm:inline-flex
          bg-gray-200 dark:bg-gray-800
          rounded-full gap-1 cursor-pointer items-center
          px-3 py-1 transition-all duration-300
        "
      >
        <Avatar>
          <AvatarImage
            src={user.imageUrl || ""}
            alt={user.username || "avatar"}
          />
          <AvatarFallback>
            {user.first_name?.[0] || user.username?.[0]}
          </AvatarFallback>
        </Avatar>

        <span className="max-w-[100px] truncate text-sm font-semibold text-gray-800 dark:text-gray-200">
          {user.first_name || user.username}
        </span>

        <span
          className="
            absolute bottom-0 left-1/2 h-[2px] w-0 
            bg-amber-500 transition-all duration-300 
            group-hover:w-full transform -translate-x-1/2
          "
        />
      </Link>
    );
  }

  return (
    <Button
      variant="outline"
      data-testid="user-dropdown-login-button"
      onClick={onLoginClick}
      className="
        relative overflow-hidden 
        hidden sm:inline-flex 
        bg-gray-200 dark:bg-gray-800 
        text-gray-700 dark:text-gray-300 
        text-sm font-semibold rounded-full gap-2 
        cursor-pointer px-3 !py-3 group
      "
    >
      <LogIn className="w-4 h-4 cursor-pointer" />
      ورود / ثبت‌نام
      <span
        className="
          absolute bottom-0 left-1/2 h-[2px] w-0 
          bg-amber-500 transition-all duration-300 
          group-hover:w-full transform -translate-x-1/2
        "
      />
    </Button>
  );
};

export default UserDropdown;
