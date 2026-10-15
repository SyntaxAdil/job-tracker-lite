import z from "zod";

export const workspaceSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  description: z.string().trim().optional(),
});

export type workspaceInput = z.infer<typeof workspaceSchema>;
