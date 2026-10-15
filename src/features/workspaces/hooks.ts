"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useOptimisticMutation } from "@/lib/query/optimistic";
import { workspaceApi } from "./api";
import type { IWorkspace } from "./interface";
import type { workspaceInput } from "./schema/workspaces-schema";

export const workspacesKey = {
  all: ["workspaces"] as const,
  lists: () => [...workspacesKey.all, "list"] as const,
  list: (archive?: boolean) => [...workspacesKey.lists(), archive] as const,
};

export const useWorkspaces = (archive: boolean) =>
  useQuery({
    queryKey: workspacesKey.list(archive),
    queryFn: () => workspaceApi.list(archive),
  });

export function useCreateWorkspace() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (body: workspaceInput) => workspaceApi.create(body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: workspacesKey.all });
      toast.success("Workspace created");
    },
    onError: (e) => toast.error(e.message),
  });
}

export const useUpdateWorkspace = () =>
  useOptimisticMutation<
    IWorkspace,
    { id: string; body: Partial<workspaceInput> },
    IWorkspace
  >({
    fn: ({ id, body }) => workspaceApi.update(id, body),
    listKey: workspacesKey.lists(),
    update: (list, { id, body }) =>
      list.map((w) => (w.id === id ? { ...w, ...body } : w)),
    message: "Workspace updated",
  });

export const useToggleArchive = () =>
  useOptimisticMutation<IWorkspace, string, IWorkspace>({
    fn: (id) => workspaceApi.toogleArchive(id),
    listKey: workspacesKey.lists(),
    update: (list, id) => list.filter((w) => w.id !== id),
    message: "Workspace archive status updated",
  });

export const useRemoveWorkspace = () =>
  useOptimisticMutation<IWorkspace, string, void>({
    fn: (id) => workspaceApi.remove(id),
    listKey: workspacesKey.lists(),
    update: (list, id) => list.filter((w) => w.id !== id),
    refresh: [["applications"]],
    message: "Workspace removed",
  });
