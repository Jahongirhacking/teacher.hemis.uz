/* eslint-disable @typescript-eslint/no-explicit-any */
// components/common/DataTable/index.tsx
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTableProps } from "./types";

export function DataTable<T>({
  columns,
  dataSource,
  rowKey,
  pagination,
}: DataTableProps<T>) {
  const getRowKey = (record: T, index: number) =>
    typeof rowKey === "function"
      ? rowKey(record)
      : String(record[rowKey] ?? index);

  const pageSize = (pagination && pagination?.pageSize) || dataSource?.length;
  const current = (pagination && pagination?.current) || 1;

  const paginatedData =
    pagination === false
      ? dataSource
      : dataSource.slice((current - 1) * pageSize, current * pageSize);

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col, index) => (
              <TableHead key={col.key ?? index} className={col.className}>
                {col.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginatedData.map((record, rowIndex) => (
            <TableRow key={getRowKey(record, rowIndex)}>
              {columns.map((col, colIndex) => {
                const value = col.dataIndex ? record[col.dataIndex] : undefined;

                return (
                  <TableCell key={col.key ?? colIndex}>
                    {col.render
                      ? col.render(value, record, rowIndex)
                      : (value as any)}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination (basic) */}
      {pagination !== false && pagination && (
        <div className="flex justify-end gap-2 text-sm">
          <button
            disabled={current === 1}
            onClick={() => pagination.onChange?.(current - 1)}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span>Page {current}</span>

          <button
            disabled={current * pageSize >= dataSource.length}
            onClick={() => pagination.onChange?.(current + 1)}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
