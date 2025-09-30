"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Menu,
  Home,
  FileText,
  Users,
  Phone,
  LogIn,
  User,
  LogOut,
  X,
} from "lucide-react";
import Link from "next/link";
import { ThemeSwitcher } from "../ThemeToggle";
import { LoginForm } from "@/components/main/auth";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Logo from "./Logo";
import { MotionDiv } from "@/utils/MotionWrapper";
import { MobileNavbarProps } from "@/types/main";
import { useLogout } from "@/services/auth";

const MobileNavbar: React.FC<MobileNavbarProps> = ({
  isAuthenticated,
  user,
  pathname,
  openMobileMenu,
  setOpenMobileMenu,
  openMobileLoginDialog,
  setOpenMobileLoginDialog,
}) => {
  const { logout, isPending } = useLogout();

  return (
    <div className="lg:hidden">
      <Sheet open={openMobileMenu} onOpenChange={setOpenMobileMenu}>
        <SheetTrigger asChild>
          <Button
            data-testid="mobile-menu-button"
            variant="outline"
            size="icon"
            className="rounded-full transition-all duration-300 hover:bg-amber-100 hover:text-amber-600 dark:hover:bg-amber-900/30 dark:hover:text-amber-400"
          >
            {openMobileMenu ? (
              <X className="h-6 w-6 transition-transform duration-300 rotate-90" />
            ) : (
              <Menu className="h-6 w-6 transition-transform duration-300" />
            )}
          </Button>
        </SheetTrigger>

        <SheetContent
          data-testid="mobile-menu"
          side="right"
          className="w-[270px] scrollbar-hide bg-gradient-to-b from-amber-50 to-white dark:from-zinc-950 dark:to-zinc-900 border-l border-amber-100 dark:border-zinc-800 shadow-2xl"
        >
          <VisuallyHidden>
            <SheetTitle>Mobile Sidebar</SheetTitle>
            <SheetDescription>Mobile Sidebar</SheetDescription>
          </VisuallyHidden>

          <div className="flex flex-col h-full">
            <div className="flex  justify-evenly items-center  border-b border-amber-100/60 dark:border-zinc-800/60 py-4 mb-4">
              <Logo />
              <div className="flex md:hidden justify-center">
                <ThemeSwitcher />
              </div>
            </div>

            <div data-testid="mobile-nav" className="flex-1 py-4 px-3 space-y-2 overflow-y-auto scrollbar-hide">
              {[
                { href: "/", label: "صفحه اصلی", icon: Home },
                { href: "/menu", label: "منو", icon: FileText },
                { href: "/about-us", label: "درباره ما", icon: Users },
                {
                  href: "/contact-us",
                  label: "تماس با ما",
                  icon: Phone,
                },
              ]?.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`relative flex items-center gap-3 p-4 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-amber-50/80 to-orange-50/80 dark:from-amber-900/30 dark:to-orange-900/20 text-amber-700 dark:text-amber-300 shadow-inner"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50/80 dark:hover:bg-gray-800/50"
                    }
                        `}
                  >
                    {isActive && (
                      <MotionDiv
                        className="absolute right-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-amber-500 to-orange-500 rounded-l-lg"
                        initial={{ height: 0 }}
                        animate={{ height: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                  </Link>
                );
              })}

              {isAuthenticated && user && (
                <>
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 p-4 rounded-xl border border-amber-600 text-amber-700 dark:text-amber-300 bg-amber-100/50 dark:bg-amber-900/20 hover:bg-amber-200/50 dark:hover:bg-amber-800/40 transition-all"
                  >
                    <User className="w-5 h-5" />
                    <span> ورود به پنل کاربری</span>
                  </Link>
                  <button
                    onClick={() => logout("/")}
                    disabled={isPending}
                    className="flex items-center gap-3 p-4 rounded-xl border border-transparent hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 dark:hover:border-red-800 text-red-600 dark:text-red-400 transition-all w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>{isPending ? "در حال خروج..." : "خروج"}</span>
                  </button>
                </>
              )}
            </div>

            <div className="border-t border-amber-100/60 dark:border-zinc-800/60 pt-6 pb-6 px-4 space-y-4">
              {!isAuthenticated && (
                <>
                  <Button
                    data-testid="mobile-login-button"
                    className="w-full gap-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl shadow-lg transition-all"
                    onClick={() => setOpenMobileLoginDialog(true)}
                  >
                    <LogIn className="w-4 h-4" />
                    ورود / ثبت نام
                  </Button>
                  <LoginForm
                    open={openMobileLoginDialog}
                    onOpenChange={setOpenMobileLoginDialog}
                    onSuccess={() => setOpenMobileLoginDialog(false)}
                  />
                </>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavbar;
