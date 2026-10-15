import { ApplicationsView } from "@/features/applications/components/ApplicationsView";

type Props = { searchParams: Promise<{ workspaceId?: string }> };

export default async function ApplicationsPage({ searchParams }: Props) {
  const { workspaceId } = await searchParams;
  return <ApplicationsView workspaceId={workspaceId} />;
}
