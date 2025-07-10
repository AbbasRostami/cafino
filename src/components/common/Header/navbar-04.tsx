"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Menu, Home, FileText, Users, Phone, LogIn } from "lucide-react";
import { Logo } from "./logo";
import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="min-h-screen bg-muted">
      <nav className="fixed top-6 inset-x-4 h-16 bg-background border dark:border-slate-700/70 max-w-screen-xl mx-auto rounded-full">
        <div className="h-full flex items-center justify-between mx-auto px-4">
          <Logo />

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="#"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Home className="w-4 h-4" />
              خانه
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <FileText className="w-4 h-4" />
              بلاگ
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Users className="w-4 h-4" />
              درباره ما
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              تماس با ما
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {/* Desktop Login Button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="hidden sm:inline-flex rounded-full gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  ورود
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <LoginForm />
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
                    <div className="flex justify-center py-6 border-b">
                      <Logo />
                    </div>

                    {/* Navigation items */}
                    <div className="flex-1 py-6 px-4 space-y-4">
                      <Link
                        href="#"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                      >
                        <Home className="w-5 h-5" />
                        <span>خانه</span>
                      </Link>
                      <Link
                        href="#"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                      >
                        <FileText className="w-5 h-5" />
                        <span>بلاگ</span>
                      </Link>
                      <Link
                        href="#"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                      >
                        <Users className="w-5 h-5" />
                        <span>درباره ما</span>
                      </Link>
                      <Link
                        href="#"
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                      >
                        <Phone className="w-5 h-5" />
                        <span>تماس با ما</span>
                      </Link>
                    </div>

                    {/* Login button at bottom */}
                    <div className="border-t pt-6 px-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full gap-2">
                            <LogIn className="w-4 h-4" />
                            ورود به سیستم
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <LoginForm />
                        </DialogContent>
                      </Dialog>
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
