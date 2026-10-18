
"use client";

import { useMemo } from "react";
import {
  FiBriefcase,
  FiCalendar,
  FiCheckCircle,
  FiPercent,
} from "react-icons/fi";
import { LoadingBlock } from "@/components/common/loading-block";
import { useApplications } from "@/features/applications/hooks";
import { getOverview } from "../utils";
import { ApplicationList } from "./ApplicationList";
import { BarList } from "./BarList";
import { MonthlyChart } from "./MonthlyChart";
import { StatCard } from "./StatCard";
import { StatusDonut } from "./StatusDonut";
import { DashboardHeader } from "../../dashboard/common/dashboard-header";

export function OverviewView() {
  const { data, isLoading, isError } = useApplications();
  const o = useMemo(() => getOverview(data ?? []), [data]);

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <LoadingBlock key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-sm text-destructive">
        Failed to load overview.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Overview"
        description="Your job search at a glance."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Applications" value={o.total} icon={FiBriefcase} />
        <StatCard label="Interviews" value={o.interviews} icon={FiCalendar} />
        <StatCard label="Selected" value={o.selected} icon={FiCheckCircle} />
        <StatCard
          label="Response rate"
          value={`${o.responseRate}%`}
          icon={FiPercent}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <MonthlyChart data={o.monthly} />
        </div>
        <StatusDonut data={o.byStatus} total={o.total} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <BarList title="Priority" data={o.byPriority} />
        <BarList title="Job type" data={o.byType} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ApplicationList
          title="Upcoming interviews"
          items={o.upcoming}
          empty="No interviews scheduled."
          dateOf={(a) => a.interviewDate}
        />
        <ApplicationList
          title="Recent applications"
          items={o.recent}
          empty="No applications yet."
          dateOf={(a) => a.appliedAt}
        />
      </div>
    </div>
  );
}
