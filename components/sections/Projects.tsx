"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Skeleton from "../ui/Skeleton";
import projects from "@/data/projects.json";
import techStack from "@/data/tech-stack.json";

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
  const [showAll, setShowAll] = useState(false);

  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [loadedIcons, setLoadedIcons] = useState<Record<string, boolean>>({});

  const displayedProjects = showAll
    ? SORTED_PROJECTS
    : SORTED_PROJECTS.slice(0, 3);

  return (
    <section className="flex flex-col gap-6 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-bold">Recent Projects</h2>
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex items-center gap-1 text-xs text-foreground/70 hover:text-foreground transition-colors cursor-pointer"
        >
          {showAll ? "Show Less" : "Show All"}
          <ChevronRight
            className={`w-4 h-4 transition-transform duration-300 ease-in-out ${
              showAll ? "rotate-90" : "rotate-0"
            }`}
          />
        </button>
      </div>
      {/* Project Container */}
      <div className="grid grid-col-1 md:grid-cols-3 gap-3">
        {displayedProjects.map((project, index) => {
          const isMainImageLoading = !loadedImages[project.id];
          return (
            <div
              key={project.id}
              className="flex flex-col w-full border border-gray-100 dark:border-gray-900 rounded-sm overflow-hidden"
            >
              {/* Main Image Block & Skeleton Overlay */}
              <div className="relative w-full h-[180px]">
                {isMainImageLoading && (
                  <Skeleton className="absolute inset-0 w-full h-full rounded-none z-10" />
                )}
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  priority={index < 3}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  onLoad={() =>
                    setLoadedImages((prev) => ({ ...prev, [project.id]: true }))
                  }
                  className={`rounded-t-xs object-contain bg-white transition-opacity duration-300 ${
                    isMainImageLoading ? "opacity-0" : "opacity-100"
                  }`}
                />
              </div>
              {/* Project Anchor Tag */}
              <a
                href={project.url === "null" ? undefined : project.url}
                rel="noopener noreferrer"
                target="_blank"
                className={`border-t border-gray-100 dark:border-gray-900 p-4 space-y-2 flex-1 flex flex-col justify-between ${
                  project.url === "null"
                    ? "pointer-events-none"
                    : "cursor-pointer"
                }`}
              >
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                </div>
                {/* Tech Badges Block */}
                <div className="pt-8">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => {
                      const icon = TECH_ICON_MAP[t];
                      const isIconLoading =
                        icon && !loadedIcons[`${project.id}-${t}`];

                      return (
                        <span
                          key={t}
                          className="relative flex items-center gap-1 text-[10px] px-3 py-2 border border-gray-100 dark:border-gray-900 rounded-sm hover:bg-bg-card transition-all min-w-[32px] min-h-[34px]"
                        >
                          {isIconLoading && (
                            <Skeleton className="absolute inset-1 rounded-sm" />
                          )}

                          {icon && (
                            <Image
                              src={icon}
                              alt={t}
                              width={16}
                              height={16}
                              loading="lazy"
                              onLoad={() =>
                                setLoadedIcons((prev) => ({
                                  ...prev,
                                  [`${project.id}-${t}`]: true,
                                }))
                              }
                              className={`opacity-80 hover:opacity-100 object-contain w-4 h-4 transition-opacity duration-200 ${
                                isIconLoading ? "opacity-0" : "opacity-100"
                              } ${t === "Expo" ? "dark:invert" : ""}`}
                            />
                          )}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
