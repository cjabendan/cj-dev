const lastUpdated = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
}).format(new Date(process.env.BUILD_TIME || new Date()));

export default function Footer() {
    return (
    <footer className="border-t border-gray-200 dark:border-gray-800 w-full">
      <div
        className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-1 pt-6
      text-[11px] sm:text-sm  "
      >
        <div>
          <p className="text-foreground/70">
            © 2026 Christian Abendan. All Rights Reserved.
          </p>
        </div>
        <div>
          <p className="text-foreground/70">Updated: {lastUpdated}</p>
        </div>
      </div>
      </footer>
  );
}
