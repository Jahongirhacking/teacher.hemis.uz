"use client";

import { DataTable } from "@/components/shared/DataTable";
import { DataTableProps } from "@/components/shared/types";
import { IAttendanceJournalItem } from "@/lib/services/training/type";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AttendanceByGroupTable = ({
  postfixPath = "",
  ...props
}: Partial<DataTableProps<IAttendanceJournalItem>> & {
  postfixPath?: string;
}) => {
  const pathname = usePathname();
  return (
    <DataTable
      rowKey={() => "idx"}
      columns={[
        {
          title: "",
          dataIndex: "idx",
          className: "w-[40px]",
        },
        {
          title: "Guruh",
          render: (_, record) => (
            <Link
              href={`${[pathname, postfixPath]?.filter((e) => !!e)?.join("/")}/${record?.group?.id}`}
            >
              <b className="text-[var(--primary)] font-medium">
                {record?.group?.name}
              </b>
            </Link>
          ),
        },
        {
          title: "Fanlar",
          render: (_, record) => (
            <span className="text-[14px] text-[var(--secondary-foreground)]">
              {record?.subject?.name || "-"}
            </span>
          ),
        },
        {
          title: "Mashg’ulot",
          render: (_, record) => (
            <span className="text-[14px] text-[var(--secondary-foreground)]">
              {record?.training_type?.name || "-"}
            </span>
          ),
        },
        {
          title: "Oquv yili",
          render: (_, record) => (
            <span className="text-[14px] text-[var(--secondary-foreground)]">
              {record?.education_year?.name ?? "-"}
            </span>
          ),
        },
        {
          title: "Semestr",
          render: (_, record) => (
            <span className="text-[14px] text-[var(--secondary-foreground)]">
              {record?.semester?.name ?? "-"}
            </span>
          ),
        },
      ]}
      {...props}
    />
  );
};

export default AttendanceByGroupTable;
