import { z } from "zod";
import {
  APPLICATION_PRIORITIES,
  APPLICATION_STATUSES,
  JOB_TYPES,
} from "../interface";

export const applicationSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(2, "Company name must be at least 2 characters"),
  position: z.string().trim().min(1, "Position is required"),
  status: z.enum(APPLICATION_STATUSES),
  priority: z.enum(APPLICATION_PRIORITIES),
  jobType: z.enum(JOB_TYPES),
  location: z.string().trim().min(1, "Location is required"),
  minSalary: z.number().min(0).optional(),
  maxSalary: z.number().min(0).optional(),
  appliedAt: z.string().optional(),
  interviewDate: z.string().optional(),
  jobUrl: z.string().trim().optional(),
  notes: z.string().trim().optional(),
});

export type applicationInput = z.infer<typeof applicationSchema>;
