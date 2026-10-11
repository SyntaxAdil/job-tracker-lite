import type { Metadata } from "next";
import { AuthLayout } from "@/features/auth/components/AuthLayout";

export const metadata: Metadata = {
  title: "Register | Job Tracker Lite",
  description: "Create a free account on Job Tracker Lite",
};

export default function RegisterPage() {
  return <AuthLayout mode="register" />;
}