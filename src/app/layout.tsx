import type { Metadata } from "next";
import { Inter, Geist_Mono, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Job Tracker Lite | Job Application Manager",
    template: "%s | Job Tracker Lite",
  },
  description:
    "Organize your job search with Job Tracker Lite. Manage job applications, track application statuses, prioritize opportunities, and keep your career journey organized in one place.",
  applicationName: "Job Tracker Lite",
  keywords: [
    "Job Tracker Lite",
    "Job Application Tracker",
    "Job Search Management",
    "Job Application Manager",
    "NestJS",
    "Next.js",
  ],
  authors: [{ name: "Md. Abdur Rahman", url: "https://abdur-rahman-dev.vercel.app" }],
  creator: "Md. Abdur Rahman",
  openGraph: {
    title: "Job Tracker Lite | Job Application Manager",
    description:
      "Track job applications, manage priorities, and organize your job search in one place.",
    url: "https://job-tracker-lite.vercel.app",
    siteName: "Job Tracker Lite",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Job Tracker Lite | Job Application Manager",
    description:
      "A simple way to organize job applications and track your job search journey.",
  },
  metadataBase: new URL("https://job-tracker-lite.vercel.app"),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistMono.variable,
        "font-sans dark",
        geist.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <Toaster
          position="top-right"
          closeButton
          theme="system"
          duration={1000}
        />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
