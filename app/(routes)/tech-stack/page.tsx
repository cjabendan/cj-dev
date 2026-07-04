import techData from "@/data/tech-stack.json";
import Image from "next/image";

export default function TechStackPage() {
  return (
    <div className="space-y-6 animate-fade-in mb-auto">
      <h1 className="text-xl sm:text-2xl font-bold">Full Tech Stack</h1>

      <div className="space-y-8 mb-14">
        {techData.map((group) => (
          <div key={group.category} className="space-y-4">
            <h3 className="text-sm sm:text-base font-semibold text-muted-foreground uppercase tracking-wider">
              {group.category}
            </h3>

            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-900 rounded-sm bg-card hover:bg-muted/50 transition-colors"
                >
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    width={24}
                    height={24}
                    className={`opacity-80 hover:opacity-100 object-contain 
                     w-4 h-4 ${
                       skill.name === "GitHub" || skill.name === "Expo"
                         ? "dark:invert"
                         : ""
                     }`}
                  />
                  <span className="text-xs sm:text-sm font-medium">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
