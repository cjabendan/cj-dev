import expData from "@/data/experiences.json";
import ExperienceCard, {
  ExperienceItem,
} from "@/components/cards/ExperienceCard";

interface GroupedCompany {
  company: string;
  logo?: string;
  location?: string;
  type: string;
  roles: ExperienceItem[];
}

export default function ExperiencesPage() {
  const groupedExperiences = (expData as ExperienceItem[])
    .sort((a, b) => b.id - a.id)
    .reduce<GroupedCompany[]>((acc, item) => {
      const existing = acc.find((g) => g.company === item.company);
      if (existing) {
        existing.roles.push(item);
      } else {
        acc.push({
          company: item.company,
          logo: item.logo,
          location: item.location,
          type: item.type,
          roles: [item],
        });
      }
      return acc;
    }, []);

  return (
    <div className="max-w-3xl space-y-8 animate-fade-in mb-14">
      <h1 className="text-xl sm:text-2xl font-bold">Experience</h1>

      <div className="flex flex-col">
        {groupedExperiences.map((group, index) => {
          const isLast = index === groupedExperiences.length - 1;
          const hasMultipleRoles = group.roles.length > 1;

          return (
            <div key={group.company} className="relative flex gap-4 sm:gap-6">
              {/* Left Column: Logo & Vertical Line */}
              <div className="relative flex flex-col items-center shrink-0 self-stretch">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-sm bg-[var(--background)] border border-gray-300 dark:border-gray-700 flex items-center justify-center text-xs  sm:text-sm font-semibold text-black dark:text-white z-10">
                  {group.logo || group.company.slice(0, 2).toUpperCase()}
                </div>
                {!isLast && (
                  <div className="absolute bg-gray-200 dark:bg-gray-800 w-[1px] top-0 bottom-0 left-1/2 -translate-x-1/2 z-0" />
                )}
              </div>

              {/* Right Column: Experience Details */}
              <div className="flex flex-col gap-6 pb-8 flex-1">
                <div>
                  <h2 className="text-base sm:text-lg font-bold">
                    {group.company}
                  </h2>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400 dark:text-zinc-500">
                    {group.location && <span>{group.location}</span>}
                  </div>
                </div>

                {/* Roles Container */}
                <div
                  className={`flex flex-col gap-8 ${
                    hasMultipleRoles
                      ? "border-l border-gray-200/60 dark:border-gray-800 pl-6"
                      : ""
                  }`}
                >
                  {group.roles.map((exp) => (
                    <ExperienceCard
                      key={exp.id}
                      exp={exp}
                      hasMultipleRoles={hasMultipleRoles}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
