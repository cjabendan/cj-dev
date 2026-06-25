import React from "react";

export default function Banner() {
  return (
    <div className="flex w-full justify-center px-2 animate-fade-in">
      <div className="relative flex flex-col sm:flex-row items-center justify-between gap-2 w-full max-w-4xl p-2 rounded-sm bg-indigo-400 border border-zinc-800/80 backdrop-blur-md overflow-hidden">
        <div className="absolute -left-10 -top-10 w-24 h-24 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left z-10">
          {/* Main Text */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-100 tracking-wide">
              I&apos;m actively open for new opportunities!
            </h4>
          </div>
        </div>

      </div>
    </div>
  );
}
