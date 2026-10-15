import { cn } from "@/lib/utils";

export function LoadingBlock({ className }: { className?: string }) {
  return (
    <div className={cn("h-40 animate-pulse rounded-xl bg-muted", className)} />
  );
}
