"use client";

import { DataTable } from "@/components/shared/DataTable";
import { DataTableProps } from "@/components/shared/types";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ITaskSubmissionItem } from "@/lib/services/subject/type";
import Link from "next/link";
import { usePathname } from "next/navigation";

const StudentSubmissionTable = ({
  postfixPath = "",
  ...props
}: Partial<DataTableProps<ITaskSubmissionItem>> & { postfixPath?: string }) => {
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
          title: "Talaba",
          render: (_, record) => (
            <Link
              href={`${[pathname, postfixPath]?.filter((e) => !!e)?.join("/")}/${record?.id}`}
            >
              <b className="text-[var(--primary)] font-medium">
                {record?.student?.name}
              </b>
            </Link>
          ),
        },
        {
          title: "Guruh",
          render: (_, record) => (
            <span className="text-[14px] text-[var(--secondary-foreground)]">
              {record?.group?.name || "-"}
            </span>
          ),
        },
        {
          title: "YN turi",
          render: (_, record) => (
            <span className="text-[14px] text-[var(--secondary-foreground)]">
              {record?.final_exam_type || "-"}
            </span>
          ),
        },
        {
          title: "Javoblar soni",
          render: () => (
            <span className="text-[14px] text-[var(--secondary-foreground)]">
              {"-"}
            </span>
          ),
        },
        {
          title: "Ball",
          render: (_, record) => (
            <span className="text-[14px] text-[var(--secondary-foreground)]">
              {record?.mark ?? "-"}
            </span>
          ),
        },
        {
          title: "Sana",
          render: (_, record) => (
            <span className="text-[14px] text-[var(--secondary-foreground)]">
              {record?.marked_date ?? "-"}
            </span>
          ),
        },
        {
          title: "Status",
          render: (_, record) => <Switch checked={record?.active} />,
        },
        {
          title: "Baholash",
          render: (_, record) => (
            <Link
              href={`${[pathname, postfixPath]?.filter((e) => !!e)?.join("/")}/${record?.id}`}
            >
              <Button>Baholash</Button>
            </Link>
          ),
        },
      ]}
      {...props}
    />
  );
};

export default StudentSubmissionTable;
