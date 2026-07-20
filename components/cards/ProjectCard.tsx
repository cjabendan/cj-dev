"use client";

import { useState } from "react";
import Image from "next/image";
import Skeleton from "@/components/ui/Skeleton";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  url: string;
  tech: string[];
}

interface ProjectCardProps {
  project: Project;
  techIconMap: Record<string, string>;
  priority?: boolean;
  className?: string;
}

export default function ProjectCard({
  project,
  techIconMap,
  priority = false,
  className = "",
}: ProjectCardProps) {
  const [isMainImageLoading, setIsMainImageLoading] = useState(true);
  const [loadedIcons, setLoadedIcons] = useState<Record<string, boolean>>({});

  return (
    <div
      className={`flex flex-col w-full border border-gray-100 dark:border-gray-900 rounded-sm overflow-hidden ${className}`}
    >
      {/* Main Image Block & Skeleton Overlay */}
      <div className="relative w-full h-[180px] bg-gray-50 dark:bg-gray-900">
        {isMainImageLoading && (
          <Skeleton className="absolute inset-0 w-full h-full rounded-none z-10" />
        )}
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes="(max-width: 768px) 85vw, (max-width: 1024px) 50vw, 33vw"
          onLoad={() => setIsMainImageLoading(false)}
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
          project.url === "null" ? "pointer-events-none" : "cursor-pointer"
        }`}
      >
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground">{project.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Tech Badges Block */}
        <div className="pt-8">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => {
              const icon = techIconMap[t];
              const isIconLoading = icon && !loadedIcons[t];

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
                        setLoadedIcons((prev) => ({ ...prev, [t]: true }))
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
}
