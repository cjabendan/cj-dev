import certData from "@/data/certifications.json";

export default function Certifications() {
  
  const sortedCertifications = [...certData]
    .sort((a, b) => b.id - a.id)
    .slice(0, 4);

  return (
    <div className="bento-card p-4 col-span-1 md:col-span-4 space-y-4 group animate-fade-in animation-delay-300">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Recent Certifications</h2>
        <button className="text-xs text-foreground/70 hover:text-foreground transition-colors">
          View All
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {sortedCertifications.map((cert) => (
          <div
            key={cert.id}
            className="flex flex-col gap-1 border border-gray-200 dark:border-gray-800 rounded-sm py-3 px-3 hover:bg-bg-card transition-colors"
          >
            <span className="text-sm font-medium leading-tight">
              {cert.title}
            </span>
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-muted-foreground">
                {cert.issuer}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
