import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function Banner() {
  return (
    <div className="w-full px-4 pt-2 sm:pt-3 animate-fade-in">
      <a
        href="https://zcal.co/cjabendan"
        target="_blank"
        className="group relative flex flex-col gap-1.5 sm:gap-2 p-3.5 rounded-sm bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-700 hover:from-violet-600 hover:via-purple-600 hover:to-fuchsia-700 text-white shadow-lg shadow-purple-950/20 transition-all duration-300 overflow-hidden"
      >
        {/* Grid Overlay */}
        <div
          className="absolute inset-0 opacity-8 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "12px 12px",
          }}
        />

        {/* Ambient Top Right Glow */}
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-fuchsia-400/25 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
        <div className="relative z-10 flex items-center justify-between">
          <span className="text-sm font-bold tracking-wider text-white/90 uppercase">
            AVAILABLE FOR HIRE
          </span>
          <div className="flex items-center gap-1 text-xs font-semibold text-white/90 group-hover:text-white group-hover:underline">
            <span className="block sm:hidden">Let&apos;s Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
        <p className="relative z-10 text-xs text-white font-normal leading-snug">
          I&apos;m open for freelance projects, full-stack web/mobile apps.
        </p>
      </a>
    </div>
  );
}
