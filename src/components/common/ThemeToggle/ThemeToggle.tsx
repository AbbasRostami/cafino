"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { RiComputerFill, RiSunLine } from "react-icons/ri";
import { IoMoon } from "react-icons/io5";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative group">
      <button
        onClick={(e) => {
          const root = document.documentElement;

          const nextTheme =
            theme === "light" ? "dark" : theme === "dark" ? "system" : "light";

          if (!document.startViewTransition) {
            setTheme(nextTheme);
            return;
          }

          root.style.setProperty("--x", `${e.clientX}px`);
          root.style.setProperty("--y", `${e.clientY}px`);

          document.startViewTransition(() => {
            setTheme(nextTheme);
          });
        }}
        className="p-2 rounded-full border transition-all cursor-pointer duration-300 border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-800 shadow-sm hover:shadow-lg hover:scale-110"
      >
        {theme === "light" ? (
          <IoMoon className="w-6 h-6 text-yellow-500 group-hover:text-yellow-400 transition duration-300" />
        ) : theme === "dark" ? (
          <RiSunLine className="w-6 h-6 text-gray-300 group-hover:text-orange-300 transition duration-300" />
        ) : (
          <RiComputerFill className="w-6 h-6 text-blue-500 group-hover:text-blue-400 transition duration-300" />
        )}
      </button>

      <div className="absolute z-[999999] left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 flex space-x-2 bg-white dark:bg-neutral-800 p-2 rounded-lg shadow-lg border border-gray-300 dark:border-gray-600">
        {["light", "dark", "system"].map((t) => (
          <button
            key={t}
            onClick={(e) => {
              const root = document.documentElement;

              const nextTheme =
                theme === "light"
                  ? "dark"
                  : theme === "dark"
                  ? "system"
                  : "light";

              if (!document.startViewTransition) {
                setTheme(nextTheme);
                return;
              }

              root.style.setProperty("--x", `${e.clientX}px`);
              root.style.setProperty("--y", `${e.clientY}px`);

              document.startViewTransition(() => {
                setTheme(nextTheme);
              });
            }}
            className="p-2 rounded-full transition-all duration-300 cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-700"
          >
            {t === "light" && <IoMoon className="w-6 h-6 text-yellow-500" />}
            {t === "dark" && <RiSunLine className="w-6 h-6 text-gray-400" />}
            {t === "system" && (
              <RiComputerFill className="w-6 h-6 text-blue-500" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
