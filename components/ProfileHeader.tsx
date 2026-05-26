"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useIsMounted } from "@/hooks/useIsMounted";
import {
  Check,
  MapPin,
  Eye,
  CalendarDays,
  Sun,
  Moon,
  Download,
  Briefcase,
  VerifiedIcon,
} from "lucide-react";

export default function ProfileHeader() {
  const { theme, setTheme } = useTheme();
  const isMounted = useIsMounted();

  if (!isMounted) return <div className="h-40" />;

  return (
    <header className="flex flex-col md:flex-row gap-8">
      {/* Avatar */}
      <div className="shrink-0">
        <Image
          src="/images/Pfp.png"
          alt="Christian James Abendan"
          width={170}
          height={170}
          className="rounded-sm object-cover bg-gray-200 dark:bg-gray-800"
        />
      </div>

      {/* Content */}
      <div className="flex-1 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1.5">
            <h1 className="flex items-center gap-2 text-lg md:text-2xl font-bold text-black dark:text-white mb-0 md:mt-5">
              Christian James A. Abendan
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
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400  mb-0">
              <span className="flex items-center gap-1">
                <MapPin size={14} /> Minglanilla, Cebu
              </span>
              <span className="flex items-center gap-1">
                | <Eye size={14} /> 100 Views
              </span>
              <span className="flex items-center gap-1">
                | <CalendarDays size={14} /> May 26, 2026
              </span>
            </div>

            <p className="font-semibold text-lg text-black dark:text-gray-200 mb-0">
              Aspiring Software Engineer / UI & UX Designer
            </p>
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

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-sm text-sm font-semibold hover:opacity-90 transition">
            <Briefcase size={16} /> Schedule a Call
          </button>
          <button className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-6 py-2 rounded-sm text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition text-black dark:text-white">
            <Download size={16} /> Download CV
          </button>
        </div>
      </div>
    </header>
  );
}
