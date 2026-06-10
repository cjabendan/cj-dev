"use client";

import FooterSection from "@/components/sections/FooterSection";
import BotWidget from "@/components/ui/BotWidget";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const getPageTitle = (path: string) => {
    if (path.includes("/recommend")) return "Recommend";
    if (path.includes("/tech-stack")) return "Tech Stack";
    if (path.includes("/certifications")) return "Certifications";
    return "Page";
  };

  return (
    <main className="min-h-screen flex flex-col max-w-4xl mx-auto px-4 py-6 sm:pt-10 animate-fade-in">
      <BotWidget />
      <div className="flex items-center gap-2 mb-8 text-sm text-muted-foreground">
        <Link
          href="/"
          className="group inline-flex items-center hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-0.5" />
          Back to Portfolio
        </Link>
        <span className="text-muted-foreground/40">/</span>
        <span className="text-foreground font-medium">
          {getPageTitle(pathname)}
        </span>
      </div>
      {children}
      <FooterSection />
    </main>
  );
}
