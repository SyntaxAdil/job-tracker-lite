export interface IWorkspace {
  id: string;
  name: string;
  description?: string;
  applications: string[];
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}
