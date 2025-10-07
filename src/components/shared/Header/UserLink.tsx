import { Button } from "@/components/ui/button";
import { useUserProfile } from "@/services";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { UserDropdownProps } from "@/types/main";

const UserDropdown: React.FC<UserDropdownProps> = ({
  isAuthenticated,
  onLoginClick,
}) => {
  const { data: user } = useUserProfile();

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
        px-3 py-1
        transition-all duration-300
      "
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

        <span className="max-w-[100px] items-center text-center truncate text-sm font-semibold text-gray-800 dark:text-gray-200">
          {user?.first_name || user?.username}
        </span>
        <span className="absolute bottom-0 left-1/2 h-[2px] w-0 bg-amber-500 transition-all duration-300 group-hover:w-full transform -translate-x-1/2" />
      </Link>
    );
  }

  return (
    <Button
      variant="outline"
      data-testid="user-dropdown-login-button"
      className="
      relative overflow-hidden 
      hidden sm:inline-flex 
      bg-gray-200 dark:bg-gray-800 
      text-gray-700 dark:text-gray-300 
      text-sm font-semibold rounded-full gap-2 
      cursor-pointer px-3 !py-3 
      group
    "
      onClick={onLoginClick}
    >
      <LogIn className="w-4 h-4 cursor-pointer" />
      ورود / ثبت نام
      <span
        className="
        absolute bottom-0 left-1/2 h-[2px] w-0 bg-amber-500 transition-all duration-300 group-hover:w-full transform -translate-x-1/2
      "
      />
    </Button>
  );
};
export default UserDropdown;
