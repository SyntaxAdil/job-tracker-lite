import type { IconType } from "react-icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  icon: IconType;
  label: string;
  onClick: () => void;
  className?: string;
};

export function IconButton({ icon: Icon, label, onClick, className }: Props) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={cn("size-8", className)}
    >
      <Icon />
    </Button>
  );
}
