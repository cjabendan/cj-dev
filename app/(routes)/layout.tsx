"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Footer from "@/components/layout/Footer";

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const getPageTitle = (path: string) => {
    if (path.includes("/experiences")) return "Experiences";
    if (path.includes("/tech")) return "Tech Stack";
    if (path.includes("/certifications")) return "Certifications";
    if (path.includes("/projects")) return "Projects";
    if (path.includes("/recommend")) return "Recommend";
    return "Page";
  };

  const getFallbackHref = (path: string) => {
    if (path.includes("/experiences")) return "/#experience";
    if (path.includes("/tech")) return "/#skills";
    if (path.includes("/certifications")) return "/#certs";
    if (path.includes("/projects")) return "/#projects";
    return "/";
  };

  return (
    <main className="min-h-screen flex flex-col max-w-4xl mx-auto px-6 py-6 sm:pt-10 animate-fade-in">
      <div className="flex items-center gap-2 mb-8 text-sm text-muted-foreground">
        <Link
          href={getFallbackHref(pathname)}
          className="group inline-flex items-center hover:text-foreground transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Portfolio
        </Link>
        <span className="text-muted-foreground/40">/</span>
        <span className="text-foreground font-bold">{getPageTitle(pathname)}</span>
      </div>
      {children}
      <Footer />
    </main>
  );
}
