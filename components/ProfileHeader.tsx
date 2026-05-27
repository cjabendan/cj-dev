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
      <div className="flex  md:items-center gap-4 sm:gap-6">
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
              <h1 className="max-[630px]:block hidden text-base font-bold truncate">
                Dev. CJ
              </h1>
              <h1 className="max-[630px]:hidden block max-[600px]:text-base text-xl font-bold truncate">
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
          <div className="flex flex-col md:flex-row gap-x-4">
            <p className=" max-[506px]:text-xs text-sm text-foreground/70 mt-0.5 flex items-center gap-1 truncate">
              <MapPin size={12} className="mr-1 shrink-0" />
              Cebu, Philippines
            </p>
            <span className="text-gray-300 hidden md:block">|</span>
            <span className="max-[506px]:text-xs text-sm text-foreground/70 mt-0.5 flex items-center gap-1 truncate">
              <CalendarDays size={12} className="mr-1" />
              Updated: {lastUpdated}
            </span>
          </div>
          <div className="flex items-center mt-4">
            <p className="flex max-[440px]:text-sm text-base md:text-lg font-semibold gap-x-1 truncate">
              <span>Aspiring Software Engineer</span>
              <span className="max-[506px]:hidden flex items-center gap-x-1">
                <span className="text-gray-400">\</span>
                <span>PM</span>
              </span>
            </p>
          </div>
          {/* Action Buttons */}
          <div className="max-[460px]:mt-4 mt-2">
            <div className="flex gap-2">
              <button className="flex items-center gap-1 bg-black dark:bg-white text-white dark:text-black px-6 max-[460px]:px-3 py-2 rounded-sm max-[430px]:text-xs text-sm font-semibold hover:opacity-90 transition-all duration-200 hover:-translate-y-0.5">
                <CalendarDays size={12} className="mr-1" />
                Schedule<span className="block max-[480px]:hidden">a Call</span>
              </button>
              <button className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 max-[460px]:px-3 py-2 rounded-sm max-[430px]:text-xs text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 hover:-translate-y-0.5 text-black dark:text-white">
                <Download size={12} />
                <span className="block max-[554px]:hidden">Download </span>CV
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
