"use client";

import contactData from "@/data/contact.json";
import * as LucideIcons from "lucide-react";
import { ArrowRight, LucideProps } from "lucide-react";

type IconName = keyof typeof LucideIcons;

const DynamicIcon = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => {
  const Icon = LucideIcons[name as IconName];
  if (typeof Icon !== "object" && typeof Icon !== "function") return null;
  const IconComponent = Icon as React.ElementType<LucideProps>;
  return <IconComponent className={className || "h-4 w-4"} />;
};

export default function CTA() {
  return (
    <section className="mt-10 p-4">
      <h2 className="text-lg font-bold">Let&apos;s work together</h2>

      <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mt-4">
      
        <div className="md:col-span-2 flex flex-col gap-8">
          <p className="text-sm text-foreground/70 leading-relaxed mt-2">
            I&apos;m always looking for new opportunities and collaborations.
            <br />
            <br />
            Feel free to reach out if you need help with consulting, web
            development, mobile apps, or custom software solutions.
          </p>

          <div className="flex items-center gap-4">
            {contactData
              .filter((item) => item.isSocial)
              .map((social) => (
                <a
                  key={social.id}
                  href={social.link}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <DynamicIcon name={social.icon} />
                </a>
              ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {contactData
            .filter((item) => !item.isSocial)
            .map((item) => (
              <a
                key={item.id}
                href={item.link}
                className="flex items-center justify-between group"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm">
                    <DynamicIcon name={item.icon} />
                    <h3>{item.platform}</h3>
                  </div>
                  <span className="text-xs text-gray-400">
                    {item.platform === "Email"
                      ? "cjamesabendan@gmail.com"
                      : "Schedule a Call"}
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
              </a>
            ))}
        </div>
      </div>
    </section>
  );
}
