import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = { title: string; data: { key: string; value: number }[] };

export function BarList({ title, data }: Props) {
  const max = Math.max(1, ...data.map((d) => d.value));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((d) => (
          <div key={d.key} className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="capitalize">{d.key}</span>
              <span className="tabular-nums text-muted-foreground">
                {d.value}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-700"
                style={{ width: `${(d.value / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
