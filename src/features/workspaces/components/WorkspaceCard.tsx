
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { IWorkspace } from "../interface";

type Props = {
  workspace: IWorkspace;
  onEdit: () => void;
  onArchive: () => void;
  onDelete: () => void;
};

export function WorkspaceCard({
  workspace,
  onEdit,
  onArchive,
  onDelete,
}: Props) {
  const href = `/dashboard/workspaces/applications?workspaceId=${workspace.id}`;

  const iconButtonClass =
    "inline-flex size-8 shrink-0 items-center justify-center rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";

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
        <Link
          href={href}
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          Open
        </Link>

        <TooltipProvider>
          <div className="flex gap-1">
            <Tooltip>
              <TooltipTrigger
                className={iconButtonClass}
                aria-label="Edit workspace"
                onClick={onEdit}
              >
                <FiEdit2 className="size-4" />
              </TooltipTrigger>
              <TooltipContent>
                Edit workspace
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                className={iconButtonClass}
                aria-label={workspace.isArchived ? "Unarchive" : "Archive"}
                onClick={onArchive}
              >
                <FiArchive className="size-4" />
              </TooltipTrigger>
              <TooltipContent>
                {workspace.isArchived
                  ? "Unarchive workspace"
                  : "Archive workspace"}
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger
                className={`${iconButtonClass} hover:text-destructive`}
                aria-label="Delete workspace"
                onClick={onDelete}
              >
                <FiTrash2 className="size-4" />
              </TooltipTrigger>
              <TooltipContent>
                Delete workspace
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
}
