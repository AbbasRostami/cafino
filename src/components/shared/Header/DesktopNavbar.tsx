import Link from "next/link";
import { Home, FileText, Phone, Info } from "lucide-react";
import { MotionSpan } from "@/utils/MotionWrapper";
import { DesktopNavbarProps } from "@/types/main";

const DesktopNavbar: React.FC<DesktopNavbarProps> = ({ pathname }) => {
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
    </>
  );
};

export default DesktopNavbar;
