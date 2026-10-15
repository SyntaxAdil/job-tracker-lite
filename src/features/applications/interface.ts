export const APPLICATION_STATUSES = [
  "applied",
  "interview",
  "rejected",
  "selected",
] as const;

export const APPLICATION_PRIORITIES = ["high", "medium", "low"] as const;

export const JOB_TYPES = [
  "full-time",
  "part-time",
  "internship",
  "contract",
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];
export type ApplicationPriority = (typeof APPLICATION_PRIORITIES)[number];
export type JobType = (typeof JOB_TYPES)[number];

export interface IApplication {
  _id: string;
  workspaceId: string;
  companyName: string;
  position: string;
  status: ApplicationStatus;
  priority: ApplicationPriority;
  minSalary?: number;
  maxSalary?: number;
  location: string;
  jobType: JobType;
  appliedAt: string;
  interviewDate?: string;
  jobUrl?: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}
