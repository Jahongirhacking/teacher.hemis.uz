"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  convertIfCyrillic,
  keepOnlyLatinLettersAndWhitespace,
} from "@/lib/utils/string.util";
import { Check, Loader2, X } from "lucide-react";
import { ReactNode, useCallback, useMemo, useRef, useState } from "react";
import { useDebounce } from "use-debounce";

export interface Option {
  value: string | number;
  label: ReactNode;
}

export interface GroupedOption {
  label: string;
  options: Option[];
}

interface CustomMultiSelectProps {
  options?: Option[];
  groupedOptions?: GroupedOption[];
  value?: Array<string | number>;
  onValueChange?: (val: Array<string | number>) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  allowClear?: boolean;
  loading?: boolean;
  showSearch?: boolean;
  searchPlaceholder?: string;
  filterOption?: (opt: Option) => boolean;
}

const CustomMultiSelect = ({
  options = [],
  groupedOptions,
  value = [],
  onValueChange,
  placeholder = "Tanlang",
  className,
  disabled = false,
  allowClear = false,
  loading = false,
  showSearch = false,
  searchPlaceholder,
  filterOption,
}: CustomMultiSelectProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 200);
  const inputRef = useRef<HTMLInputElement>(null);

  const valueSet = useMemo(() => new Set(value.map(String)), [value]);

  const handleToggle = (val: string) => {
    if (disabled || loading) return;

    const exists = valueSet.has(val);
    const next = exists
      ? value.filter((v) => String(v) !== val)
      : [...value, val];

    onValueChange?.(next);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onValueChange?.([]);
  };

  const customFilterOption = useCallback(
    (opt: Option) => {
      const input = keepOnlyLatinLettersAndWhitespace(
        convertIfCyrillic(debouncedSearch),
      );
      const label = keepOnlyLatinLettersAndWhitespace(
        convertIfCyrillic(opt.label as string),
      );

      return input
        .split(" ")
        .every((w) => label.toLowerCase().includes(w.toLowerCase()));
    },
    [debouncedSearch],
  );

  const filterOptionFn = useCallback(
    (opt: Option) => {
      if (!debouncedSearch) return true;
      return filterOption ? filterOption(opt) : customFilterOption(opt);
    },
    [customFilterOption, filterOption, debouncedSearch],
  );

  const selectedLabels = useMemo(() => {
    const map = new Map(options.map((o) => [String(o.value), o.label]));
    return value.map((v) => map.get(String(v))).filter(Boolean);
  }, [value, options]);

  const selectedText = useMemo(() => {
    if (!selectedLabels.length) return placeholder;

    // agar label ReactNode bo‘lsa, qisqa ko‘rinish
    if (selectedLabels.length <= 3) {
      return selectedLabels.join(", ");
    }

    return `${selectedLabels.length} ta tanlandi`;
  }, [selectedLabels, placeholder]);

  return (
    <Select
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (o && showSearch) {
          setTimeout(() => inputRef.current?.focus(), 0);
        }
      }}
      value="" // ❗ shadcn talab qiladi
      disabled={disabled || loading}
    >
      <SelectTrigger
        className={cn(
          "relative",
          className ?? "w-full",
          loading && "cursor-not-allowed opacity-70",
        )}
      >
        <div className="flex items-center justify-between gap-2 w-full">
          {/* 👇 CUSTOM VALUE */}
          <span
            className={cn(
              "truncate text-sm",
              !value.length && "text-muted-foreground",
            )}
          >
            {selectedText}
          </span>

          {loading && <Loader2 className="h-4 w-4 animate-spin" />}

          {!loading && allowClear && value.length > 0 && (
            <span
              onPointerDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onClick={handleClear}
              className="rounded-full w-5 h-5 flex items-center justify-center hover:bg-muted"
            >
              <X className="w-3 h-3" />
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
          <div className="sticky top-[-6px] bg-background p-2 z-10 mb-2">
            <input
              ref={inputRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
              placeholder={searchPlaceholder ?? "Qidirish..."}
              className="w-full rounded-md border px-2 py-1 text-sm outline-none"
            />
          </div>
        )}

        {groupedOptions
          ? groupedOptions.map((group) => (
              <SelectGroup key={group.label}>
                <SelectLabel>{group.label}</SelectLabel>
                {group.options.filter(filterOptionFn).map((opt) => {
                  const checked = valueSet.has(String(opt.value));
                  return (
                    <SelectItem
                      key={opt.value}
                      value={String(opt.value)}
                      onPointerDown={(e) => {
                        e.preventDefault();
                        handleToggle(String(opt.value));
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Check
                          className={cn(
                            "h-4 w-4",
                            checked ? "opacity-100" : "opacity-0",
                          )}
                        />
                        {opt.label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            ))
          : options.filter(filterOptionFn).map((opt) => {
              const checked = valueSet.has(String(opt.value));
              return (
                <SelectItem
                  key={opt.value}
                  value={String(opt.value)}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    handleToggle(String(opt.value));
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Check
                      className={cn(
                        "h-4 w-4",
                        checked ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {opt.label}
                  </div>
                </SelectItem>
              );
            })}
      </SelectContent>
    </Select>
  );
};

export default CustomMultiSelect;
