import type { Metadata } from "next";
import { AuthLayout } from "@/features/auth/components/AuthLayout";

export const metadata: Metadata = {
  title: "Sign In | Job Tracker Lite",
  description: "Sign in to your Job Tracker Lite workspace",
};

export default function SignInPage() {
  return <AuthLayout mode="signin" />;
}
