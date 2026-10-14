"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { workspacesApi } from "./api";
import { workspaceInput } from "./schema/workspace-schema";

export const workspacesKey = {
  all: ["workspaces"] as const,
  list: (archive: boolean) => [...workspacesKey.all, "list", archive] as const,
};

export const useWorkspaces = (archive = false) =>
  useQuery({
    queryKey: workspacesKey.list(archive),
    queryFn: () => workspacesApi.list(archive),
  });

function useWorkspaceMutation<TVars, TData>(
  fn: (vars: TVars) => Promise<TData>,
  successMessage: string,
) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: fn,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: workspacesKey.all });
      toast.success(successMessage);
    },
    onError: (e) => toast.error(e.message),
  });
}

export const useCreateWorkspace = () =>
  useWorkspaceMutation(
    (body: workspaceInput) => workspacesApi.create(body),
    "Workspace created successfully",
  );

export const useUpdateWorkspace = () =>
  useWorkspaceMutation(
    ({ id, body }: { id: string; body: Partial<workspaceInput> }) =>
      workspacesApi.update(id, body),
    "Workspace updated successfully",
  );

export const useToggleArchive = () =>
  useWorkspaceMutation(
    (id: string) => workspacesApi.toggleArchive(id),
    "Workspace archive status updated",
  );

export const useRemoveWorkspace = () =>
  useWorkspaceMutation(
    (id: string) => workspacesApi.remove(id),
    "Workspace deleted successfully",
  );
