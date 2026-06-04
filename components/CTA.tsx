"use client";

import contactData from "@/data/contact.json";
import Socials from "./Socials";
import { ArrowRight, LucideProps } from "lucide-react";
import * as LucideIcons from "lucide-react";

const ContactItem = ({ item }: { item: (typeof contactData)[0] }) => {
  const Icon = LucideIcons[item.icon as keyof typeof LucideIcons] as
    | React.ElementType<LucideProps>
    | undefined;

  const subLabel =
    item.platform === "Email" ? "cjamesabendan@gmail.com" : "Schedule a Call";

  return (
    <a href={item.link} className="flex items-center justify-between group">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm">
          {Icon && <Icon className="h-4 w-4" />}
          <h3>{item.platform}</h3>
        </div>
        <span className="text-xs text-gray-400">{subLabel}</span>
      </div>
      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
    </a>
  );
};

export default function CTA() {
  return (
    <section className="mt-10 p-4">
      <h2 className="text-lg sm:text-xl font-bold">Let&apos;s work together</h2>

      <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mt-4">
        <div className="md:col-span-2 flex flex-col gap-6">
          <p className="text-sm text-foreground/70 leading-relaxed">
            I&apos;m always looking for new opportunities and collaborations.
            <br />
            <br />
            Feel free to reach out if you need help with consulting, web
            development, mobile apps, or custom software solutions.
          </p>
          <Socials />
        </div>

        <div className="flex flex-col gap-6">
          {contactData.map((item) => (
            <ContactItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
