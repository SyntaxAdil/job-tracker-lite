import { ApplicationForm } from "@/features/applications/components/ApplicationForm";

type Props = { searchParams: Promise<{ id?: string }> };

export default async function UpdateApplicationPage({ searchParams }: Props) {
  const { id } = await searchParams;
  return <ApplicationForm id={id} />;
}
