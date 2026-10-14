export interface IWorkspace {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  applications: string[];
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}
