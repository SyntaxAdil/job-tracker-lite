"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { applicationApi } from "./api";
import type { applicationInput } from "./schema/application-schema";
import { workspacesKey } from "../workspaces/hooks";

export const applicationKeys = {
  all: ["applications"] as const,
  list: (workspaceId?: string) =>
    [...applicationKeys.all, "list", workspaceId] as const,
  detail: (id: string) => [...applicationKeys.all, "detail", id] as const,
};

export const useApplications = (workspaceId: string) =>
  useQuery({
    queryKey: applicationKeys.list(workspaceId),
    queryFn: async () => {
      const all = await applicationApi.list();
      return workspaceId
        ? all.filter((a) => a.workspaceId === workspaceId)
        : all;
    },
  });

export const useApplication = (id: string) =>
  useQuery({
    queryKey: applicationKeys.detail(id),
    queryFn: () => applicationApi.one(id),
    enabled: !!id,
  });

function useApplicationMutation<TVars, TData>(
  fn: (vars: TVars) => Promise<TData>,
  successMessage: string,
) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: fn,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: applicationKeys.all });
      qc.invalidateQueries({ queryKey: workspacesKey.all });
      toast.success(successMessage);
    },
    onError: (e) => toast.error(e.message),
  });
}

export const useCreateApplication = () =>
  useApplicationMutation(
    ({ workspaceId, body }: { workspaceId: string; body: applicationInput }) =>
      applicationApi.create(workspaceId, body),
    "Application added",
  );

export const useUpdateApplication = () =>
  useApplicationMutation(
    ({ id, body }: { id: string; body: Partial<applicationInput> }) =>
      applicationApi.update(id, body),
    "Application updated",
  );

export const useRemoveApplication = () =>
  useApplicationMutation(
    (id: string) => applicationApi.remove(id),
    "Application deleted",
  );
