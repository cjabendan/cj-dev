"use client";

import { useTheme } from "next-themes";
import { useIsMounted } from "@/hooks/useIsMounted";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isMounted = useIsMounted();

  if (!isMounted) {
    return (
      <div className="h-5 w-10 sm:h-6 sm:w-12 bg-gray-200 dark:bg-gray-700 opacity-50 animate-pulse rounded-xs" />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative inline-flex h-5 w-10 sm:h-6 sm:w-12 items-center transition-colors duration-300 ease-in-out focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-gray-200 dark:bg-gray-700 rounded-xs cursor-pointer"
      aria-label="Toggle Theme"
    >
      <div
        className={`absolute w-5 h-5 sm:w-6 sm:h-6 bg-white shadow-md rounded-xs transform transition-transform duration-300 ease-in-out flex items-center justify-center ${
          theme === "dark" 
            ? "translate-x-5 sm:translate-x-6" 
            : "translate-x-0"
        }`}
      >
        {theme === "dark" ? (
          <Moon className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-gray-800 text-gray-800" />
        ) : (
          <Sun className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-gray-500 text-gray-500" />
        )}
      </div>
    </button>
  );
}