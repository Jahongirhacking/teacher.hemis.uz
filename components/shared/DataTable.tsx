/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SearchParams } from "@/lib/const";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import CustomPagination from "./CustomPagination";
import Empty from "./Empty";
import { DataTableProps, Pagination } from "./types";

const DEFAULT_PAGINATION: Pagination = {
  pageSize: 20,
  current: 1,
};

export const TABLE_INDEX_NAME = "idx" as const;

export function DataTable<T>({
  columns,
  dataSource = [],
  rowKey,
  pagination,
  total,
  emptyProps,
  isDataPaginatedBefore = true,
}: DataTableProps<T>) {
  const searchParams = useSearchParams();
  const getRowKey = (record: T, index: number) =>
    (typeof rowKey === "function"
      ? record?.[rowKey(record)]
      : String(record?.[rowKey])) || index;

  const pageSize =
    (pagination && pagination?.pageSize) ||
    Number(
      pagination === undefined && searchParams.get(SearchParams.PaginationSize),
    ) ||
    DEFAULT_PAGINATION?.pageSize ||
    dataSource?.length;
  const current =
    (pagination && pagination?.current) ||
    Number(
      pagination === undefined && searchParams.get(SearchParams.PaginationPage),
    ) ||
    DEFAULT_PAGINATION?.current ||
    1;

  const paginatedData = (
    isDataPaginatedBefore
      ? dataSource
      : dataSource.slice((current - 1) * pageSize, current * pageSize)
  )?.map((d, idx) => ({
    ...d,
    [TABLE_INDEX_NAME]:
      d?.[TABLE_INDEX_NAME] || (current - 1) * pageSize + 1 + idx,
  }));

  return (
    <div className="space-y-4 w-full">
      <div className="rounded-[8px] bg-[var(--card)] overflow-hidden border border-[var(--border)]">
        <Table>
          <TableHeader className="bg-[var(--card-header)]">
            <TableRow>
              {columns?.map((col, index) => (
                <TableHead
                  key={col?.key ?? index}
                  className={cn(
                    "text-[var(--secondary-foreground)]",
                    col?.className,
                  )}
                >
                  {col?.title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {!paginatedData?.length ? (
              <TableRow>
                <TableCell
                  colSpan={columns?.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  <Empty
                    description="Hech narsa topilmadi"
                    className="p-20"
                    {...emptyProps}
                  />
                </TableCell>
              </TableRow>
            ) : (
              paginatedData?.map((record, rowIndex) => (
                <TableRow
                  key={getRowKey(record, rowIndex)}
                  className="hover:bg-[var(--card-shadow)]"
                >
                  {columns?.map((col, colIndex) => {
                    const value = col?.dataIndex
                      ? record?.[col?.dataIndex]
                      : undefined;

                    return (
                      <TableCell
                        key={col?.key ?? colIndex}
                        className="py-2 px-4"
                      >
                        {col.render
                          ? col.render(value, record, rowIndex)
                          : (value as any)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination (basic) */}
      {(pagination === undefined || pagination) && (
        <CustomPagination total={total || dataSource?.length} />
      )}
    </div>
  );
}
