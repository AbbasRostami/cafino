"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Menu,
  Home,
  FileText,
  Users,
  Phone,
  LogIn,
  User,
  LogOut,
} from "lucide-react";

import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import type { User as UserType } from "@/store/authStore";
import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import CafeinLogoLight from "./../../../assets/Logo/9.png";
import CafeinLogoDark from "./../../../assets/Logo/10.png";
import Image from "next/image";
import { ThemeSwitcher } from "../ThemeToggle/ThemeToggle";
// import { useCartStore } from "@/store/cartStore";
import CartSidebar from "./CartSidebar";
import { useUserProfile } from "@/services/update";
const Navbar = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [openMobileLoginDialog, setOpenMobileLoginDialog] = useState(false);

  const { data: userProfile } = useUserProfile();
  const user = userProfile;
  console.log("userProfile", user);
  return (
    <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-[#18181c] dark:via-[#23232a] dark:to-[#18181c]">
      <nav className="fixed top-6 inset-x-4 h-16 bg-white/80 dark:bg-[#23232a]/80 backdrop-blur-sm border border-white/20 dark:border-[#23232a]/60 max-w-screen-xl mx-auto rounded-full shadow-lg z-50">
        <div className="h-full flex items-center justify-between mx-auto px-4">
          <div className="relative w-48 h-48 ">
            <Image
              priority
              src={CafeinLogoLight}
              alt="Cafein Logo Light"
              className="block dark:hidden w-full h-full object-contain mt-3 "
              fill
            />

            <Image
              priority
              src={CafeinLogoDark}
              alt="Cafein Logo Dark"
              className="hidden dark:block w-full h-full object-contain "
              fill
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Home className="w-4 h-4" />
              صفحه اصلی
            </Link>
            <Link
              href="/menu"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <FileText className="w-4 h-4" />
              منو
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Users className="w-4 h-4" />
              درباره ما
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {/* Desktop Theme Switcher */}
            <div className="hidden md:block">
              <ThemeSwitcher />
            </div>
            {/* Shopping Cart Icon with Badge */}
            <CartSidebar />
            {/* Desktop Login Button */}
            <Dialog open={openLoginDialog} onOpenChange={setOpenLoginDialog}>
              <DialogTrigger asChild>
                {isAuthenticated && user ? (
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
                ) : (
                  <Button
                    variant="outline"
                    className="hidden sm:inline-flex rounded-full gap-2 cursor-pointer"
                    onClick={() => setOpenLoginDialog(true)}
                  >
                    <LogIn className="w-4 h-4 cursor-pointer" />
                    ورود به سیستم
                  </Button>
                )}
              </DialogTrigger>
              <DialogContent className="sm:max-w-md p-0">
                <LoginForm onSuccess={() => setOpenLoginDialog(false)} />
              </DialogContent>
            </Dialog>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                  >
                    <Menu />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col h-full">
                    {/* Logo centered at top */}
                    <div className="flex justify-center border-b">
                      <div className="relative w-10 sm:w-48 h-48">
                        <Image
                          priority
                          src={CafeinLogoLight}
                          alt="Cafein Logo Light"
                          className="block dark:hidden w-full h-full object-contain"
                          fill
                        />

                        <Image
                          priority
                          src={CafeinLogoDark}
                          alt="Cafein Logo Dark"
                          className="hidden dark:block w-full h-full object-contain"
                          fill
                        />
                      </div>
                    </div>

                    {/* Navigation items */}
                    <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
                      <Link
                        href="/"
                        className="flex items-center gap-3 p-4 rounded-xl hover:bg-primary/5 hover:text-primary transition-all duration-200 border border-transparent hover:border-primary/20"
                      >
                        <Home className="w-5 h-5" />
                        <span>صفحه اصلی</span>
                      </Link>
                      <Link
                        href="/menu"
                        className="flex items-center gap-3 p-4 rounded-xl hover:bg-primary/5 hover:text-primary transition-all duration-200 border border-transparent hover:border-primary/20"
                      >
                        <FileText className="w-5 h-5" />
                        <span>منو</span>
                      </Link>
                      <Link
                        href="#"
                        className="flex items-center gap-3 p-4 rounded-xl hover:bg-primary/5 hover:text-primary transition-all duration-200 border border-transparent hover:border-primary/20"
                      >
                        <Users className="w-5 h-5" />
                        <span>درباره ما</span>
                      </Link>
                      <Link
                        href="#"
                        className="flex items-center gap-3 p-4 rounded-xl hover:bg-primary/5 hover:text-primary transition-all duration-200 border border-transparent hover:border-primary/20"
                      >
                        <Phone className="w-5 h-5" />
                        <span>تماس با ما</span>
                      </Link>
                      {isAuthenticated && user && (
                        <>
                          <Link
                            href="/profile"
                            className="flex items-center gap-3 p-4 rounded-xl hover:bg-primary/5 hover:text-primary transition-all duration-200 border border-transparent hover:border-primary/20"
                          >
                            <User className="w-5 h-5" />
                            <span>ورود به پنل</span>
                          </Link>
                          <button
                            onClick={async () => {
                              await logout();
                            }}
                            className="flex items-center gap-3 p-4 rounded-xl hover:bg-destructive/5 hover:text-destructive transition-all duration-200 border border-transparent hover:border-destructive/20 text-destructive w-full text-right"
                          >
                            <LogOut className="w-5 h-5" />
                            <span>خروج</span>
                          </button>
                        </>
                      )}
                    </div>

                    {/* Theme Switcher and Login/Profile button at bottom */}
                    <div className="border-t pt-6 pb-6 px-4 space-y-4">
                      {/* Mobile Theme Switcher */}
                      <div className="flex justify-center">
                        <ThemeSwitcher />
                      </div>

                      {!isAuthenticated && (
                        <Dialog
                          open={openMobileLoginDialog}
                          onOpenChange={setOpenMobileLoginDialog}
                        >
                          <DialogTrigger asChild>
                            <Button
                              className="w-full gap-2"
                              onClick={() => setOpenMobileLoginDialog(true)}
                            >
                              <LogIn className="w-4 h-4 " />
                              ورود به سیستم
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md p-0">
                            <LoginForm
                              onSuccess={() => setOpenMobileLoginDialog(false)}
                            />
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
