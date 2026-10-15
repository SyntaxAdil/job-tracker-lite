import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/features/applications/components/StatusBadge";
import { formatDate } from "@/features/applications/utils";
import type { IApplication } from "@/features/applications/interface";

type Props = {
  title: string;
  items: IApplication[];
  empty: string;
  dateOf: (a: IApplication) => string | undefined;
};

export function ApplicationList({ title, items, empty, dateOf }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            {empty}
          </p>
        ) : (
          <ul className="divide-y">
            {items.map((a) => (
              <li key={a._id}>
                <Link
                  href={`/dashboard/workspaces/applications/update?id=${a._id}`}
                  className="flex items-center gap-3 py-3 transition-colors hover:text-primary"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {a.companyName}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {a.position} · {formatDate(dateOf(a))}
                    </p>
                  </div>
                  <StatusBadge status={a.status} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
