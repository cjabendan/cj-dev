"use client";

import { useState } from "react";
import Image from "next/image";
import { CodeXml, ExternalLink } from "lucide-react";
import Skeleton from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  type?: string;
  code?: string;
  url?: string;
  tech: string[];
}

interface ProjectCardProps {
  project: Project;
  techIconMap: Record<string, string>;
  priority?: boolean;
  className?: string;
  contentClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  badgeClassName?: string;
  iconClassName?: string;
}

export default function ProjectCard({
  project,
  techIconMap,
  priority = false,
  className,
  titleClassName,
  descriptionClassName,
  iconClassName,
}: ProjectCardProps) {
  const [isMainImageLoading, setIsMainImageLoading] = useState(true);
  const [loadedIcons, setLoadedIcons] = useState<Record<string, boolean>>({});

  const hasLinks =
    (project.code && project.code !== "null") ||
    (project.url && project.url !== "null");

  return (
    <div
      className={cn(
        "flex flex-col w-full border border-gray-100 dark:border-gray-900 rounded-sm overflow-hidden",
        className,
      )}
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

      {/* Main Content */}
      <div className="border-t border-gray-100 dark:border-gray-900 flex-1 flex flex-col justify-between">
        <div className="flex flex-col p-4 space-y-4 gap-2 sm:gap-4">
          <div className="space-y-2">
            <h3 className={cn("text-foreground font-bold", titleClassName)}>
              {project.title}
            </h3>
            <p
              className={cn(
                "text-muted-foreground line-clamp-2 text-sm",
                descriptionClassName,
              )}
            >
              {project.description}
            </p>
          </div>
          {/* Tech Badges */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => {
              const icon = techIconMap[t];
              const isIconLoading = icon && !loadedIcons[t];

              return (
                <span
                  key={t}
                  className="relative flex items-center justify-center p-2 border border-gray-100 dark:border-gray-900 rounded-sm hover:bg-bg-card transition-all"
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
                      className={cn(
                        "opacity-80 hover:opacity-100 object-contain transition-opacity duration-200",
                        t === "Expo" && "dark:invert",
                        isIconLoading ? "opacity-0" : "opacity-100",
                        iconClassName,
                      )}
                    />
                  )}
                </span>
              );
            })}
          </div>
        </div>
        {/* Footer Links */}
        {hasLinks && (
          <div className="border-t border-gray-100 dark:border-gray-900 px-4 py-3 flex gap-2">
            {project.code && project.code !== "null" && (
              <a
                href={project.code}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 sm:gap-1.5 border border-gray-100 dark:border-gray-900 rounded-sm px-2.5 py-1 text-xs"
              >
                <CodeXml className="w-3.5 h-3.5" />
                Code
              </a>
            )}
            {project.url && project.url !== "null" && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 sm:gap-1.5 border border-gray-100 dark:border-gray-900 rounded-sm px-2.5 py-1 text-xs"
              >
                <ExternalLink className="w-3 h-3" />
                Live
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
