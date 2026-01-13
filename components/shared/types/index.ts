/* eslint-disable @typescript-eslint/no-explicit-any */
// components/common/DataTable/types.ts
import { ReactNode } from "react";
import { TABLE_INDEX_NAME } from "../DataTable";

type INDEX_NAME = typeof TABLE_INDEX_NAME;

export interface ColumnType<T> {
  title: ReactNode;
  dataIndex?: keyof T | INDEX_NAME;
  key?: string;
  render?: (value: any, record: T, index: number) => ReactNode;
  className?: string;
}

export interface Pagination {
  pageSize?: number;
  current?: number;
  onChange?: (page: number) => void;
}

export interface DataTableProps<T> {
  columns: ColumnType<T>[];
  dataSource: T[];
  rowKey: keyof T | ((record: T) => string);
  pagination?: Pagination | false;
}
