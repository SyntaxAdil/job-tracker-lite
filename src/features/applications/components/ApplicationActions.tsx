import Link from "next/link";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { buttonVariants } from "@/components/ui/button";
import { IconButton } from "@/components/common/icon-button";
import { cn } from "@/lib/utils";
import type { IApplication } from "../interface";

type Props = {
  application: IApplication;
  onDelete: (application: IApplication) => void;
};

export function ApplicationActions({ application, onDelete }: Props) {
  return (
    <div className="flex items-center gap-1">
      <Link
        href={`/dashboard/workspaces/applications/update?id=${application._id}`}
        aria-label="Edit"
        title="Edit"
        className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-8")}
      >
        <FiEdit2 />
      </Link>
      <IconButton
        icon={FiTrash2}
        label="Delete"
        onClick={() => onDelete(application)}
        className="hover:text-destructive"
      />
    </div>
  );
}
