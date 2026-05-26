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
      <div className="flex flex-col sm:flex-row md:items-center items-start gap-6">
        {/* Avatar */}
        <Image
          src="/images/Pfp.png"
          alt="Christian James Abendan"
          width={170}
          height={170}
          loading="eager"
          className="rounded-sm object-cover bg-gray-200 dark:bg-gray-800"
        />
        <div className="flex-1 min-w-0">
          {/* Content */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold truncate">
                Christian James A. Abendan
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
              className="relative flex items-center w-16 h-8 bg-gray-200 dark:bg-gray-700 p-1 transition-colors duration-300 focus:outline-none shrink-0"
              aria-label="Toggle Theme"
            >
              <div
                className={`absolute w-6 h-6 bg-white shadow-md transform transition-transform duration-300 flex items-center justify-center ${
                  theme === "dark" ? "translate-x-8" : "translate-x-0"
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
          <div className="flex flex-wrap items-center gap-x-4 mb-0">
            <p className="text-xs text-foreground/70 mt-0.5 flex items-center gap-1 truncate">
              <MapPin size={14} className="mr-1" /> Minglanilla, Cebu,
              Philippines
            </p>
            <span className="text-gray-300 hidden md:block">|</span>
            <span className="text-sm text-foreground/70 mt-0.5 flex items-center gap-1 truncate">
              <CalendarDays size={14} className="mr-1" />
              Last updated: {lastUpdated}
            </span>
          </div>
          <div className="flex items-center justify-between mt-4 md:mt-2">
            <p className="text-base sm:text-lg font-semibold truncate">
              Aspiring Software Engineer
              <span className="text-gray-400"> \ </span>
              UI & UX Designer
            </p>
          </div>
          {/* Action Buttons */}
          <div className="space-y-2 mt-3 md:mt-4">
            <div className="flex gap-3">
              <button className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-sm text-sm font-semibold hover:opacity-90 transition">
                <CalendarDays size={16} /> Schedule a Call
              </button>
              <button className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 py-2 rounded-sm text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition text-black dark:text-white">
                <Download size={16} /> Download CV
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
