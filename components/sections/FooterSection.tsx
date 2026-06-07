const lastUpdated = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
}).format(new Date(process.env.BUILD_TIME || new Date()));

export default function FooterSection() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 w-full">
      <div
        className="max-w-4xl mx-auto px-4 flex max-[390px]:flex-col flex-row items-center justify-center gap-2 pt-6
      text-xs sm:text-sm  "
      >
        <p className="text-foreground/70">© 2026 Christian Abendan.</p>
        <p className="text-foreground/70">Last updated: {lastUpdated}</p>
      </div>
    </footer>
  );
}
