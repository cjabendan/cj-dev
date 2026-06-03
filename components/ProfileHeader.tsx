"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useIsMounted } from "@/hooks/useIsMounted";
import {
  Check,
  MapPin,
  CalendarDays,
  Sun,
  Moon,
  Download,
  VerifiedIcon,
} from "lucide-react";

// Last updated date
const lastUpdated = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
}).format(new Date(process.env.BUILD_TIME || new Date()));

export default function ProfileHeader() {
  const { theme, setTheme } = useTheme();
  const isMounted = useIsMounted();

  if (!isMounted) return <div className="h-40" />;

  return (
    <section className="mb-8 animate-fade-in">
      <div className="flex sm:items-center gap-4 sm:gap-6">
        {/* Avatar */}
        <Image
          src="/images/Pfp.png"
          alt="Christian James Abendan"
          width={160}
          height={160}
          loading="eager"
          className="rounded-sm object-cover bg-gray-200 dark:bg-gray-800"
        />
        <div className="flex-1 min-w-0">
          {/* Content */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <h1 className="block min-[470px]:hidden max-[445px]:text-base text-xl font-bold truncate">
                Dev. CJ
              </h1>

              <h1 className="hidden min-[470px]:block min-[620px]:hidden text-xl font-bold truncate">
                Dev. CJ Abendan
              </h1>

              <h1 className="hidden min-[620px]:block text-xl font-bold truncate">
                Dev. Christian James A. Abendan
              </h1>
              <div className="relative">
                <VerifiedIcon
                  className="w-5 h-5 text-blue-500 fill-blue-500"
                  strokeWidth={0}
                />
                <Check
                  className="absolute top-1 left-1 w-3 h-3 text-white"
                  strokeWidth={3}
                />
              </div>
            </div>

            {/* Theme Toggle */}
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
          </div>

          <div className="flex flex-col sm:flex-row gap-x-4 max-[445px]:gap-y-1 max-[445px]:text-[10px] text-sm truncate">
            <p className="text-foreground/70 mt-0.5 flex items-center gap-1 font-meduim">
              <MapPin size={12} className="mr-1 shrink-0" />
              Cebu, Philippines
            </p>
            <span className="text-gray-300 hidden sm:block">|</span>
            <span className="text-foreground/70 mt-0.5 flex items-center gap-1">
              <CalendarDays size={12} className="mr-1" />
              Updated: {lastUpdated}
            </span>
          </div>
          <div className="flex items-center justify-between mt-1.5 sm:mt-3">
            <p className="flex max-[445px]:text-[11px] text-base font-medium gap-x-1 truncate">
              <span>Software Engineer</span>
              <span className="text-gray-400">\</span>
              <span>Full-Stack Developer</span>
            </p>
          </div>

          {/* Action Buttons Container */}
          <div className="mt-3 max-[445px]:mt-2">
            <div className="flex max-[445px]:flex-col flex-row gap-2">
              <button className="inline-flex max-[445px]:h-7 h-9 items-center justify-center rounded bg-black dark:bg-white text-white dark:text-black max-[445px]:px-2.5 px-4 text-[10px] sm:text-xs font-semibold transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 gap-1 whitespace-nowrap min-h-0 max-[445px]:w-full">
                <CalendarDays size={12} className="shrink-0 mr-1" />
                Schedule<span>a Call</span>
              </button>
              <button className="inline-flex max-[445px]:h-7 h-9 items-center justify-center rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 max-[445px]:px-2.5 px-4 text-[10px] sm:text-xs font-semibold text-black dark:text-white transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:-translate-y-0.5 gap-1 whitespace-nowrap min-h-0 max-[445px]:w-full">
                <Download size={12} className="shrink-0 mr-1" />
                <span>Download </span>CV
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
