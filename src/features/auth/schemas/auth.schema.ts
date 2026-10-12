import { z } from "zod";

const email = z.email("Enter a valid email address");
const password = z.string().min(8, "Password must be at least 8 characters");

export const signInSchema = z.object({
  email,
  password,
});

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email,
  password,
});

export type AuthFormValues = {
  name?: string;
  email: string;
  password: string;
};
