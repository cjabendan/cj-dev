import React from "react";
import AccessCard from "./AccessCard";

export default function About() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-6 gap-2">
      <div className="bento-card p-4 col-span-1 md:col-span-4 space-y-2 group animate-fade-in">
        <h2 className="text-lg font-bold">About</h2>
        <p className="text-sm text-foreground/70 leading-relaxed">
          I am an aspiring full-stack software engineer with a strong foundation
          in building comprehensive web and mobile applications. My expertise
          spans with modern technologies, leveraging modern frameworks like
          Next.js, Laravel, and Expo to deliver high-performance digital
          solutions.
          <br />
          <br />
          Beyond individual development, I have taken on leadership
          responsibilities, including serving as a Project Manager during my
          academic career. In this capacity, I led the full software development
          lifecycle—from initial planning and architectural design to
          implementation and final execution—ensuring every project aligned with
          thesis objectives and business requirements.
          <br />
          <br />
          Currently, I am expanding my data architecture expertise. While I have
          a solid background in relational databases like MySQL, I am actively
          broadening my skills into non-relational landscapes, specifically
          mastering Cypher for graph database management. I am driven by the
          challenge of bridging the gap between complex backend systems and
          scalable, user-centric applications.
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
