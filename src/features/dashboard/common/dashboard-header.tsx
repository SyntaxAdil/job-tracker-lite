import type { ReactNode } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";

type DashboardHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  leading?: ReactNode;
};

export function DashboardHeader({
  title,
  description,
  actions,
  leading,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex min-w-0 items-start gap-2">
        <SidebarTrigger className="mt-1 shrink-0 md:hidden" />

        <div className="min-w-0">
          {leading}
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>

          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>

      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
