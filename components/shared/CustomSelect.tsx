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
import { Loader2, X } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "../ui/button";

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
  loading?: boolean;
}

export enum SelectSpecialKeys {
  Empty = '__empty__'
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
  loading = false,
}: CustomSelectProps) => {
  const stringValue =
    value === undefined || value === null ? "" : String(value);

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onValueChange?.(undefined);
  };

  return (
    <Select
      value={stringValue}
      onValueChange={(val) => {
        onValueChange?.(val === "" || val === SelectSpecialKeys.Empty ? undefined : val);
      }}
      disabled={disabled || loading} // 🔥 MUHIM
    >
      <SelectTrigger
        className={cn(
          "relative",
          className ?? "w-full",
          loading && "cursor-not-allowed opacity-70",
        )}
      >
        <div className="flex justify-between items-center w-full gap-2">
          <SelectValue placeholder={placeholder} />

          {/* 🔄 LOADING */}
          {loading && (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          )}

          {/* ❌ CLEAR */}
          {!loading && allowClear && stringValue !== "" && !disabled && (
            <Button
              type="button"
              variant="outline"
              onPointerDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onClick={handleClear}
              className="ml-1 rounded-full w-[20px] h-[20px] !p-0"
            >
              <X className="!w-3 !h-3" />
            </Button>
          )}
        </div>
      </SelectTrigger>

      {/* ⛔ dropdown ochilmaydi loading payti */}
      <SelectContent className="max-h-60 overflow-auto">
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
