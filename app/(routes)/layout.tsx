import Link from "next/link";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16 animate-fade-in">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <span className="mr-2">←</span> Back to Portfolio
      </Link>
      {children}
    </main>
  );
}
