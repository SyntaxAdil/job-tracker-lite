import { api } from "../../lib/api/api";
import { IWorkspace } from "./interface";
import { workspaceInput } from "./schema/workspaces-schema";

const workspaceApiPrefix = "/workspaces";

export const workspaceApi = {
  list: (archive: boolean) =>
    api<IWorkspace[]>(`${workspaceApiPrefix}/me?archive=${archive}`),

  create: (body: workspaceInput) =>
    api<IWorkspace>(`${workspaceApiPrefix}`, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  update: (id: string, body: Partial<workspaceInput>) =>
    api<IWorkspace>(`${workspaceApiPrefix}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  toogleArchive: (id: string) =>
    api<IWorkspace>(`${workspaceApiPrefix}/${id}/archive`, {
      method: "PATCH",
    }),

  remove: (id: string) =>
    api<void>(`${workspaceApiPrefix}/${id}`, { method: "DELETE" }),
};
