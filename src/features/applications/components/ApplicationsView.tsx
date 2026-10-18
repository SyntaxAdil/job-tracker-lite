
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiArrowLeft,
  FiBriefcase,
  FiColumns,
  FiFolder,
  FiList,
  FiPlus,
} from "react-icons/fi";
import { buttonVariants } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { EmptyState } from "@/components/common/empty-state";
import { LoadingBlock } from "@/components/common/loading-block";
import { SegmentedControl } from "@/components/common/segmented-control";
import { DashboardHeader } from "@/features/dashboard/common/dashboard-header";
import {
  useApplications,
  useRemoveApplication,
  useUpdateApplication,
} from "../hooks";
import type { IApplication } from "../interface";
import { ApplicationBoard } from "./ApplicationBoard";
import { ApplicationTable } from "./ApplicationTable";

const BASE = "/dashboard/workspaces";

export function ApplicationsView({
  workspaceId,
}: {
  workspaceId?: string;
}) {
  const [view, setView] = useState<"table" | "board">("table");
  const [deleting, setDeleting] = useState<IApplication | null>(null);

  const { data, isPending, error } = useApplications(workspaceId);
  const update = useUpdateApplication();
  const remove = useRemoveApplication();

  if (!workspaceId) {
    return (
      <EmptyState
        icon={FiFolder}
        title="No workspace selected"
        description="Pick a workspace to see its applications."
      >
        <Link href={BASE} className={buttonVariants()}>
          Go to workspaces
        </Link>
      </EmptyState>
    );
  }

  const newHref = `${BASE}/applications/new?workspaceId=${workspaceId}`;

  let content;

  if (isPending) {
    content = <LoadingBlock className="h-64" />;
  } else if (error) {
    content = <p className="text-sm text-destructive">{error.message}</p>;
  } else if (!data.length) {
    content = (
      <EmptyState
        icon={FiBriefcase}
        title="No applications yet"
        description="Add your first application to this workspace."
      >
        <Link href={newHref} className={buttonVariants()}>
          <FiPlus /> New application
        </Link>
      </EmptyState>
    );
  } else if (view === "table") {
    content = (
      <ApplicationTable
        applications={data}
        onDelete={setDeleting}
      />
    );
  } else {
    content = (
      <ApplicationBoard
        applications={data}
        onDelete={setDeleting}
        onStatusChange={(a, status) =>
          update.mutate({ id: a._id, body: { status } })
        }
      />
    );
  }

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Applications"
        leading={
          <Link
            href={BASE}
            className="mb-1 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <FiArrowLeft /> Workspaces
          </Link>
        }
        actions={
          <>
            <SegmentedControl
              value={view}
              onChange={setView}
              options={[
                { value: "table", label: "Table", icon: FiList },
                { value: "board", label: "Board", icon: FiColumns },
              ]}
            />

            <Link href={newHref} className={buttonVariants()}>
              <FiPlus /> New application
            </Link>
          </>
        }
      />

      {content}

      <ConfirmDialog
        open={!!deleting}
        onOpenChange={(open) => !open && setDeleting(null)}
        title="Delete application?"
        description="This cannot be undone."
        onConfirm={() => deleting && remove.mutate(deleting._id)}
      />
    </div>
  );
}
