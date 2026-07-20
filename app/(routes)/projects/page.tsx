"use client";

import { useState } from "react";
import Image from "next/image";

import projects from "@/data/projects.json";
import techStack from "@/data/tech-stack.json";
import Skeleton from "@/components/ui/Skeleton";

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
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [loadedIcons, setLoadedIcons] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-6 animate-fade-in mb-auto">
      <h1 className="text-xl sm:text-2xl font-bold">All Projects</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-24">
        {displayedProjects.map((project) => {
          const isMainImageLoading = !loadedImages[project.id];
          return (
            <div
              key={project.id}
              className="flex flex-col border border-gray-100 dark:border-gray-900 rounded-sm overflow-hidden"
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
                  loading="eager"
                  sizes="(max-width: 768px) 85vw, (max-width: 1024px) 50vw, 33vw"
                  onLoad={() =>
                    setLoadedImages((prev) => ({
                      ...prev,
                      [project.id]: true,
                    }))
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
    </div>
  );
}
