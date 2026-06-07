const lastUpdated = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
}).format(new Date(process.env.BUILD_TIME || new Date()));

export default function FooterSection() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 w-full">
      <div
        className="max-w-4xl mx-auto px-4 flex flex-row items-center justify-center gap-2 sm:gap-4 pt-6
      text-xs sm:text-sm  "
      >
        <p className="text-foreground/70">© 2026 Christian Abendan</p>
        <span className="text-foreground/40">|</span>
        <p className="text-foreground/70">Updated: {lastUpdated}</p>
      </div>
    </footer>
  );
}
