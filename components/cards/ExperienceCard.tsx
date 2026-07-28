import React from "react";

export interface ExperienceItem {
  id: number;
  role: string;
  type: string;
  company: string;
  logo?: string;
  start: string;
  end: string;
  duration?: string;
  location?: string;
  description?: string;
  skills?: string[];
}

interface ExperienceCardProps {
  exp: ExperienceItem;
  hasMultipleRoles: boolean;
}

export default function ExperienceCard({ exp, hasMultipleRoles }: ExperienceCardProps) {
  return (
    <div className="relative flex flex-col gap-4">
      {hasMultipleRoles && (
        <div className="absolute -left-[30.3px] top-1.5 w-3 h-3 bg-[var(--background)] border-1 border-gray-300 dark:border-gray-700 transition-colors rounded-full " />
      )}

      {/* Role & Duration */}
      <div>
        <h3 className="text-sm sm:text-base font-bold">
          {exp.role}
        </h3>
        {/* <div className="text-xs text-zinc-400 tracking-wider uppercase">{exp.type}</div> */}
        <div className="flex gap-1 sm:gap-1.5 text-xs text-zinc-400 dark:text-zinc-500 tracking-wider">
          <div className="uppercase">{exp.start}</div>
          <div>-</div>
          <div className="uppercase">{exp.end}</div>
          {exp.duration && (
            <div className="lowercase">{`· ${exp.duration}`}</div>
          )}
        </div>
      </div>

      {/* Description & Skill Badges */}
      <div>
        {exp.description && (
          <p className="text-xs sm:text-sm leading-relaxed">
            {exp.description}
          </p>
        )}
        {exp.skills && exp.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-4">
            {exp.skills.map((skill, idx) => (
              <span
                key={idx}
                className="text-[11px] sm:text-xs px-3 py-1 rounded-sm border border-gray-200 dark:border-gray-800"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}