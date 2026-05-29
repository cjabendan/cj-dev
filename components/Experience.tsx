import React from "react";

export default function Experience() {
  return (
    <div className="bento-card p-4 col-span-1 md:col-span-4 space-y-2 group animate-fade-in animation-delay-200">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Experience</h2>
        <a
          className="text-xs text-foreground/70 hover:text-foreground flex items-center gap-1 transition-colors"
          href=""
        >
          View All
        </a>
      </div>
    </div>
  );
}
