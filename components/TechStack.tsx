import Image from "next/image";
import techData from "@/data/tech-stack.json";

export default function TechStack() {
  return (
    <div className="bento-card p-4 col-span-1 md:col-span-4 space-y-4 group animate-fade-in animation-delay-200">
      <div className="flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-bold">Tech Stack</h2>
        <button
          className="text-xs text-foreground/70 hover:text-foreground flex items-center gap-1 transition-colors"
        >
          View All
        </button>
      </div>
      <div className="flex flex-col gap-6">
        {techData.map((group) => (
          <div key={group.category} className="space-y-3">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {group.category}
            </h4>
            <div className="flex flex-wrap gap-3">
              {group.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center gap-2 px-3 py-2 border rounded-sm hover:bg-bg-card transition-all duration-300 hover:scale-105"
                  title={skill.name}
                >
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    width={16}
                    height={16}
                    className="opacity-80 hover:opacity-100"
                  />
                   <p className="text-xs">{skill.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
