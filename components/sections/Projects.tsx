import Link from "next/link";
import { ChevronRight } from "lucide-react";

import projects from "@/data/projects.json";
import techStack from "@/data/tech-stack.json";
import ProjectCard from "../cards/ProjectCard";

const SORTED_PROJECTS = [...projects].sort((a, b) => b.id - a.id);

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
  const displayedProjects = SORTED_PROJECTS.slice(0, 3);

  return (
    <section className="flex flex-col gap-6 p-4" id="projects">
      <div className="flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-bold">Recent Projects</h2>
        <Link
          href="/projects"
          className="flex items-center gap-1 text-xs text-foreground/70 hover:text-foreground transition-colors"
        >
          View All
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="flex xl:grid xl:grid-cols-3 gap-4 overflow-x-auto snap-x snap-mandatory pb-4 xl:pb-0 scrollbar-none">
        {displayedProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            techIconMap={TECH_ICON_MAP}
            priority={index < 3}
            className="max-w-[340px] md:max-w-none md:w-[calc(50%-0.5rem)] xl:w-full shrink-0 snap-center"
            titleClassName="font-semibold text-base"
            descriptionClassName="text-sm"
          />
        ))}
      </div>
    </section>
  );
}
