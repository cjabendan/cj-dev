"use client";

import { useState } from "react";
import Image from "next/image";
import techData from "@/data/tech-stack.json";

export default function TechStack() {
  const [showAll, setShowAll] = useState(false);

  const displayData = showAll
    ? techData
    : techData.slice(0, 2).map((group, index) => ({
        ...group,
        skills: group.skills.slice(0, index === 0 ? 3 : 4),
      }));
      
  return (
    <div className="bento-card p-4 col-span-1 md:col-span-4 space-y-4 group">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Tech Stack</h2>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-xs text-foreground/70 hover:text-foreground transition-colors"
        >
          {showAll ? "Show Less" : "View All"}
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {displayData.map((group) => (
          <div key={group.category} className="space-y-3">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase">
              {group.category}
            </h4>
            <div className="flex flex-wrap gap-3">
              {group.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center gap-2 px-3 py-2 border rounded-sm hover:bg-bg-card transition-all"
                >
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    width={16}
                    height={16}
                    style={{ width: "16px", height: "16px" }}
                    className={`opacity-80 hover:opacity-100 object-contain ${
                      skill.name === "GitHub" ? "dark:invert" : ""
                    }`}
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
