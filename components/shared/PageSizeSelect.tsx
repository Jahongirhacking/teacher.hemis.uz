"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PageSizeSelectProps {
  pageParam?: string; // page number query param, default "page"
  sizeParam?: string; // page size query param, default "size"
  defaultPageSize?: number;
  pageSizeOptions?: number[];
  className?: string;
}

export const PageSizeSelect = ({
  pageParam = "page",
  sizeParam = "size",
  defaultPageSize = 10,
  pageSizeOptions = [10, 20, 50],
  className,
}: PageSizeSelectProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSize = Number(searchParams.get(sizeParam) ?? defaultPageSize);

  const setSize = (newSize: number) => {
    const params = new URLSearchParams(searchParams);
    params.set(sizeParam, String(newSize));
    params.set(pageParam, "1"); // reset to first page
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Select
      value={String(currentSize)}
      onValueChange={(val) => setSize(Number(val))}
    >
      {/* Trigger / visible box */}
      <SelectTrigger
        className={cn(
          "hidden md:flex w-[110px] border px-2 py-1 rounded",
          className,
        )}
      >
        <SelectValue placeholder="Sahifa o'lchami" />
      </SelectTrigger>

      {/* Dropdown */}
      <SelectContent>
        {!pageSizeOptions.includes(currentSize) && (
          <SelectItem value={String(currentSize)}>
            {currentSize} / sahifa
          </SelectItem>
        )}
        {pageSizeOptions?.map((opt) => (
          <SelectItem key={opt} value={String(opt)}>
            {opt} / sahifa
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
