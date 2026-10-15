"use client";

import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight, LoaderCircle } from "lucide-react";
import { toast } from "sonner";

import {
  signInSchema,
  registerSchema,
  type AuthFormValues,
} from "../schemas/auth.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { SocialAuth } from "./SocialAuth";
import Logo from "../../../components/common/logo";
import { authClient } from "../../../lib/auth/auth-client";

interface AuthFormProps {
  mode?: "signin" | "register";
}

export function AuthForm({ mode = "signin" }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isRegister = mode === "register";
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(
      isRegister ? registerSchema : signInSchema,
    ) as Resolver<AuthFormValues>,
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = async (data: AuthFormValues) => {
    if (mode === "signin") {
      const { error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });
      if (error) {
        toast.error(error.message ?? "Something went wrong");
        return;
      }
      toast.success("Login successful");
      router.push("/dashboard");
    }

    if (mode === "register") {
      const { error } = await authClient.signUp.email({
        name: data.name ?? "",
        email: data.email,
        password: data.password,
      });
      if (error) {
        toast.error(error.message ?? "Something went wrong");
        return;
      }
      toast.success("Register successful");
      router.push("/dashboard");
    }
  };

  return (
    <div className="w-full max-w-md bg-card border border-border p-8 rounded-2xl shadow-sm text-card-foreground">
      {/* Header with Logo */}
      <div className="flex items-center justify-between mb-6">
        <Logo />
        <span className="text-xs bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full font-medium">
          Free forever
        </span>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">
          {isRegister ? "Create an account" : "Welcome back"}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {isRegister
            ? "Enter your details to set up your workspace"
            : "Enter your email to sign in to your workspace"}
        </p>
      </div>

      {/* Social Logins */}
      {/* <SocialAuth /> */}

      {/* <div className="relative my-6 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <span className="relative bg-card px-3 text-xs uppercase tracking-wider text-muted-foreground">
          Or continue with email
        </span>
      </div> */}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {isRegister && (
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Work Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@work.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full gap-2 mt-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              {isRegister ? "Creating account..." : "Signing in..."}
              <LoaderCircle size={16} className="animate-spin" />
            </>
          ) : (
            <>
              {isRegister ? "Create Account" : "Sign In with Email"}
              <ArrowRight size={16} />
            </>
          )}
        </Button>
      </form>

      {/* Footer Switcher */}
      <div className="text-center text-sm mt-6 text-muted-foreground">
        {isRegister ? (
          <p>
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-primary font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        ) : (
          <p>
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-primary font-medium hover:underline"
            >
              Sign up for free
            </Link>
          </p>
        )}
      </div>

      <p className="text-[11px] text-center text-muted-foreground mt-6 leading-relaxed">
        By continuing, you agree to our{" "}
        <Link href="/terms" className="underline hover:text-foreground">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline hover:text-foreground">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}