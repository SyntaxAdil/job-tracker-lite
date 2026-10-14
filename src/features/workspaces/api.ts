import { api } from "../../lib/api/api";
import { IWorkspace } from "./interface";
import { workspaceInput } from "./schema/workspace-schema";

export const workspacesApi = {
  list: (archive = false) =>
    api<IWorkspace[]>(`/workspaces/me?archive=${archive}`),

  create: (body: workspaceInput) =>
    api<IWorkspace>(`/workspaces`, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  update: (id: string, body: Partial<workspaceInput>) =>
    api<IWorkspace>(`/workspaces/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  toggleArchive: (id: string) =>
    api<IWorkspace>(`/workspaces/${id}/archive`, { method: "PATCH" }),

  remove: (id: string) => api<void>(`/workspaces/${id}`, { method: "DELETE" }),
};
