"use client";

import Link from "next/link";
import { FiArchive, FiEdit2, FiFolder, FiTrash2 } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconButton } from "@/components/common/icon-button";
import type { IWorkspace } from "../interface";

type Props = {
  workspace: IWorkspace;
  onEdit: () => void;
  onArchive: () => void;
  onDelete: () => void;
};

export function WorkspaceCard({ workspace, onEdit, onArchive, onDelete }: Props) {
  const href = `/dashboard/workspaces/applications?workspaceId=${workspace.id}`;

  return (
    <Card className="animate-in fade-in slide-in-from-bottom-2 duration-300 transition-shadow hover:shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FiFolder className="size-4 text-muted-foreground" />
          <Link href={href} className="hover:underline">
            {workspace.name}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-2 min-h-10">
          {workspace.description || "No description"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Badge variant="secondary">
          {workspace.applications.length} applications
        </Badge>
      </CardContent>
      <CardFooter className="justify-between">
        <Link href={href} className={buttonVariants({ variant: "outline", size: "sm" })}>
          Open
        </Link>
        <div className="flex gap-1">
          <IconButton icon={FiEdit2} label="Edit" onClick={onEdit} />
          <IconButton
            icon={FiArchive}
            label={workspace.isArchived ? "Unarchive" : "Archive"}
            onClick={onArchive}
          />
          <IconButton
            icon={FiTrash2}
            label="Delete"
            onClick={onDelete}
            className="hover:text-destructive"
          />
        </div>
      </CardFooter>
    </Card>
  );
}
