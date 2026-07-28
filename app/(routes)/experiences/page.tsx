import expData from "@/data/experiences.json";

export default function ExperiencesPage() {
  const experiences = [...expData].sort((a, b) => b.id - a.id);

  return (
    <div className="max-w-3xl space-y-8 animate-fade-in mb-14 text-zinc-100">
      <h1 className="text-xl sm:text-2xl font-bold">Experience</h1>

      <div className="flex flex-col">
        {experiences.map((exp, index) => {
          const isLast = index === experiences.length - 1;

          return (
            <div key={exp.id} className="relative flex gap-4 sm:gap-6">
              {/* Left Column: Logo & Vertical Line */}
              <div className="relative flex flex-col items-center shrink-0 self-stretch">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-sm bg-[var(--background)] dark:bg-[var(--foreground)]  border border-gray-300 dark:border-gray-700 flex items-center justify-center text-xs sm:text-sm font-semibold z-10">
                  {exp.logo || exp.company.slice(0, 2).toUpperCase()}
                </div>
                {/* Vertical Line */}
                {!isLast && (
                  <div className="absolute bg-gray-200/50 dark:bg-gray-800 w-[1px]  top-0 bottom-0 left-1/2 -translate-x-1/2 z-0" />
                )}
              </div>

              {/* Right Column: Experience Details */}
              <div className="flex flex-col gap-4 pb-8">
                {/* Company Name & Location */}
                <div>
                  <h2 className="text-base sm:text-lg font-bold">
                    {exp.company}
                  </h2>
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <span>{exp.type}</span>
                    {exp.location && (
                      <>
                        <span>·</span>
                        <span>{exp.location}</span>
                      </>
                    )}
                  </div>
                </div>
                {/* Role & Duration */}
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-zinc-200">
                    {exp.role}
                  </h3>
                  <div className="flex gap-2 text-xs text-zinc-400 tracking-wider">
                    <div className="uppercase">{exp.start}</div>
                    <div>-</div>
                    <div className="uppercase">{exp.end}</div>
                    <div className="lowercase">{`· ${exp.duration}`}</div>
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
