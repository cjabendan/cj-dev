"use client";

import contactData from "@/data/contact.json";
import Socials from "../ui/Socials";
import { ArrowRight, LucideProps } from "lucide-react";
import * as LucideIcons from "lucide-react";

const ContactItem = ({ item }: { item: (typeof contactData)[0] }) => {
  const Icon = LucideIcons[item.icon as keyof typeof LucideIcons] as
    | React.ElementType<LucideProps>
    | undefined;

  const subLabel =
    item.platform === "Email" ? "cjamesabendan@gmail.com" : "Schedule a Call";

  return (
    <a
      href={item.link}
      className="flex items-center justify-between group transition-all duration-200"
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-sm font-medium">
          {Icon && <Icon className="h-4 w-4 text-foreground/80" />}
          <h3>{item.platform}</h3>
        </div>
        <span className="text-xs text-gray-400 pl-6">{subLabel}</span>
      </div>
      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:translate-x-1 transition-all" />
    </a>
  );
};

export default function CTA() {
  return (
    
    <section className="flex mt-2 gap-6 p-4 mb-14">
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-10 items-start">
       
        <div className="md:col-span-3 flex flex-col gap-6">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight">
            Let&apos;s Work Together
          </h2>
          <p className="text-sm text-foreground/70 leading-relaxed">
            I&apos;m always looking for new opportunities and collaborations to
            build clean, efficient, and scalable applications.
            <br />
            <br />
            Feel free to reach out if you need help with consulting, web
            development, mobile apps, or custom software solutions.
          </p>
          <Socials />
        </div>

        <div className="md:col-span-2 flex flex-col gap-8 md:pt-14">
          {contactData.map((item) => (
            <ContactItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
