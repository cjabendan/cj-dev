import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function Banner() {
  return (
    <div className="w-full px-4 py-2 animate-fade-in">
      <a
        href="#contact"
        className="group relative flex flex-col gap-2 p-3 rounded-sm border border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 transition-all duration-200"
      >
        {/* Top Row: Availability Badge + Direct Action */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 tracking-wide">
              AVAILABLE FOR HIRE
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 group-hover:underline">
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Middle Row: Value Proposition */}
        <p className="text-xs text-foreground/80 leading-snug">
          Open for freelance projects, full-stack web/mobile apps.
        </p>
      </a>
    </div>
  );
}