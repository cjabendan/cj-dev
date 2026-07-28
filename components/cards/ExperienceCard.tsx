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
        <div className="absolute " />
      )}

      {/* Role & Duration */}
      <div>
        <h3 className="text-sm sm:text-base font-bold text-zinc-200">
          {exp.role}
        </h3>
        {/* <div className="text-xs text-zinc-400 tracking-wider uppercase">{exp.type}</div> */}
        <div className="flex gap-2 text-xs text-zinc-400 dark:text-zinc-800 tracking-wider">
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
          <div className="flex flex-wrap gap-1.5 pt-2">
            {exp.skills.map((skill, idx) => (
              <span
                key={idx}
                className="text-[11px] px-2.5 py-0.5 rounded-sm border border-gray-200 dark:border-gray-800 text-zinc-300"
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