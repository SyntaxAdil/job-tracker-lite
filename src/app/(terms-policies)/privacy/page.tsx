import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/common/logo";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Privacy Policy | Job Tracker Lite",
  description: "Privacy Policy for Job Tracker Lite application",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Logo />
          <Link
            href="/signin"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            Back to Sign In
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        <div className="space-y-3 border-b border-border pb-6">
          <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">
            Last updated: October 11, 2026
          </p>
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us when creating an account, such as your name, email address, and job tracking records (companies, job titles, application statuses, and interview dates).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">2. How We Use Your Information</h2>
            <p>
              We use your information strictly to provide, maintain, and improve the Job Tracker Lite experience, analyze application trends for your workspace, and secure your account.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">3. Data Sharing & Third Parties</h2>
            <p>
              We do not sell, rent, or share your personal information or job application data with third parties or recruiters without your explicit consent.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">4. Data Security</h2>
            <p>
              We implement industry-standard security measures to safeguard your personal data against unauthorized access, alteration, or disclosure.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">5. Your Data Rights</h2>
            <p>
              You have the right to access, update, or delete your account and associated data at any time directly through your workspace settings.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">6. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy, please reach out to abdurrahmanadil005@gmail.com.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}