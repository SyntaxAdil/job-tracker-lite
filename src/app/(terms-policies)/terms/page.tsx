import type { Metadata } from "next";
import Link from "next/link";
import Logo  from "@/components/common/logo";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Terms of Service | Job Tracker Lite",
  description: "Terms of Service for Job Tracker Lite application",
};

export default function TermsPage() {
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
          <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
          <p className="text-sm text-muted-foreground">
            Last updated: October 11, 2026
          </p>
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Job Tracker Lite, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">2. Description of Service</h2>
            <p>
              Job Tracker Lite provides job seekers with tools to organize, monitor, and track their job applications and interview pipelines in a central workspace.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">3. User Accounts</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">4. User Content & Data</h2>
            <p>
              You retain all rights to the data and information you input into Job Tracker Lite. We do not claim ownership over your job application logs, resumes, or notes.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">5. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account at any time for violations of these terms or misuse of the platform.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">6. Contact Us</h2>
            <p>
              If you have any questions regarding these Terms of Service, please contact us at abdurrahmanadil005@gmail.com.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}