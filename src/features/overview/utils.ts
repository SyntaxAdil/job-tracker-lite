import {
  APPLICATION_PRIORITIES,
  APPLICATION_STATUSES,
  JOB_TYPES,
  type IApplication,
} from "@/features/applications/interface";

const countBy = <T extends string>(
  apps: IApplication[],
  keys: readonly T[],
  pick: (a: IApplication) => T,
) =>
  keys.map((key) => ({
    key,
    value: apps.filter((a) => pick(a) === key).length,
  }));

// last 6 months
function monthly(apps: IApplication[]) {
  const now = new Date();
  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    const value = apps.filter((a) => {
      const x = new Date(a.appliedAt);
      return (
        x.getFullYear() === d.getFullYear() && x.getMonth() === d.getMonth()
      );
    }).length;
    return { key: d.toLocaleString("en", { month: "short" }), value };
  });
}

export function getOverview(apps: IApplication[]) {
  const total = apps.length;
  const byStatus = countBy(apps, APPLICATION_STATUSES, (a) => a.status);
  const count = (s: string) => byStatus.find((x) => x.key === s)?.value ?? 0;
  const replied = count("interview") + count("selected") + count("rejected");

  const today = new Date().setHours(0, 0, 0, 0);
  const upcoming = apps
    .filter((a) => a.interviewDate && new Date(a.interviewDate).getTime() >= today)
    .sort(
      (a, b) =>
        new Date(a.interviewDate!).getTime() -
        new Date(b.interviewDate!).getTime(),
    )
    .slice(0, 5);

  const recent = [...apps]
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    .slice(0, 5);

  return {
    total,
    interviews: count("interview"),
    selected: count("selected"),
    responseRate: total ? Math.round((replied / total) * 100) : 0,
    byStatus,
    byPriority: countBy(apps, APPLICATION_PRIORITIES, (a) => a.priority),
    byType: countBy(apps, JOB_TYPES, (a) => a.jobType),
    monthly: monthly(apps),
    upcoming,
    recent,
  };
}
