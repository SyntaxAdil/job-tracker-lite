import { z } from "zod";

export const authSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  email: z.string().email("Please enter a valid work email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type AuthFormValues = z.infer<typeof authSchema>;
