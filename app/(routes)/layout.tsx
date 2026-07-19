"use client";

import FooterSection from "@/components/sections/FooterSection";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const getPageTitle = (path: string) => {
    if (path.includes("/recommend")) return "Recommend";
    if (path.includes("/tech-stack")) return "Tech Stack";
    if (path.includes("/certifications")) return "Certifications";
    return "Page";
  };

  const getFallbackHref = (path: string) => {
    if (path.includes("/tech-stack")) return "/#skills";
    if (path.includes("/certifications")) return "/#certs";
    return "/";
  };

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(getFallbackHref(pathname));
    }
  };

  return (
    <main className="min-h-screen flex flex-col max-w-4xl mx-auto px-6 py-6 sm:pt-10 animate-fade-in">
      <div className="flex items-center gap-2 mb-8 text-sm text-muted-foreground">
        <a
          href={getFallbackHref(pathname)} 
          onClick={handleBack}
          className="group inline-flex items-center hover:text-foreground transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 mr-2 " />
          Back to Portfolio
        </a>
        <span className="text-muted-foreground/40">/</span>
        <span className="text-foreground font-bold">
          {getPageTitle(pathname)}
        </span>
      </div>
      {children}
      <FooterSection />
    </main>
  );
}