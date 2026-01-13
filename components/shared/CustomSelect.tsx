"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { ReactNode } from "react";

export interface Option {
  value: string | number;
  label: ReactNode;
}

export interface GroupedOption {
  label: string;
  options: Option[];
}

interface CustomSelectProps {
  options?: Option[];
  groupedOptions?: GroupedOption[];
  value?: string | number;
  onValueChange?: (val: number | string | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  allowClear?: boolean;
}

const CustomSelect = ({
  options = [],
  groupedOptions,
  value,
  onValueChange,
  placeholder = "Tanlang",
  className,
  disabled = false,
  allowClear = false,
}: CustomSelectProps) => {
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent opening dropdown
    onValueChange?.(undefined);
  };

  return (
    <Select
      value={value !== undefined ? String(value) : undefined}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <SelectTrigger className={cn(className ?? "w-[180px]")}>
        <SelectValue placeholder={placeholder} />
        {allowClear && value !== undefined && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="ml-2 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        )}
      </SelectTrigger>

      {/* Remove fixed bottom, let Radix handle positioning */}
      <SelectContent
        side="bottom" // preferred side
        sideOffset={4} // spacing between trigger and dropdown
        className="max-h-60 overflow-auto" // responsive height + scroll
      >
        {groupedOptions
          ? groupedOptions.map((group) => (
              <SelectGroup key={group.label}>
                <SelectLabel>{group.label}</SelectLabel>
                {group.options.map((opt) => (
                  <SelectItem key={opt.value} value={String(opt.value)}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))
          : options.map((opt) => (
              <SelectItem key={opt.value} value={String(opt.value)}>
                {opt.label}
              </SelectItem>
            ))}
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
