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
import {
  convertIfCyrillic,
  keepOnlyLatinLettersAndWhitespace,
} from "@/lib/utils/string.util";
import { Loader2, X } from "lucide-react";
import { ReactNode, useCallback, useState } from "react";

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
  showSearch?: boolean;
  searchPlaceholder?: string;
  filterOption?: (opt: Option) => boolean;
}

export enum SelectSpecialKeys {
  Empty = "__empty__",
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
  searchPlaceholder,
  showSearch = false,
  filterOption,
}: CustomSelectProps) => {
  const [search, setSearch] = useState("");
  const customFilterOption = useCallback(
    (opt: Option) => {
      const translatedInputValue = keepOnlyLatinLettersAndWhitespace(
        convertIfCyrillic(search),
      );
      const translatedOptionLabel = keepOnlyLatinLettersAndWhitespace(
        convertIfCyrillic(opt?.label as string),
      );
      const arr = translatedInputValue.split(" ");
      return arr.reduce(
        (acc, curr) =>
          acc &&
          translatedOptionLabel?.toLowerCase()?.includes(curr?.toLowerCase()),
        true,
      );
    },
    [search],
  );

  const filterOptionFn = useCallback(
    (option: Option): boolean => {
      if (!search) return true;
      if (filterOption) {
        return filterOption(option);
      }
      return customFilterOption(option);
    },
    [customFilterOption, filterOption, search],
  );

  const stringValue =
    value === undefined || value === null ? "" : String(value);

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onValueChange?.("");
  };

  return (
    <Select
      value={stringValue}
      onValueChange={(val) => {
        if (loading || disabled) return;
        console.log(`${value} -> ${val}`, placeholder, "val changed");
        onValueChange?.(
          val === "" || val === SelectSpecialKeys.Empty ? undefined : val,
        );
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
            <span
              onPointerDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onClick={handleClear}
              className="ml-1 rounded-full w-[20px] h-[20px] !p-0 cursor-pointer bg-[var(--background)] flex justify-center items-center"
            >
              <X className="!w-3 !h-3" />
            </span>
          )}
        </div>
      </SelectTrigger>

      <SelectContent
        className="max-h-60 overflow-auto"
        side="bottom"
        position="popper"
      >
        {showSearch && (
          <div className="sticky top-[-6px] bg-background p-2 z-10">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                e.stopPropagation();
              }}
              onPointerDown={(e) => {
                e.stopPropagation();
              }}
              placeholder={searchPlaceholder ?? "Qidirish..."}
              className="w-full rounded-md border px-2 py-1 text-sm outline-none"
            />
          </div>
        )}

        {groupedOptions
          ? groupedOptions?.map((group) => (
              <SelectGroup key={group.label}>
                <SelectLabel>{group.label}</SelectLabel>
                {group.options.map((opt, idx) => (
                  <SelectItem
                    key={opt?.value || idx}
                    value={String(opt?.value)}
                  >
                    {opt?.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))
          : (loading && !!value
              ? [{ value, label: placeholder }]
              : options?.length
                ? [...options]
                : [
                    {
                      label: "Ma'lumot topilmadi",
                      value: SelectSpecialKeys.Empty,
                    },
                  ]
            ).map((opt, idx) => (
              <SelectItem
                key={opt?.value || idx}
                value={String(opt?.value)}
                className={cn(!filterOptionFn(opt) && "hidden")}
              >
                {opt?.label}
              </SelectItem>
            ))}
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
