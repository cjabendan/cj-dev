import { useTheme } from "next-themes";
import { useIsMounted } from "@/hooks/useIsMounted";

import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const isMounted = useIsMounted();
  if (!isMounted) return <div className="h-40" />;
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative inline-flex h-6 w-12 items-center transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-gray-200 dark:bg-gray-700"
      aria-label="Toggle Theme"
    >
      <div
        className={`absolute w-6 h-6 bg-white shadow-md transform transition-transform duration-300 ease-in-out flex items-center justify-center ${
          theme === "dark" ? "translate-x-6" : "translate-x-0"
        }`}
      >
        {theme === "dark" ? (
          <Moon size={14} className="fill-gray-800 text-gray-800" />
        ) : (
          <Sun size={14} className="fill-gray-500 text-gray-500" />
        )}
      </div>
    </button>
  );
}
