import type { IApplication } from "./interface";
import type { applicationInput } from "./schema/application-schema";

const compact = new Intl.NumberFormat("en", { notation: "compact" });

export function formatSalary(min?: number, max?: number) {
  if (min === undefined && max === undefined) return "-";
  if (min !== undefined && max !== undefined) {
    return `${compact.format(min)} - ${compact.format(max)}`;
  }
  return compact.format(min ?? max ?? 0);
}

export function formatDate(iso?: string) {
  if (!iso) return "-";
  return new Date(iso).toLocaleDateString("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// empty input to undefined
export const toNumber = (v: unknown) =>
  v === "" || v == null ? undefined : Number(v);

export const toOptional = (v: unknown) => (v ? String(v) : undefined);

export function toFormValues(a?: IApplication): applicationInput {
  return {
    companyName: a?.companyName ?? "",
    position: a?.position ?? "",
    status: a?.status ?? "applied",
    priority: a?.priority ?? "medium",
    jobType: a?.jobType ?? "full-time",
    location: a?.location ?? "",
    minSalary: a?.minSalary,
    maxSalary: a?.maxSalary,
    appliedAt: (a?.appliedAt ?? new Date().toISOString()).slice(0, 10),
    interviewDate: a?.interviewDate?.slice(0, 10),
    jobUrl: a?.jobUrl ?? "",
    notes: a?.notes ?? "",
  };
}
