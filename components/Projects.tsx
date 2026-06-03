"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import projects from "@/data/projects.json";
import techStack from "@/data/tech-stack.json";


export default function Projects() {
  const [showAll, setShowAll] = useState(false);

  const getTechIcon = (techName: string) => {
    for (const category of techStack) {
      const skill = category.skills.find((s) => s.name === techName);
      if (skill) return skill.icon;
    }
    return null;
  };

  const sortedProjects = [...projects].sort((a, b) => b.id - a.id);

  const displayedProjects = showAll
    ? sortedProjects
    : sortedProjects.slice(0, 3);

  return (
    <section className="flex flex-col mt-4 gap-6 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Recent Projects</h2>
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex items-center gap-1 text-xs text-foreground/70 hover:text-foreground transition-colors cursor-pointer "
        >
          {showAll ? "Show Less" : "View All"}
          <ArrowRight className="w-4 h-3" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pb-2">
        {displayedProjects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col w-full border border-gray-100 dark:border-gray-900 rounded-xs"
          >
            <div className="relative w-full h-[180px]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="rounded-t-xs object-cover bg-muted"
              />
            </div>

            <a
              key={project.id}
              href={project.url}
              target="_blank"
              className="border-t border-gray-100 dark:border-gray-900 rounded-xs p-4 space-y-2"
            >
              <h3 className="font-semibold text-foreground">{project.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </p>

              <div className="pt-2">
                <div className="flex flex-wrap gap-2 mt-1">
                  {project.tech.map((t) => {
                    const icon = getTechIcon(t);
                    return (
                      <span
                        key={t}
                        className="flex items-center gap-1 text-[10px] px-3 py-2 border border-gray-100 dark:border-gray-900 rounded-sm hover:bg-bg-card transition-all"
                      >
                        {icon && (
                          <Image
                            src={icon}
                            alt={t}
                            width={16}
                            height={16}
                            style={{ width: "16px", height: "16px" }}
                            className={`opacity-80 hover:opacity-100 object-contain ${
                              t === "Expo" ? "dark:invert" : ""
                            }`}
                          />
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
