"use client";

import { DataTable } from "@/components/shared/DataTable";
import { DataTableProps } from "@/components/shared/types";
import { TIME_FORMAT } from "@/lib/const";
import { ITaskAssessmentItem } from "@/lib/services/subject/type";
import moment from "moment";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TaskAssessmentTable = ({
  postfixPath = "",
  ...props
}: Partial<DataTableProps<ITaskAssessmentItem>> & { postfixPath?: string }) => {
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
          title: "Topshiriq nomi",
          render: (_, record) => (
            <Link
              href={`${[pathname, postfixPath]?.filter((e) => !!e)?.join("/")}/${record?.id}`}
            >
              <b className="text-[var(--primary)] font-medium">
                {record?.name}
              </b>
            </Link>
          ),
        },
        {
          title: "Topshiriq turi",
          render: (_, record) => (
            <span className="text-[14px] text-[var(--secondary-foreground)]">
              {record?.task_type?.name || "-"}
            </span>
          ),
        },
        {
          title: "Nazorat turi",
          render: (_, record) => (
            <span className="text-[14px] text-[var(--secondary-foreground)]">
              {record?.exam_type?.name || "-"}
            </span>
          ),
        },
        {
          title: "Ball",
          render: (_, record) => (
            <span className="text-[14px] text-[var(--secondary-foreground)]">
              {record?.max_ball || "-"}
            </span>
          ),
        },
        {
          title: "Muddati",
          render: (_, record) => (
            <span className="text-[14px] text-[var(--secondary-foreground)]">
              {moment(record?.deadline, TIME_FORMAT.ServerWithTime).format(
                TIME_FORMAT.ClientWithTime,
              ) || "-"}
            </span>
          ),
        },
        {
          title: "Yuborilgan",
          render: (_, record) => (
            <span className="text-[14px] text-[var(--secondary-foreground)]">
              {record?.statistics?.given_count ?? "-"}
            </span>
          ),
        },
        {
          title: "Topshirilgan",
          render: (_, record) => (
            <span className="text-[14px] text-[var(--secondary-foreground)]">
              {record?.statistics?.passed_count ?? "-"}
            </span>
          ),
        },
        {
          title: "Baholangan",
          render: (_, record) => (
            <span className="text-[14px] text-[var(--secondary-foreground)]">
              {record?.statistics?.rated_count ?? "-"}
            </span>
          ),
        },
      ]}
      {...props}
    />
  );
};

export default TaskAssessmentTable;
