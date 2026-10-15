import { api } from "@/lib/api/api";
import type { IApplication } from "./interface";
import type { applicationInput } from "./schema/application-schema";

const prefix = "/applications";

export const applicationApi = {
  list: () => api<IApplication[]>(prefix),

  one: (id: string) => api<IApplication>(`${prefix}/${id}`),

  create: (workspaceId: string, body: applicationInput) =>
    api<IApplication>(`${prefix}/workspace/${workspaceId}`, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  update: (id: string, body: Partial<applicationInput>) =>
    api<IApplication>(`${prefix}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  remove: (id: string) => api<void>(`${prefix}/${id}`, { method: "DELETE" }),
};
