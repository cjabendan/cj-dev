import { ArrowLeft } from "lucide-react";
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
        className="group inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Portfolio
      </Link>
      {children}
    </main>
  );
}
