import { Badge } from "@/components/ui/badge";
import type { ApplicationStatus } from "../interface";

const variants = {
  applied: "secondary",
  interview: "outline",
  selected: "default",
  rejected: "destructive",
} as const satisfies Record<
  ApplicationStatus,
  "default" | "secondary" | "destructive" | "outline"
>;

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <Badge variant={variants[status]} className="capitalize">
      {status}
    </Badge>
  );
}
