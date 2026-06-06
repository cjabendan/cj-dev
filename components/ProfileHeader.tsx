"use client";

import Image from "next/image";

import { Check, MapPin, Calendar, Download, VerifiedIcon } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

/* Last updated date
const lastUpdated = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
}).format(new Date(process.env.BUILD_TIME || new Date()));
  
*/

export default function ProfileHeader() {
  return (
    <section className="mb-8 animate-fade-in">
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Avatar */}
        <Image
          src="/images/gallery/Pfp.png"
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
              <p className="text-base sm:text-xl font-bold truncate">
                <span className="inline min-[470px]:hidden">Dev. CJ</span>
                <span className="hidden min-[470px]:inline min-[530px]:hidden">
                  Dev. CJ Abendan
                </span>
                <span className="hidden min-[530px]:inline sm:hidden">
                  Dev. Christian Abendan
                </span>
                <span className="hidden sm:inline">
                  Dev. Christian James A. Abendan
                </span>
              </p>
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
            <ThemeToggle />
          </div>

          <div className="flex gap-x-4 text-sm">
            <p className="max-[460px]:text-[11px] text-xs text-sm text-foreground/70 mt-0.5 flex items-center gap-1 font-medium">
              <MapPin size={12} className="mr-1 shrink-0" />
              <span className="block max-[485px]:hidden">Minglanilla, </span>
              Cebu, Philippines
            </p>
          </div>
          <div className="flex items-center flex-wrap mt-1.5 sm:mt-3">
            <p className="max-[485px]:text-xs max-[530px]:text-sm text-base">
              <span>Software Engineer</span>
              <span className="text-gray-400 mx-2">\</span>
              <span>Full-Stack Developer</span>
            </p>
          </div>

          {/* Action Buttons Container */}
          <div className="mt-3 max-[460px]:mt-2">
            <div className="flex max-[460px]:flex-col flex-row gap-2">
              <button className="inline-flex max-[460px]:h-7 h-9 items-center justify-center rounded bg-black dark:bg-white text-white dark:text-black max-[460px]:px-2.5 px-4 text-[10px] sm:text-xs font-semibold transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 gap-1 whitespace-nowrap min-h-0 max-[445px]:w-full">
                <Calendar size={12} className="shrink-0 mr-1" />
                Schedule<span>a Call</span>
              </button>
              <button className="inline-flex max-[460px]:h-7 h-9 items-center justify-center rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 max-[460px]:px-2.5 px-4 text-[10px] sm:text-xs font-semibold text-black dark:text-white transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:-translate-y-0.5 gap-1 whitespace-nowrap min-h-0 max-[445px]:w-full">
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
