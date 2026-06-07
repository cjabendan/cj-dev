import React from "react";
import AccessCard from "../ui/AccessCard";
import TechStack from "./TechStack";
import Experience from "./Experience";
import Certifications from "./Certifications";

export default function About() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-6 gap-2">
      <div className="col-span-1 md:col-span-4 flex flex-col gap-2">
        <div className="p-4 group animate-fade-in">
          <h2 className="text-lg sm:text-xl font-bold">About</h2>
          <p className="text-sm text-foreground/70 leading-relaxed mt-2">
            I am a full-stack software engineer focused on building robust web
            and mobile applications. My core expertise centers on modern
            frameworks like Next.js, Laravel, and Expo, which I use to deliver
            high-performance digital solutions.
            <br />
            <br />I am driven by a passion for solving complex technical
            challenges and turning intricate logic into smooth user experiences.
            I thrive on diving deep into system architectures to build clean,
            maintainable, and highly efficient code bases.
          </p>
        </div>
        <TechStack />
        <Certifications />
      </div>
      <div className="col-span-1 md:col-span-2 flex flex-col gap-2 animate-fade-in animation-delay-200">
        <AccessCard />
        <Experience />
      </div>
    </section>
  );
}
