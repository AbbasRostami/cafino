import Link from "next/link";
import { Home, FileText, Phone, Info } from "lucide-react";
import { MotionSpan } from "@/utils/MotionWrapper";
import { ThemeSwitcher } from "../ThemeToggle";
import dynamic from "next/dynamic";
import { LoginForm } from "@/components/main/auth";
import UserDropdown from "./UserDropdown";
import { DesktopNavbarProps } from "@/types/main";

const CartSidebar = dynamic(
  () => import("@/components/main/CartSidebar").then((mod) => mod.default),
  { ssr: false }
);

const DesktopNavbar: React.FC<DesktopNavbarProps> = ({
  isAuthenticated,
  user,
  pathname,
  openLoginDialog,
  setOpenLoginDialog,
}) => {
  const links = [
    { href: "/", label: "صفحه اصلی", icon: Home },
    { href: "/menu", label: "منو", icon: FileText },
    { href: "/about-us", label: "درباره ما", icon: Info },
    { href: "/contact-us", label: "ارتباط با ما", icon: Phone },
  ];

  return (
    <>
      <div data-testid="main-nav" className="hidden lg:flex items-center gap-4">
        {links?.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={`
                relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300
                ${
                  isActive
                    ? "text-amber-600 dark:text-amber-400 font-bold"
                    : "text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400"
                }
              `}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>

              {isActive && (
                <MotionSpan
                  layoutId="underline"
                  className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-md"
                />
              )}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:block">
          <ThemeSwitcher />
        </div>
        <CartSidebar />
        <UserDropdown
          user={user}
          isAuthenticated={isAuthenticated}
          onLoginClick={() => setOpenLoginDialog(true)}
        />
        <LoginForm
          open={openLoginDialog}
          onOpenChange={setOpenLoginDialog}
          onSuccess={() => setOpenLoginDialog(false)}
        />
      </div>
    </>
  );
};

export default DesktopNavbar;
