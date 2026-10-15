import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Item = { key: string; value: number };

const colors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
];

export function StatusDonut({ data, total }: { data: Item[]; total: number }) {
  // build conic slices
  let acc = 0;
  const slices = data.map((d, i) => {
    const from = total ? (acc / total) * 100 : 0;
    acc += d.value;
    const to = total ? (acc / total) * 100 : 0;
    return `${colors[i % colors.length]} ${from}% ${to}%`;
  });
  const bg = total
    ? `conic-gradient(${slices.join(",")})`
    : "conic-gradient(var(--muted) 0 100%)";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap items-center gap-6">
        <div
          className="relative size-36 shrink-0 animate-in rounded-full fade-in zoom-in-90 duration-500"
          style={{ background: bg }}
        >
          <div className="absolute inset-4 flex flex-col items-center justify-center rounded-full bg-card">
            <span className="text-2xl font-semibold tabular-nums">{total}</span>
            <span className="text-xs text-muted-foreground">total</span>
          </div>
        </div>
        <ul className="space-y-2 text-sm">
          {data.map((d, i) => (
            <li key={d.key} className="flex items-center gap-2">
              <span
                className="size-3 rounded-full"
                style={{ background: colors[i % colors.length] }}
              />
              <span className="capitalize">{d.key}</span>
              <span className="ml-auto pl-4 tabular-nums text-muted-foreground">
                {d.value}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
