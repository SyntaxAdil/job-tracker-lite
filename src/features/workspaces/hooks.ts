import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { workspaceApi } from "./api";
import { toast } from "sonner";
import type { workspaceInput } from "./schema/workspaces-schema";

const workspacesKey = {
  all: ["workspaces"] as const,
  list: (archive?: boolean) => [...workspacesKey.all, "list", archive] as const,
};

export const useWorkspaces = (archive: boolean) =>
  useQuery({
    queryKey: workspacesKey.list(archive),
    queryFn: () => workspaceApi.list(archive),
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

    onError: (e) => toast.error(e?.message),
  });
}

export const useCreateWorkspace = () =>
  useWorkspaceMutation(
    (body: workspaceInput) => workspaceApi.create(body),
    "Workspace Created",
  );

export const useUpdateWorkspace = () =>
  useWorkspaceMutation(
    ({ id, body }: { id: string; body: Partial<workspaceInput> }) =>
      workspaceApi.update(id, body),
    "Workspace updated",
  );

export const useToggleArchive = () =>
  useWorkspaceMutation(
    (id: string) => workspaceApi.toogleArchive(id),
    "Workspace archive status updated",
  );

export const useRemoveWorkspace = () =>
  useWorkspaceMutation(
    (id: string) => workspaceApi.remove(id),
    "Workspace removed",
  );
