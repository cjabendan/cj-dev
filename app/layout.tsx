import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ConvexClientProvider } from "@/components/providers/ConvexClientProvider";
import BotWidget from "@/components/ui/BotWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Christian Abendan | Software Engineer",
    template: "%s | Christian Abendan",
  },
  description: "Portfolio of Christian Abendan, a full-stack software developer specializing in React, Next.js, React Native, and reactive modern web applications.",
  keywords: [
    "Christian Abendan",
    "Software Developer",
    "Full-Stack Web Engineer",
    "Full-Stack Mobile Engineer",
    "React Developer",
    "Next.js Developer",
    "React Native (EXPO) Developer",
  ],
  authors: [{ name: "Christian Abendan" }],
  creator: "Christian Abendan",
  metadataBase: new URL("https://cjabendan.is-a.dev"), 
  openGraph: {
    title: "Christian Abendan | Full-Stack Software Developer",
    description: "Explore the modern web architectures, full-stack systems, and applications built by Christian Abendan.",
    url: "https://cjabendan.is-a.dev",
    siteName: "Christian Abendan | Software Engineer",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png", 
        width: 1200,
        height: 630,
        alt: "Christian Abendan Preview Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Christian Abendan | Software Engineer",
    description: "Full-stack software developer portfolio showcasing scalable applications.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col relative bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <ConvexClientProvider>
            {children}
            <BotWidget />
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}