import React from "react";
import AccessCard from "./AccessCard";

export default function About() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-6 gap-2">
      <div className="bento-card p-4 col-span-1 md:col-span-4 space-y-2 group animate-fade-in">
        <h2 className="text-lg font-bold">About</h2>
        <p className="text-sm text-foreground/70 leading-relaxed">
          I am a full-stack software engineer focused on building robust web and
          mobile applications. My core expertise centers on modern frameworks
          like Next.js, Laravel, and Expo, which I use to deliver
          high-performance digital solutions.
          <br />
          <br />
          Beyond development, I have experience leading the full software
          lifecycle as a Project Manager. I guide projects from initial planning
          and architectural design to final execution, ensuring all technical
          deliverables remain strictly aligned with business objectives.
          <br />
          <br />
          Currently, I am expanding my data architecture expertise. While I have
          a solid background in relational databases like MySQL, I am now
          mastering Cypher for graph database management to better bridge the
          gap between complex backend systems and scalable, user-centric
          applications.
        </p>
      </div>
      <div className="col-span-1 md:col-span-2 md:row-span-3 space-y-2 animate-fade-in animation-delay-200">
        <div className="flex justify-center mb-2">
          <AccessCard />
        </div>
      </div>
    </section>
  );
}
