import certData from "@/data/certifications.json";

export default function CertificationsPage() {
  const allCertifications = [...certData].sort((a, b) => b.id - a.id);

  return (
    <div className="space-y-6 animate-fade-in mb-auto">
      <h1 className="text-xl sm:text-2xl font-bold">All Certifications</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-14">
        {allCertifications.map((cert) => (
          <a
            key={cert.id}
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
           className={`flex flex-col gap-1 border border-gray-100 dark:border-gray-900 rounded-sm py-3 px-4 hover:bg-bg-card transition-colors ${
              cert.url === "null" || !cert.url
                ? "pointer-events-none"
                : "cursor-pointer"
            }`}
          >
            <div className="flex justify-between items-start">
              <span className="text-sm sm:text-base font-semibold leading-tight">{cert.title}</span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {cert.issuer}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}