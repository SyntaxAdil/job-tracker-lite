"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Props<T extends string> = {
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
  id?: string;
  className?: string;
};

export function OptionSelect<T extends string>({
  value,
  options,
  onChange,
  id,
  className,
}: Props<T>) {
  return (
    <Select value={value} onValueChange={(v) => v && onChange(v as T)}>
      <SelectTrigger id={id} className={cn("w-full capitalize", className)}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option} className="capitalize">
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
