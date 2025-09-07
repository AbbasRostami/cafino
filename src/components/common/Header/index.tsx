"use client";

import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import { useUserProfile } from "@/services";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  // Auth and user data
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { data: userProfile } = useUserProfile();
  const user = userProfile;
  const pathname = usePathname();

  // State management
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [openMobileLoginDialog, setOpenMobileLoginDialog] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  // Shared props for both desktop and mobile components
  const sharedProps = {
    isAuthenticated,
    user,
    pathname,
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-[#18181c] dark:via-[#23232a] dark:to-[#18181c]">
      <nav className="fixed top-6 inset-x-4 h-16 bg-white/80 dark:bg-[#23232a]/80 backdrop-blur-sm border border-white/20 dark:border-[#23232a]/60 max-w-screen-xl mx-auto rounded-full shadow-lg z-50">
        <div className="h-full flex items-center justify-between mx-auto px-4">
          <Logo />

          <DesktopNavbar
            {...sharedProps}
            openLoginDialog={openLoginDialog}
            setOpenLoginDialog={setOpenLoginDialog}
          />
          <MobileNavbar
            {...sharedProps}
            openMobileMenu={openMobileMenu}
            setOpenMobileMenu={setOpenMobileMenu}
            openMobileLoginDialog={openMobileLoginDialog}
            setOpenMobileLoginDialog={setOpenMobileLoginDialog}
          />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
