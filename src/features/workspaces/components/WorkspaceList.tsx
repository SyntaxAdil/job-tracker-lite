"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiFolder, FiPlus } from "react-icons/fi";
import { buttonVariants } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { EmptyState } from "@/components/common/empty-state";
import { LoadingBlock } from "@/components/common/loading-block";
import { SegmentedControl } from "@/components/common/segmented-control";
import { useRemoveWorkspace, useToggleArchive, useWorkspaces } from "../hooks";
import type { IWorkspace } from "../interface";
import { WorkspaceCard } from "./WorkspaceCard";
import { WorkspaceFormDialog } from "./WorkspaceFormDialog";

const BASE = "/dashboard/workspaces";
const GRID = "grid gap-4 sm:grid-cols-2 xl:grid-cols-3";

export function WorkspaceList({ mode }: { mode?: "new" }) {
  const router = useRouter();
  const [archive, setArchive] = useState(false);
  const [editing, setEditing] = useState<IWorkspace | null>(null);
  const [deleting, setDeleting] = useState<IWorkspace | null>(null);
  const { data, isPending, error } = useWorkspaces(archive);
  const toggle = useToggleArchive();
  const remove = useRemoveWorkspace();

  const closeForm = () => {
    setEditing(null);
    if (mode === "new") router.push(BASE);
  };

  let content;
  if (isPending) {
    content = (
      <div className={GRID}>
        <LoadingBlock />
        <LoadingBlock />
        <LoadingBlock />
      </div>
    );
  } else if (error) {
    content = <p className="text-sm text-destructive">{error.message}</p>;
  } else if (!data.length) {
    content = (
      <EmptyState
        icon={FiFolder}
        title={archive ? "No archived workspaces" : "No workspaces yet"}
        description={archive ? undefined : "Create one to start tracking."}
      >
        {!archive && (
          <Link href={`${BASE}/new`} className={buttonVariants()}>
            <FiPlus /> New workspace
          </Link>
        )}
      </EmptyState>
    );
  } else {
    content = (
      <div className={GRID}>
        {data.map((w) => (
          <WorkspaceCard
            key={w.id}
            workspace={w}
            onEdit={() => setEditing(w)}
            onArchive={() => toggle.mutate(w.id)}
            onDelete={() => setDeleting(w)}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Workspaces</h1>
          <p className="text-sm text-muted-foreground">
            Organize applications by job search.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <SegmentedControl
            value={archive ? "archived" : "active"}
            onChange={(v) => setArchive(v === "archived")}
            options={[
              { value: "active", label: "Active" },
              { value: "archived", label: "Archived" },
            ]}
          />
          <Link href={`${BASE}/new`} className={buttonVariants()}>
            <FiPlus /> New workspace
          </Link>
        </div>
      </div>

      {content}

      <WorkspaceFormDialog
        open={mode === "new" || !!editing}
        workspace={editing ?? undefined}
        onOpenChange={(open) => !open && closeForm()}
      />

      <ConfirmDialog
        open={!!deleting}
        onOpenChange={(open) => !open && setDeleting(null)}
        title="Delete workspace?"
        description="All applications inside this workspace will be deleted too."
        onConfirm={() => deleting && remove.mutate(deleting.id)}
      />
    </div>
  );
}
