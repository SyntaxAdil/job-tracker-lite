"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiLoader } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/common/form-field";
import { useCreateWorkspace, useUpdateWorkspace } from "../hooks";
import type { IWorkspace } from "../interface";
import {
  workspaceSchema,
  type workspaceInput,
} from "../schema/workspaces-schema";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workspace?: IWorkspace;
};

export function WorkspaceFormDialog({ open, onOpenChange, workspace }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {workspace ? "Edit workspace" : "New workspace"}
          </DialogTitle>
          <DialogDescription>
            Group your applications by job search.
          </DialogDescription>
        </DialogHeader>
        <WorkspaceForm
          workspace={workspace}
          onDone={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

function WorkspaceForm({
  workspace,
  onDone,
}: {
  workspace?: IWorkspace;
  onDone: () => void;
}) {
  const create = useCreateWorkspace();
  const update = useUpdateWorkspace();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<workspaceInput>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: workspace?.name ?? "",
      description: workspace?.description ?? "",
    },
  });

  const onSubmit = (values: workspaceInput) => {
    if (workspace) {
      update.mutate({ id: workspace.id, body: values });
      onDone();
      return;
    }
    create.mutate(values, { onSuccess: onDone });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField label="Name" htmlFor="name" error={errors.name?.message}>
        <Input id="name" placeholder="Frontend search 2026" {...register("name")} />
      </FormField>

      <FormField
        label="Description"
        htmlFor="description"
        error={errors.description?.message}
      >
        <Textarea id="description" rows={3} {...register("description")} />
      </FormField>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onDone}>
          Cancel
        </Button>
        <Button type="submit" disabled={create.isPending}>
          {create.isPending && <FiLoader className="animate-spin" />}
          {workspace ? "Save changes" : "Create workspace"}
        </Button>
      </div>
    </form>
  );
}
