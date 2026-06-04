import certData from "@/data/certifications.json";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Certifications() {
  const sortedCertifications = [...certData]
    .sort((a, b) => b.id - a.id)
    .slice(0, 4);

  return (
    <div className="p-4 col-span-1 md:col-span-4 space-y-4 group animate-fade-in animation-delay-300">
      <div className="flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-bold">Recent Certifications</h2>
        <Link
          href="/certifications"
          className="flex items-center gap-1 text-xs text-foreground/70 hover:text-foreground transition-colors"
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        {sortedCertifications.map((cert) => (
          <a
            key={cert.id}
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col gap-1 border border-gray-100 dark:border-gray-900 rounded-sm py-3 px-4 hover:bg-bg-card transition-colors"
          >
            <span className="text-sm font-medium leading-tight">
              {cert.title}
            </span>
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-muted-foreground">
                {cert.issuer}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
