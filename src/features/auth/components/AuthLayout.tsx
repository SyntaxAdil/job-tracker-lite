import { AuthForm } from "./AuthForm";
import { AuthPreview } from "./AuthPreview";

interface AuthLayoutProps {
  mode: "signin" | "register";
}

export function AuthLayout({ mode }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 bg-background">
      <div className="w-full max-w-5xl flex items-center justify-center lg:justify-between gap-12">
        {/* Left Side: Dynamic Form */}
        <div className="w-full max-w-md">
          <AuthForm mode={mode} />
        </div>

        {/* Right Side: Static Preview Section */}
        <AuthPreview />
      </div>
    </div>
  );
}