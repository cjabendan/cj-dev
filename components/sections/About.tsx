import React from "react";

import TechStack from "./TechStack";
import Experience from "./Experience";
import Certifications from "./Certifications";
import AccessCard from "../cards/AccessCard";
// import Banner from "../ui/Banner";

export default function About() {
  const aboutText = (
    <div className="p-4 group animate-fade-in">
      <h2 className="text-lg sm:text-xl font-bold">About</h2>
      <p className="text-sm text-foreground/70 leading-relaxed mt-2">
        I am an aspiring full-stack software engineer focused on building robust web and
        mobile applications. My current expertise centers on modern frameworks and
        tools, and I am actively expanding my capabilities into deep backend architectures.
        <br />
        <br />I am driven by a passion for solving complex technical challenges
        and turning intricate logic into smooth user experiences and continuously learning best practices to build clean, efficient codebases.
      </p>
    </div>
  );

  return (
    <section>
      {/* DESKTOP LAYOUT*/}
      <div className="hidden md:grid grid-cols-6 gap-2">
        <div className="col-span-4 flex flex-col gap-2">
          {aboutText}
          <TechStack />
          <Certifications />
        </div>
        <div className="col-span-2 flex flex-col gap-2 animate-fade-in animation-delay-200">
          <AccessCard />
          {/* <Banner /> */}
          <Experience />
        </div>
      </div>

      {/* MOBILE LAYOUT */}
      <div className="flex md:hidden flex-col gap-2">
        {aboutText}
        <div className="mt-2 animate-fade-in animation-delay-200">
          <AccessCard />
        </div>
        {/* <div className="mt-2 animate-fade-in animation-delay-200">
           <Banner />
        </div> */}
        <div className="animate-fade-in animation-delay-200">
          <Experience />
        </div>
        <div>
          <TechStack />
        </div>
        <div>
          <Certifications />
        </div>
      </div>
    </section>
  );
}
