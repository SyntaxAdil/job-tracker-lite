import { ApplicationForm } from "@/features/applications/components/ApplicationForm";

type Props = { searchParams: Promise<{ workspaceId?: string }> };

export default async function NewApplicationPage({ searchParams }: Props) {
  const { workspaceId } = await searchParams;
  return <ApplicationForm workspaceId={workspaceId} />;
}
