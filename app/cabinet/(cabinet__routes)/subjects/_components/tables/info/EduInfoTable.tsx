/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTable } from "@/components/shared/DataTable";
import { DataTableProps } from "@/components/shared/types";

const EduInfoTable = (
  props: Partial<
    DataTableProps<{
      eduType?: string;
      educationYear?: string;
      semester?: string;
      subject?: string;
      group?: string;
      student?: string;
      trainingType?: string;
    }>
  >,
) => {
  return (
    <DataTable
      rowKey={() => "idx"}
      emptyProps={{ image: { width: 180 }, className: "p-4" }}
      columns={[
        ...(props?.dataSource?.[0]?.eduType
          ? ([
              {
                title: "Ta'lim turi",
                dataIndex: "eduType",
                render: (item: string) => (
                  <span className="text-[14px] text-[var(--secondary-foreground)]">
                    {item}
                  </span>
                ),
              },
            ] as any)
          : []),
        ...(props?.dataSource?.[0]?.educationYear
          ? ([
              {
                title: "O'quv yili",
                dataIndex: "educationYear",
                render: (item: string) => (
                  <span className="text-[14px] text-[var(--secondary-foreground)]">
                    {item}
                  </span>
                ),
              },
            ] as any)
          : []),
        ...(props?.dataSource?.[0]?.semester
          ? ([
              {
                title: "Semestr",
                dataIndex: "semester",
                render: (item: string) => (
                  <span className="text-[14px] text-[var(--secondary-foreground)]">
                    {item}
                  </span>
                ),
              },
            ] as any)
          : []),
        ...(props?.dataSource?.[0]?.group
          ? ([
              {
                title: "Guruh",
                dataIndex: "group",
                render: (item: string) => (
                  <span className="text-[14px] text-[var(--secondary-foreground)]">
                    {item}
                  </span>
                ),
              },
            ] as any)
          : []),
        ...(props?.dataSource?.[0]?.student
          ? ([
              {
                title: "Talaba",
                dataIndex: "student",
                render: (item: string) => (
                  <span className="text-[14px] text-[var(--secondary-foreground)]">
                    {item}
                  </span>
                ),
              },
            ] as any)
          : []),
        ...(props?.dataSource?.[0]?.subject
          ? ([
              {
                title: "Fan",
                dataIndex: "subject",
                render: (item: string) => (
                  <span className="text-[14px] text-[var(--secondary-foreground)]">
                    {item}
                  </span>
                ),
              },
            ] as any)
          : []),
        ,
        ...(props?.dataSource?.[0]?.trainingType
          ? ([
              {
                title: "Mashg’ulot turi",
                dataIndex: "trainingType",
                render: (item: string) => (
                  <span className="text-[14px] text-[var(--secondary-foreground)]">
                    {item}
                  </span>
                ),
              },
            ] as any)
          : []),
      ]}
      {...props}
    />
  );
};

export default EduInfoTable;
