export interface MobileNavbarProps {
  isAuthenticated: boolean;
  user: any;
  pathname: string;
  openMobileMenu: boolean;
  setOpenMobileMenu: (open: boolean) => void;
  openMobileLoginDialog: boolean;
  setOpenMobileLoginDialog: (open: boolean) => void;
}

export interface UserDropdownProps {
  user: any;
  isAuthenticated: boolean;
  onLoginClick: () => void;
}

export interface DesktopNavbarProps {
  isAuthenticated: boolean;
  user: any;
  pathname: string;
  openLoginDialog: boolean;
  setOpenLoginDialog: (open: boolean) => void;
}
