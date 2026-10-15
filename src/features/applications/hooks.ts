"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useOptimisticMutation } from "@/lib/query/optimistic";
import { workspacesKey } from "@/features/workspaces/hooks";
import { applicationApi } from "./api";
import type { IApplication } from "./interface";
import type { applicationInput } from "./schema/application-schema";

export const applicationKeys = {
  all: ["applications"] as const,
  lists: () => [...applicationKeys.all, "list"] as const,
  list: (workspaceId?: string) =>
    [...applicationKeys.lists(), workspaceId] as const,
  detail: (id: string) => [...applicationKeys.all, "detail", id] as const,
};

export const useApplications = (workspaceId?: string) =>
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

export function useCreateApplication() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      workspaceId,
      body,
    }: {
      workspaceId: string;
      body: applicationInput;
    }) => applicationApi.create(workspaceId, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: applicationKeys.all });
      qc.invalidateQueries({ queryKey: workspacesKey.all });
      toast.success("Application added");
    },
    onError: (e) => toast.error(e.message),
  });
}

export const useUpdateApplication = () =>
  useOptimisticMutation<
    IApplication,
    { id: string; body: Partial<applicationInput> },
    IApplication
  >({
    fn: ({ id, body }) => applicationApi.update(id, body),
    listKey: applicationKeys.lists(),
    update: (list, { id, body }) =>
      list.map((a) => (a._id === id ? { ...a, ...body } : a)),
    refresh: [applicationKeys.all],
    message: "Application updated",
  });

export const useRemoveApplication = () =>
  useOptimisticMutation<IApplication, string, void>({
    fn: (id) => applicationApi.remove(id),
    listKey: applicationKeys.lists(),
    update: (list, id) => list.filter((a) => a._id !== id),
    refresh: [applicationKeys.all, workspacesKey.all],
    message: "Application deleted",
  });
