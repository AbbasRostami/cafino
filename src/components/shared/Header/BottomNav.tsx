import { CartSidebar } from "@/components/main/CartSidebar";
import { ThemeSwitcher } from "../ThemeToggle";
import { LoginForm } from "@/components/main/auth";
import UserDropdown from "./UserLink";
import { User } from "@/types";

export interface BottomNavProps {
  user?: User;
  isAuthenticated: boolean;
  openMobileLoginDialog: boolean;
  setOpenMobileLoginDialog: (open: boolean) => void;
}

export default function BottomNav({
  user,
  isAuthenticated,
  openMobileLoginDialog,
  setOpenMobileLoginDialog,
}: BottomNavProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="hidden md:block">
        <ThemeSwitcher />
      </div>
      <CartSidebar />
      <UserDropdown
        user={user}
        isAuthenticated={isAuthenticated}
        onLoginClick={() => setOpenMobileLoginDialog(true)}
      />
      <LoginForm
        open={openMobileLoginDialog}
        onOpenChange={setOpenMobileLoginDialog}
        onSuccess={() => setOpenMobileLoginDialog(false)}
      />
    </div>
  );
}
