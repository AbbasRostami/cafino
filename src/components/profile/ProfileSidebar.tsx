"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, ListOrdered, Heart, MapPin, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/profile/overview", label: "داشبورد کاربر", icon: <User /> },
  { href: "/profile/orders", label: "سفارش‌ها", icon: <ListOrdered /> },
  { href: "/profile/favorites", label: "علاقه‌مندی‌ها", icon: <Heart /> },
  { href: "/profile/addresses", label: "آدرس‌ها", icon: <MapPin /> },
  { href: "/profile/settings", label: "تنظیمات پروفایل", icon: <Settings /> },
];

export default function ProfileSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-2 p-4 h-full">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onNavigate}
          className={cn(
            "flex items-center gap-3 rounded-lg px-4 py-2 font-medium transition-colors hover:bg-primary/10 hover:text-primary",
            pathname === link.href ? "bg-primary/10 text-primary" : "text-muted-foreground"
          )}
        >
          <span className="w-5 h-5">{link.icon}</span>
          <span>{link.label}</span>
        </Link>
      ))}
    </nav>
  );
}
