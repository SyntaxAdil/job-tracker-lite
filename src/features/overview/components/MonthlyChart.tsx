import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MonthlyChart({
  data,
}: {
  data: { key: string; value: number }[];
}) {
  const max = Math.max(1, ...data.map((d) => d.value));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Applications per month</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex h-44 items-end gap-3">
          {data.map((d) => (
            <div key={d.key} className="flex h-full flex-1 flex-col justify-end">
              <span className="mb-1 text-center text-xs tabular-nums text-muted-foreground">
                {d.value}
              </span>
              <div
                className="w-full rounded-t-md bg-primary transition-all duration-700"
                style={{ height: `${(d.value / max) * 100}%`, minHeight: 4 }}
              />
              <span className="mt-2 text-center text-xs text-muted-foreground">
                {d.key}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
