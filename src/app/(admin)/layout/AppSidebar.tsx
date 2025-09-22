import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "./../../../assets/Logo/7.png";
import { useSidebar } from "../context/SidebarContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BadgeDollarSign,
  ChartBarStacked,
  ChevronDown,
  CircleUserRound,
  ClipboardPlus,
  Hamburger,
  House,
  MessageCircleCode,
  OctagonMinus,
  Send,
  ShieldBan,
  TicketsPlane,
} from "lucide-react";
type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: <House />,
    name: "داشبورد",
    path: "/dashboard/overview",
  },
  {
    name: "مدیریت کاربران",
    icon: <CircleUserRound />,
    path: "/dashboard/users",
  },
  {
    name: "مدیریت دسته‌بندی",
    icon: <ChartBarStacked />,
    path: "/dashboard/categories",
  },
  {
    name: "مدیریت آیتم‌ها",
    icon: <Hamburger />,
    path: "/dashboard/items",
  },
  {
    name: "مدیریت سفارشات",
    icon: <BadgeDollarSign />,
    path: "/dashboard/orders",
  },
  {
    name: "مدیریت تخفیف‌ها",
    icon: <ClipboardPlus />,
    path: "/dashboard/discounts",
  },
  {
    name: "مدیریت تیکت ها",
    icon: <TicketsPlane />,
    path: "/dashboard/tickets",
  },
  {
    name: "مدیریت کامنت ها",
    icon: <MessageCircleCode />,
    path: "/dashboard/comments",
  },
  {
    name: "مدیریت پیام کاربران",
    icon: <Send />,
    path: "/dashboard/messages",
  },
  {
    name: "لیست سیاه",
    icon: <OctagonMinus />,
    path: "/dashboard/blacklist",
  },
  {
    name: "مدیریت محدودیت ها",
    icon: <ShieldBan />,
    path: "/dashboard/rate-limit",
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => pathname === path, [pathname]);

  useEffect(() => {
    let submenuMatched = false;
    ["main"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : [];
      items?.forEach((nav: NavItem, index: number) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items: NavItem[], menuType: "main") => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => handleSubmenuToggle(index, menuType)}
                    className={`menu-item group flex items-center px-4 py-3 rounded-lg ${
                      openSubmenu?.type === menuType &&
                      openSubmenu?.index === index
                        ? "menu-item-active"
                        : "menu-item-inactive"
                    } cursor-pointer ${
                      !isExpanded ? "lg:justify-center" : "lg:justify-start"
                    }`}
                  >
                    <span
                      className={`menu-item-icon-size flex items-center justify-center text-2xl ${
                        openSubmenu?.type === menuType &&
                        openSubmenu?.index === index
                          ? "menu-item-icon-active"
                          : "menu-item-icon-inactive text-gray-500 dark:text-white"
                      }`}
                    >
                      {nav.icon}
                    </span>
                    {(isExpanded || isMobileOpen) && (
                      <span className="menu-item-text text-lg mr-3">
                        {nav.name}
                      </span>
                    )}
                    {(isExpanded || isMobileOpen) && (
                      <ChevronDown
                        className={`mr-auto w-6 h-6 transition-transform duration-200 ${
                          openSubmenu?.type === menuType &&
                          openSubmenu?.index === index
                            ? "rotate-180 text-brand-500"
                            : ""
                        }`}
                      />
                    )}
                  </button>
                </TooltipTrigger>
                {!isExpanded && !isMobileOpen && (
                  <TooltipContent side="right" className="rounded-lg">
                    {nav.name}
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ) : (
            nav.path && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={nav.path}
                      className={`menu-item group flex items-center px-4 py-3 rounded-lg ${
                        isActive(nav.path)
                          ? "menu-item-active"
                          : "menu-item-inactive"
                      } ${
                        !isExpanded ? "lg:justify-center" : "lg:justify-start"
                      }`}
                    >
                      <span
                        className={`menu-item-icon-size flex items-center justify-center text-2xl ${
                          isActive(nav.path)
                            ? "menu-item-icon-active"
                            : "menu-item-icon-inactive text-gray-500 dark:text-white"
                        }`}
                      >
                        {nav.icon}
                      </span>
                      {(isExpanded || isMobileOpen) && (
                        <span className="menu-item-text text-medium mr-3 font-bold">
                          {nav.name}
                        </span>
                      )}
                    </Link>
                  </TooltipTrigger>
                  {!isExpanded && !isMobileOpen && (
                    <TooltipContent side="right" className="rounded-lg">
                      {nav.name}
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            )
          )}
          {nav.subItems && (isExpanded || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 mr-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.path}
                      className={`menu-dropdown-item text-base px-4 py-2 ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 mr-auto">
                        {subItem.new && (
                          <span
                            className={`mr-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`mr-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed flex flex-col lg:mt-0 top-0 px-2 right-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-l border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[240px]"
            : isHovered
            ? "w-[280px]"
            : "w-[110px]"
        }
        ${
          isMobileOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        }`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-4 flex  ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-center "
        }`}
      >
        <Link href="/" className="flex items-center gap-1">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image
                className="dark:hidden h-auto w-auto  max-h-[70px] "
                src={logo}
                alt="Logo"
                width={70}
                height={70}
              />

              <Image
                className="hidden dark:block h-auto w-auto max-h-[70px]"
                src={logo}
                alt="Logo"
                width={70}
              />
              <p className="text-4xl font-extrabold mt-1 leading-none">
                <span className="text-amber-600 dark:text-amber-400 drop-shadow-sm">
                  Caf
                </span>
                <span className="text-amber-600 dark:text-amber-400 drop-shadow-sm">
                  ino
                </span>
              </p>
            </>
          ) : (
            <Image src={logo} alt="Logo" className="h-auto w-auto" width={32} />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>{renderMenuItems(navItems, "main")}</div>
            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              ></h2>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
