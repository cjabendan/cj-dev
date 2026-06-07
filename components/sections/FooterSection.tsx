const lastUpdated = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
}).format(new Date(process.env.BUILD_TIME || new Date()));

export default function FooterSection() {
  return (
    <footer className="mt-12 border-t border-gray-200 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 pt-10 pb-4">
        <p className="text-sm text-foreground/70">© 2026 Christian Abendan</p>
        <span className="text-sm text-foreground/70">|</span>
        <p className="text-sm text-foreground/70">Updated: {lastUpdated}</p>
      </div>
    </footer>
  );
}
