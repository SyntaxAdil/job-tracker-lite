import type { IconType } from "react-icons";
import { Card, CardContent } from "@/components/ui/card";

type Props = { label: string; value: string | number; icon: IconType };

export function StatCard({ label, value, icon: Icon }: Props) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 text-3xl font-semibold tabular-nums">{value}</p>
        </div>
        <div className="rounded-lg bg-muted p-3">
          <Icon className="size-5" />
        </div>
      </CardContent>
    </Card>
  );
}
