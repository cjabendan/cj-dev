import certData from "@/data/certifications.json";

export default function CertificationsPage() {
  const allCertifications = [...certData].sort((a, b) => b.id - a.id);

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold">All Certifications</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {allCertifications.map((cert) => (
          <a
            key={cert.id}
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col gap-2 p-5 border border-gray-200 dark:border-gray-900 rounded-sm hover:bg-muted/50 transition-colors"
          >
            <div className="flex justify-between items-start">
              <span className="text-lg font-semibold leading-tight">{cert.title}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {cert.issuer}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}