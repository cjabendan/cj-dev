import ProjectCard from "@/components/cards/ProjectCard";
import projects from "@/data/projects.json";
import techStack from "@/data/tech-stack.json";

const displayedProjects = [...projects].sort((a, b) => b.id - a.id);

const TECH_ICON_MAP = techStack.reduce(
  (acc, category) => {
    category.skills.forEach((skill) => {
      acc[skill.name] = skill.icon;
    });
    return acc;
  },
  {} as Record<string, string>,
);

export default function Projects() {
  return (
    <div className="space-y-6 animate-fade-in mb-auto">
      <h1 className="text-xl sm:text-2xl font-bold">All Projects</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-24">
        {displayedProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            techIconMap={TECH_ICON_MAP}
            priority={index < 3}
            titleClassName="font-bold text-base sm:text-lg"
            descriptionClassName="text-sm sm:text-base"
            iconClassName="w-4 h-4"
          />
        ))}
      </div>
    </div>
  );
}
