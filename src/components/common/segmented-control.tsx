import type { IconType } from "react-icons";
import { Button } from "@/components/ui/button";

type Option<T extends string> = {
  value: T;
  label: string;
  icon?: IconType;
};

type Props<T extends string> = {
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
};

export function SegmentedControl<T extends string>({
  value,
  options,
  onChange,
}: Props<T>) {
  return (
    <div className="inline-flex rounded-lg border p-0.5">
      {options.map(({ value: v, label, icon: Icon }) => (
        <Button
          key={v}
          type="button"
          size="sm"
          variant={v === value ? "secondary" : "ghost"}
          onClick={() => onChange(v)}
        >
          {Icon && <Icon />}
          {label}
        </Button>
      ))}
    </div>
  );
}
