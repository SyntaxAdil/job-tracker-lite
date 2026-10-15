import {
  APPLICATION_PRIORITIES,
  APPLICATION_STATUSES,
  JOB_TYPES,
} from "./interface";

const options = (list: readonly string[]) =>
  list.map((item) => `"${item}"`).join(" | ");

export const AI_PROMPT = `Read the job description below and return ONLY one JSON object. No markdown, no extra text.

Structure:
{
  "companyName": string,
  "position": string,
  "status": ${options(APPLICATION_STATUSES)},
  "priority": ${options(APPLICATION_PRIORITIES)},
  "jobType": ${options(JOB_TYPES)},
  "location": string,
  "minSalary": number (optional),
  "maxSalary": number (optional),
  "appliedAt": "YYYY-MM-DD" (optional),
  "interviewDate": "YYYY-MM-DD" (optional),
  "jobUrl": string (optional),
  "notes": string (optional, short summary of key requirements)
}

Rules:
- Use only the listed values for status, priority and jobType.
- Use "applied" for status and "medium" for priority if unsure.
- Skip optional keys when the job description has no data for them.
- Salary must be a plain number, no currency symbol.

Job description:
[PASTE JOB DESCRIPTION HERE]`;
