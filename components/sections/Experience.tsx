import experiences from "@/data/experiences.json";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Experience() {
  const sortedExperiences = [...experiences]
    .sort((a, b) => b.id - a.id)
    .slice(0, 4);

  return (
    <div className="p-4 col-span-1 md:col-span-4 space-y-4 group animate-fade-in animation-delay-200" id="experience">
      <div className="flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-bold">Experience</h2>
        <Link
          href="/experiences"
          className="flex items-center gap-1 text-xs text-foreground/70 hover:text-foreground transition-colors"
        >
          View All
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="flex flex-col relative gap-6 mt-5.5">
        <div className="absolute left-[6px] top-3 bottom-0 w-[1px] bg-gray-200/60 dark:bg-gray-800/60 z-0"></div>

        {sortedExperiences.map((exp, index) => (
          <div key={exp.id} className="relative pl-7 z-10">
            <div
              className={`absolute left-0 top-1.5 w-3 h-3 border-1 border-accent transition-colors ${
                index === 0
                  ? "bg-[var(--foreground)]"
                  : "bg-[var(--background)] border-gray-200/60 dark:border-gray-800/60"
              }`}
            ></div>
            <div className="flex flex-col gap-1 sm:gap-1.5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-accent">
                  {exp.role}
                </h3>
                <span className="text-[8px] font-semibold py-0.5 px-2 border border-border-primary bg-bg-card rounded uppercase">
                  {exp.type}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <p className="text-gray-900 dark:text-gray-300">
                  {exp.company}
                </p>
                <p>{exp.year}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
